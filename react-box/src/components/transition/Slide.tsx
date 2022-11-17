import { forwardRef, HTMLProps, useState } from "react"
import { animated, useTransition } from "react-spring"

interface Props {
  state: boolean
}

export const Slide = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & Props
>(function Slide({ children, state, style = {}, ...props }, propRef) {
  const transitions = useTransition(state, {
    from: { transform: "translate3d(100%,0,0)" },
    enter: { transform: "translate3d(0%,0,0)" },
    leave: { transform: "translate3d(100%,0,0)" },
  })

  return transitions(
    (styles, bool) =>
      bool && (
        <animated.div
          {...props}
          style={Object.assign(style, styles)}
          ref={propRef}>
          {children}
        </animated.div>
      )
  )
})
