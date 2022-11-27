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
>(function Icon({ className = "", name = "", ...props }, propRef) {
  return (
    <div
      className={[
        "text-lg text-neutral-500 active:text-neutral-400",
        className,
      ].join(" ")}
      {...props}
      ref={propRef}>
      <Iconify icon={name} />
    </div>
  )
})
