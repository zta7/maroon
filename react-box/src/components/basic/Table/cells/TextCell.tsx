import { offset } from "@floating-ui/react-dom-interactions"
import { CellContext } from "@tanstack/react-table"
import { useCallback, useEffect, useRef, useState } from "react"
import { useUpdateEffect } from "react-use"
import { Popover, PopoverAnchor, usePopoverState } from "../../Popover"

interface Props {
  context: CellContext<any, unknown>
}

export const TextCell = ({ context }: Props) => {
  const { row, getValue, cell, table, column } = context
  const initialValue = getValue() as string
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
    console.log(initialValue)
    setValue(initialValue)
  }, [row.original.id])

  const onBlur = () => {
    console.log("blur")
    table.options.meta?.updateColumn(row.original.id, column.id, value)
  }

  return (
    <>
      <PopoverAnchor state={popover} asChild>
        <div>{value}</div>
      </PopoverAnchor>
      <Popover state={popover}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          style={{ width: cell.column.getSize() }}
          className="ring"></input>
      </Popover>
    </>
  )
}
