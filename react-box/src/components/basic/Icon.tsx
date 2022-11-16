import { Icon as Iconify } from "@iconify/react"
import { forwardRef, HTMLProps } from "react"

interface Props {
  className?: string
  name?: string
}
// <T extends React.HTMLProps<Element> & Props>
export const Icon = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & Props
>(function Icon({ className = "", name = "", onClick }, propRef) {
  return (
    <div className={className} onClick={onClick} ref={propRef}>
      <Iconify icon={name} />
    </div>
  )
})
