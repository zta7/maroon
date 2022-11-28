import { HeaderContext } from "@tanstack/react-table"
import { Icon } from "../../Icon"
import { Item } from "../../List"
import { Popover, PopoverAnchor, usePopoverState } from "../../Popover"
import { Stack } from "../../Stack"

interface Props {
  context: HeaderContext<any, unknown>
}

export const TextHeader = ({ context }: Props) => {
  const { header, column } = context
  const popover = usePopoverState({ placement: "bottom-start" })
  return (
    <>
      <PopoverAnchor state={popover} asChild>
        <Stack className="btn h-full w-full px-2 text-neutral-400">
          <Icon name="mdi-text" className="mr-2 text-xl" />
          <div className="text-sm" >{header.id}</div>
        </Stack>
      </PopoverAnchor>
      <Popover state={popover}>
        <Stack column>
          <Item rounded>Sort asc</Item>
          <Item rounded>Sort desc</Item>
          <Item rounded>Hide in view</Item>
          <Item rounded>
            <span>Wrap column</span>
          </Item>
        </Stack>
      </Popover>
    </>
  )
}
