import { forwardRef } from "react"

interface CardProps {
  children: React.ReactNode
}
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { children },
  ref
) {
  return (
    <div className="rounded border bg-white" ref={ref}>
      {children}
    </div>
  )
})

interface CardSectionProps {
  children: React.ReactNode
}

export const CardSection = forwardRef<HTMLDivElement, CardSectionProps>(
  function CardSection({ children }, ref) {
    return <div ref={ref}>{children}</div>
  }
)
