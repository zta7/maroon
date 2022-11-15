import * as React from "react"
import { mergeRefs } from "react-merge-refs"
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react-dom-interactions"
import type { Placement } from "@floating-ui/react-dom-interactions"

interface useTooltipStateProps {
  placement?: Placement
}

export function useTooltipState({ placement = "top" }: useTooltipStateProps) {
  const [open, setOpen] = React.useState(false)

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(5), flip(), shift()],
  })

  const context = data.context

  const interactions = useInteractions([
    useHover(context, { move: false }),
    useFocus(context),
    useDismiss(context),
    useRole(context, { role: "tooltip" }),
  ])

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data]
  )
}

type TooltipState = ReturnType<typeof useTooltipState>

export const TooltipAnchor = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & {
    state: TooltipState
    asChild?: boolean
  }
>(function TooltipAnchor(
  { children, state, asChild = false, ...props },
  propRef
) {
  const childrenRef = (children as any).ref
  const ref = React.useMemo(
    () => mergeRefs([state.reference, propRef, childrenRef]),
    [state.reference, propRef, childrenRef]
  )

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    console.log(1)
    return React.cloneElement(
      children,
      state.getReferenceProps({ ref, ...props, ...children.props })
    )
  }

  return (
    <button ref={ref} {...state.getReferenceProps(props)}>
      {children}
    </button>
  )
})

export const Tooltip = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement> & { state: TooltipState }
>(function Tooltip({ state, ...props }, propRef) {
  const ref = React.useMemo(
    () => mergeRefs([state.floating, propRef]),
    [state.floating, propRef]
  )

  return (
    <FloatingPortal>
      {state.open && (
        <div
          ref={ref}
          className="rounded bg-black px-2 py-1 text-xs text-white"
          style={{
            position: state.strategy,
            top: state.y ?? 0,
            left: state.x ?? 0,
            visibility: state.x == null ? "hidden" : "visible",
          }}
          {...state.getFloatingProps(props)}
        />
      )}
    </FloatingPortal>
  )
})
