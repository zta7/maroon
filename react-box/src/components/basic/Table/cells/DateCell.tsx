import { offset } from "@floating-ui/react-dom-interactions"
import { CellContext } from "@tanstack/react-table"
import { ChangeEvent, useState } from "react"
import { useUpdateEffect } from "react-use"
import { Popover, PopoverAnchor, usePopoverState } from "../../Popover"

interface Props {
  context: CellContext<any, unknown>
}

export const DateCell = ({ context }: Props) => {
  const { row, getValue, cell, table, column } = context
  const initialValue = getValue() as string || ''
  const [value, setValue] = useState<string>(initialValue)
  const popover = usePopoverState({
    placement: "right",
    middleware: [
      offset(({ rects }) => {
        return -rects.reference.width
      }),
    ],
  })
  useUpdateEffect(() => {
    setValue(initialValue)
  }, [row.original.id])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue(value)
    table.options.meta?.updateColumn(row.original.id, column.id, value)
  }

  return (
    <>
      <PopoverAnchor state={popover} asChild>
        <div className="h-full w-full">{value}</div>
      </PopoverAnchor>
      <Popover state={popover}>
        {/* - -! */}
      </Popover>
    </>
  )
}
