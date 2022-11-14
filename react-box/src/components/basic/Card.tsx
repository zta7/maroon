interface CardProps {
  children: React.ReactNode
}
export const Card = forwardRef<HTMLDivElement, CardProps>(({children}, ref) => {
  return (
    <div className="rounded bg-white border" ref={ref}>
      {children}
    </div>
  )
})

interface CardSectionProps {
  children: React.ReactNode
}

export const CardSection = forwardRef<HTMLDivElement, CardSectionProps>(({children}, ref) => {
  return (
    <div ref={ref}>
      {children}
    </div>
  )
})