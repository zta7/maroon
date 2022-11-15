import {
  useFloating,
  useInteractions,
  useClick,
  useRole,
  useDismiss,
  FloatingFocusManager,
  Placement,
  autoUpdate,
  FloatingPortal,
} from "@floating-ui/react-dom-interactions"
import { cloneElement, isValidElement, ReactNode } from "react"
import { mergeRefs } from "react-merge-refs"

interface usePopoverStateProps {
  placement?: Placement
}

export const usePopoverState = ({
  placement = "top",
}: usePopoverStateProps) => {
  const [open, setOpen] = useState(false)
  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
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

type PopoverState = ReturnType<typeof usePopoverState>

interface PopoverAnchorProps {
  state: PopoverState
  children: ReactNode
}

export const PopoverAnchor = ({
  children,
  state,
  ...props
}: PopoverAnchorProps) => {
  const childrenRef = (children as any).ref
  const ref = useMemo(
    () => mergeRefs([state.reference, childrenRef]),
    [state.reference, childrenRef]
  )

  // `asChild` allows the user to pass any element as the anchor
  if (isValidElement(children)) {
    return cloneElement(
      children,
      state.getReferenceProps({ ref, ...props, ...children.props })
    )
  }

  return <></>
}

interface Props {
  state: PopoverState
  children: JSX.Element
}

export const Popover = ({ children, state }: Props) => {
  const { context, getFloatingProps, floating, open } = state

  return (
    <>
      {open && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={false}
            order={["reference", "content"]}
            returnFocus={false}>
            <div
              style={{
                position: state.strategy,
                top: state.y ?? 0,
                left: state.x ?? 0,
              }}
              ref={floating}
              // style={{
              //   position: strategy,
              //   top: y ?? 0,
              //   left: x ?? 0,
              // }}
              {...getFloatingProps()}>
              {children}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  )
}
