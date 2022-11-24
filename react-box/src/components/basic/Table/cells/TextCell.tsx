import { offset } from "@floating-ui/react-dom-interactions"
import { CellContext } from "@tanstack/react-table"
import { ChangeEvent, useState } from "react"
import { useMeasure, useSize, useUpdateEffect } from "react-use"
import { Popover, PopoverAnchor, usePopoverState } from "../../Popover"

interface Props {
  context: CellContext<any, unknown>
}

export const TextCell = ({ context }: Props) => {
  const { row, getValue, cell, table, column } = context
  const initialValue = (getValue() as string) || ""
  const [value, setValue] = useState<string>(initialValue)
  const popover = usePopoverState({
    placement: "right",
    middleware: [
      offset(({ rects }) => {
        console.log(rects.reference.width)
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

  // const [ref, { x, y, width, height }] = useMeasure<HTMLDivElement>()

  return (
    <>
      <PopoverAnchor state={popover} asChild>
        <div
          style={{ width: cell.column.getSize() }}
          className="border-r px-2 py-1">
          {value}
        </div>
      </PopoverAnchor>
      <Popover state={popover}>
        <input
          autoFocus
          value={value}
          onChange={onChange}
          className="ring"></input>
      </Popover>
    </>
  )
}
