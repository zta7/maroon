import { Cell as _Cell, flexRender } from "@tanstack/react-table"
import { forwardRef } from "react"
import { Stack } from "../Stack"

interface Props {
  cell: _Cell<any, unknown>
}

export const Cell = (function Cell(
  { cell }:Props,
) {
  const { column} = cell.getContext()
  const wrap = 1
  // console.log(column.columnDef.minSize = 20)
  return (
    <Stack className={`${wrap ? "break-words" : "whitespace-nowrap overflow-hidden"}`}>
      {flexRender(
        cell.column.columnDef.cell,
        cell.getContext()
      )}
    </Stack>
  )
})
