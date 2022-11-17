import { forwardRef, HTMLProps } from "react"

export const Container = forwardRef<HTMLDivElement, HTMLProps<HTMLElement>>(
  function Container({ children, ...props }, propRef) {
    return (
      <div {...props} ref={propRef}>
        {children}
      </div>
    )
  }
)
