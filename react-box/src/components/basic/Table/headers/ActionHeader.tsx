import { Icon } from "../../Icon"
import { Stack } from "../../Stack"

export const ActionHeader = () => {
  return (
    <Stack className="h-full grow text-xl">
      <Stack className="btn aspect-square h-full justify-center">
        <Icon name="mdi-plus" />
      </Stack>
      <Stack className="btn h-full grow">
        <Icon name="mdi-dots-horizontal" />
      </Stack>
    </Stack>
  )
}
