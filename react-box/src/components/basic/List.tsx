import { createFactory, forwardRef, HTMLProps } from "react"
import cx from "classnames"

export const List = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & {
    rounded?: boolean
    active?: boolean
  }
>(function List({ className = "", children, ...props }, propRef) {
  return (
    <div
      ref={propRef}
      className={cx(["relative flex flex-col flex-nowrap", className])}
      {...props}>
      {children}
    </div>
  )
})

export const Item = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLElement> & {
    rounded?: boolean
    active?: boolean
  }
>(function Item(
  { className = "", children, rounded = false, active = false, ...props },
  ref
) {
  
  return (
    <div
      className={[
        `relative flex cursor-pointer flex-row flex-nowrap items-center px-2 py-1 text-sm text-neutral-600 hover:bg-neutral-200 ${
          rounded ? "rounded" : ""
        } ${active ? "bg-neutral-200" : ""}`,
        className,
      ].join(" ")}
      {...props}
      ref={ref}>
      {children}
    </div>
  )
})
