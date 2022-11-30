import { HeaderContext } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { Icon } from "../../Icon"
import { Item } from "../../List"
import { Popover, PopoverAnchor, usePopoverState } from "../../Popover"
import { Stack } from "../../Stack"
import { Switch } from "../../Switch"

interface Props {
  context: HeaderContext<any, unknown>
}

export const TextHeader = ({ context }: Props) => {
  const { header, column, table } = context
  const popover = usePopoverState({ placement: "bottom-start", onOpenChange: (v) => {
    if(v) {
      if(!column.isDragging) popover.setOpen(v)
    }
    else {
      popover.setOpen(v)
    }
  }})
  
  const [meta, setMeta] = useState(column.columnDef.meta || {})
  // table.set

  // console.log(column.columnDef.meta = {})

  const onWrapChange = (value: boolean) => {
    setMeta(old => ({ ...old, wrap: value }))
    console.log(value)
  }
  
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
          <Item>
            <span>Wrap column { JSON.stringify(meta) }</span>
            <Switch onChange={onWrapChange}/>
          </Item>
        </Stack>
      </Popover>
    </>
  )
}
