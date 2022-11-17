import { forwardRef, HTMLProps, useState } from "react"
import { animated, useTransition } from "react-spring"

interface Props {
  state: boolean
}

export const Fade = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & Props
>(function Fade({ children, state, style = {} }, propRef) {
  const transitions = useTransition(state, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return transitions(
    (styles, bool) =>
      bool && (
        <animated.div style={Object.assign(style, styles)} ref={propRef}>
          {children}
        </animated.div>
      )
  )
})
