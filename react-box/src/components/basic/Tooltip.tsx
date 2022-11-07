import { useState } from "react"
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react-dom-interactions"

// interface Props {
//   anchor: JSX.Element
//   tooltip: JSX.Element
// }

export const Tooltip = () => {
  const [open, setOpen] = useState(false)
  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "top",
    whileElementsMounted: autoUpdate,
    middleware: [offset(5), flip(), shift()],
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { restMs: 150 }),
  ])

  return (
    <>
      <button ref={reference} {...getReferenceProps()}>
        Hover or focus me
      </button>
      <FloatingPortal>
        {open && (
          <div
            className="Tooltip"
            ref={floating}
            style={{
              // Positioning styles
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}>
            tooltip !
          </div>
        )}
      </FloatingPortal>
    </>
  )
}
