import { Icon as Iconify } from "@iconify/react"

interface Props {
  className?: string
  name?: string
}
export const Icon = <T extends React.HTMLProps<Element> & Props>({
  className = "",
  name = "",
  onClick,
}: T) => {
  return (
    <div className={className} onClick={onClick}>
      <Iconify icon={name} />
    </div>
  )
}
