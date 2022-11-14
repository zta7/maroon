import React, { cloneElement, useMemo, useState } from "react"
import {
  useFloating,
  useInteractions,
  useClick,
  useRole,
  useDismiss,
  useId,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
} from "@floating-ui/react-dom-interactions"
import { Card } from "./Card"

interface Props {
  open: boolean
  onOpenChange: (v: boolean) => void,
  children: JSX.Element
}

export const Dialog = ({
  open,
  onOpenChange,
  children,
  // onClose
}: Props) => {
  const { reference, floating, context } = useFloating({
    open,
    onOpenChange
  })

  const id = useId()

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context),
  ])


  return (
    <>
      <FloatingPortal>
        {open && (
          <FloatingOverlay
            className="bg-white/30 grid place-items-center"
            lockScroll>
            <FloatingFocusManager context={context}>
              <div
                ref={floating}
                {...getFloatingProps()}>
                {
                  children
                }
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  )
}
