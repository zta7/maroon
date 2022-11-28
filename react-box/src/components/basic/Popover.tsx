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
  shift,
  flip,
  FloatingOverlay,
  Middleware,
  size,
  limitShift,
} from "@floating-ui/react-dom-interactions"
import { Props } from "@floating-ui/react-dom-interactions/src/hooks/useDismiss"
import { unionBy } from "lodash"
import {
  cloneElement,
  forwardRef,
  isValidElement,
  ReactComponentElement,
  ReactNode,
  useMemo,
  useState,
} from "react"
import { mergeRefs } from "react-merge-refs"
import { animated, useTransition } from "react-spring"
import { Card } from "./Card"

interface usePopoverStateProps {
  placement: Placement
  middleware?: Array<Middleware>
  onOpenChange?: null | ((v: boolean) => void)
}

export const usePopoverState = ({
  placement,
  middleware = [],
  onOpenChange = null,
}: usePopoverStateProps) => {
  const [open, setOpen] = useState(false)
  const data = useFloating({
    placement,
    open,
    onOpenChange: onOpenChange || setOpen,
    whileElementsMounted: autoUpdate,
    middleware: unionBy(middleware, [
      size({
        apply(state) {
          console.log(state)
          const { elements, rects, availableHeight, x, y } = state
          // Object.assign(elements.floating.style, {
          //   top: 0,
          //   left: 0,
          //   transform: `translate(${Math.round(x)}px,${Math.round(y)}px)`,
          // })
        },
      }),
      shift({
        mainAxis: true,
        crossAxis: true,
        padding: 12,
        // limiter: limitShift({
        //   offset: {
        //     mainAxis: 200,
        //     crossAxis: 200,
        //   },
        // }),
      }),
    ]),
  })
  const context = data.context

  const interactions = useInteractions([
    // useClick(context),
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
  asChild?: boolean
}

export const PopoverAnchor = forwardRef<HTMLElement, PopoverAnchorProps>(
  function PopoverAnchor(
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
  }
)

export const Popover = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement> & {
    state: PopoverState
  }
>(function Popover({ state, ...props }, propRef) {
  const ref = useMemo(
    () => mergeRefs([state.floating, propRef]),
    [state.floating, propRef]
  )

  // const transitions = useTransition(state.open, {
  //   from: { opacity: 0 },
  //   enter: { opacity: 1 },
  //   leave: { opacity: 0 },
  // })

  return (
    <FloatingPortal>
      {state.open && (
        <FloatingOverlay>
          <div
            style={{
              position: "absolute",
              // top: state.y ?? 0,
              // left: state.x ?? 0,
              transform: `translate(${Math.round(state.x ?? 0)}px,${Math.round(
                state.y ?? 0
              )}px)`,
              maxWidth: "calc(100vw - 24px)",
              maxHeight: "calc(100vh - 24px)",
            }}
            className="overflow-auto rounded border bg-white px-2 py-1 shadow-lg"
            ref={ref}
            {...state.getFloatingProps(props)}></div>
        </FloatingOverlay>
      )}
      {/* {transitions((styles, bool) => {
          return (
            bool && (
              <FloatingOverlay lockScroll className="z-50">
                <FloatingFocusManager
                  context={state.context}
                  modal={false}
                  order={["reference", "content"]}
                  returnFocus={false}>
                  <animated.div style={styles}>
                    <div
                      style={{
                        position: "absolute",
                        top: state.y ?? 0,
                        left: state.x ?? 0,
                      }}
                      ref={ref}
                      {...state.getFloatingProps(props)}></div>
                  </animated.div>
                </FloatingFocusManager>
              </FloatingOverlay>
            )
          )
        })} */}
    </FloatingPortal>
  )
})
