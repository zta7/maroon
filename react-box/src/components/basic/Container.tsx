import { forwardRef, HTMLProps } from "react"

export const Container = forwardRef<HTMLDivElement, HTMLProps<HTMLElement>>(
  function Container({ children, className, style }, propRef) {
    return (
      <div ref={propRef} className={className} style={style}>
        {children}
      </div>
    )
  }
)
