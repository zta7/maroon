import {
  cloneElement,
  forwardRef,
  HTMLProps,
  isValidElement,
  useMemo,
  useState,
} from "react"
import { animated, useTransition } from "react-spring"
import {
  useFloating,
  useInteractions,
  useClick,
  useRole,
  useDismiss,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
  Placement,
} from "@floating-ui/react-dom-interactions"
import { mergeRefs } from "react-merge-refs"
import { Fade } from "../transition/Fade"

interface useDialogStateProps {
  placement?: Placement
}

export const useDialogState = ({ placement = "top" }: useDialogStateProps) => {
  const [open, setOpen] = useState(false)
  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
  })
  const context = data.context

  const interactions = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context),
  ])

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
type DialogState = ReturnType<typeof useDialogState>

export const DialogAnchor = forwardRef<
  HTMLElement,
  HTMLProps<HTMLElement> & {
    state: DialogState
    asChild?: boolean
  }
>(function DialogAnchor(
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

export const Dialog = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & { state: DialogState }
>(function Dialog({ state, ...props }, propRef) {
  const ref = useMemo(
    () => mergeRefs([state.floating, propRef]),
    [state.floating, propRef]
  )
  return (
    <>
      <FloatingPortal>
        <Fade state={state.open}>
          <FloatingOverlay
            lockScroll
            className="flex items-center justify-center bg-indigo-500/30">
            <FloatingFocusManager context={state.context}>
              <div
                style={{
                  maxHeight: "80vh",
                  maxWidth: "calc(100vw - 24px)",
                }}
                className="overflow-hidden rounded-lg bg-white">
                <div ref={ref} {...state.getFloatingProps(props)}></div>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </Fade>
      </FloatingPortal>
    </>
  )
})
