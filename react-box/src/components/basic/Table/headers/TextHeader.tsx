import { Icon } from "../../Icon"
import { Stack } from "../../Stack"

interface Props {
  text: '',
}

export const NameHeader = ({ text }: Props) => {
  return (
    <Stack className="btn h-full w-full">
      <div>{text}</div>
    </Stack>
  )
}