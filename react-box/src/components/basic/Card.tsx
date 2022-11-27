import { forwardRef, HTMLProps } from "react"

export const Card = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  function Card({ children, className = "", ...props }, ref) {
    return (
      <div
        className={["rounded bg-white px-2 py-1 shadow-lg", className].join(
          " "
        )}
        {...props}
        ref={ref}>
        {children}
      </div>
    )
  }
)

export const CardSection = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement>
>(function CardSection({ children, ...props }, ref) {
  return (
    <div {...props} ref={ref}>
      {children}
    </div>
  )
})
