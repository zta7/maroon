import React, { cloneElement, useMemo, useState } from "react";
import {
  offset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useRole,
  useDismiss,
  useId,
  useClick,
  FloatingFocusManager,
  Placement,
} from "@floating-ui/react-dom-interactions";

interface Props {
  open: boolean
  onOpenChange: (v: boolean) => void
  children: JSX.Element
  placement: Placement
}

export const Popover = ({   open,
  onOpenChange,
  children,
  placement }: Props) => {

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange,
    middleware: [offset(5), flip(), shift()],
    whileElementsMounted: autoUpdate,
    placement
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context)
  ]);


  return (
    <>
      {open && (
        <FloatingFocusManager
          context={context}
          modal={false}
          order={["reference", "content"]}
          returnFocus={false}
        >
          <div
            ref={floating}
            className="Popover"
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0
            }}
            {...getFloatingProps()}
          >
            {children}
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};
