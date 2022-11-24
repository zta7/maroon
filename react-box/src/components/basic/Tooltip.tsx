import { mergeRefs } from "react-merge-refs"
import {
  useFloating,
  autoUpdate,
  offset,
  shift,
  useHover,
  useRole,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react-dom-interactions"
import type { Placement } from "@floating-ui/react-dom-interactions"
import React, {
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
} from "react"

interface useTooltipStateProps {
  placement: Placement
  disabled?: Boolean
  onOpenChange?: null | ((v: boolean) => void)
}

export function useTooltipState({
  placement,
  disabled = false,
  onOpenChange = null,
}: useTooltipStateProps) {
  const [open, setOpen] = React.useState(false)

  const data = useFloating({
    placement,
    open,
    onOpenChange: onOpenChange || setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), shift({ crossAxis: true })],
  })

  const context = data.context

  const interactions = useInteractions([
    useHover(context, { delay: { open: 200 }, enabled: !disabled }),
    useRole(context, { role: "tooltip" }),
  ])

  useEffect(() => {
    if (disabled) setOpen(false)
  }, [disabled])

  return useMemo(
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

export const TooltipAnchor = forwardRef<
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
  const ref = useMemo(
    () => mergeRefs([state.reference, propRef, childrenRef]),
    [state.reference, propRef, childrenRef]
  )
  // `asChild` allows the user to pass any element as the anchor
  if (asChild && isValidElement(children)) {
    return cloneElement(
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

export const Tooltip = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement> & { state: TooltipState }
>(function Tooltip({ state, ...props }, propRef) {
  const ref = useMemo(
    () => mergeRefs([state.floating, propRef]),
    [state.floating, propRef]
  )
  return (
    <FloatingPortal>
      {state.open && (
        <div
          ref={ref}
          className="whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white"
          style={{
            position: "fixed",
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
