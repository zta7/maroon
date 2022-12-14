import { HeaderContext } from "@tanstack/react-table"
import { Icon } from "../../Icon"
import { Stack } from "../../Stack"

interface Props {
  context: HeaderContext<any, unknown>
}

export const PhoneHeader = ({ context }: Props) => {
  const { header, column } = context
  return (
    <Stack className="btn h-full w-full px-2 text-neutral-400">
      <Icon name='mdi-phone' className="mr-2 text-xl"/>
      <div className="text-sm">{ header.id }</div>
    </Stack>
  )
}