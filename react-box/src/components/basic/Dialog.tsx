import React, { ReactNode } from "react"

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

interface useDialogStateProps {
  placement?: Placement
}

export const useDialogState = ({ placement = "top" }: useDialogStateProps) => {
  const [open, setOpen] = React.useState(false)
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

type DialogState = ReturnType<typeof useDialogState>
interface dialogProps {
  state: DialogState
  children: ReactNode
}

export const Dialog = ({ state, children }: dialogProps) => {
  const { context, getFloatingProps, reference, open } = state
  return (
    <>
      <FloatingPortal>
        {open && (
          <FloatingOverlay
            lockScroll
            style={{
              display: "grid",
              placeItems: "center",
              background: "rgba(25, 25, 25, 0.8)",
            }}>
            <FloatingFocusManager context={context}>
              <div ref={reference} {...getFloatingProps()}>
                {children}
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  )
}
