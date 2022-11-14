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
import { cloneElement } from "react"

interface Props {
  children: React.ReactElement 
}

export const Tooltip = ({children}: Props) => {
  const [open, setOpen] = useState(false);

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "top",
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [offset(5), flip(), shift()]
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role
  ]);

  const ReferenceComponent = cloneElement(children, {
    ref: reference,
    ...children.props,
    ...getReferenceProps() 
  })

  return (
    <div>
      {/* <ReferenceComponent /> */}
      <FloatingPortal>
        {open && (
          <div
            className="Tooltip"
            ref={floating}
            style={{
              // Positioning styles
              position: strategy,
              top: y ?? 0,
              left: x ?? 0
            }}
            {...getFloatingProps()}
          >
            I'm a tooltip!
          </div>
        )}
      </FloatingPortal>
    </div>
  );
}