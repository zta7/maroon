import { forwardRef, ReactNode } from "react"

interface Props {
  column?: boolean
  gap?: boolean
}

export const Stack = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLElement> & Props
>(function Stack(
  { children, column = false, gap = false, className = "", ...props },
  propRef
) {
  className += " "
  className += column
    ? "flex flex-col no-wrap justify-center"
    : "flex flex-row no-wrap items-center"
  if (gap) {
    if (column) className += " " + "gap-y-1"
    else className += " " + "gap-x-1"
  }
  return (
    <div className={className} {...props} ref={propRef}>
      {children}
    </div>
  )
})
