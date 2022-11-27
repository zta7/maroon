import { offset, size } from "@floating-ui/react-dom-interactions"
import { CellContext } from "@tanstack/react-table"
import { ChangeEvent, useRef, useState } from "react"
import { useUpdateEffect } from "react-use"
import { Card, CardSection } from "../../Card"
import { Popover, PopoverAnchor, usePopoverState } from "../../Popover"
import { useCombobox } from "downshift"
import cx from "classnames"
import { Combobox } from "./SelectCell/Combobox"

interface Props {
  context: CellContext<any, unknown>
  options: Array<any>
}

export const SelectCell = ({ context, options }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const { row, getValue, cell, table, column } = context
  const initialValue = (getValue() as string) || ""
  const [value, setValue] = useState<string>(initialValue)
  const popover = usePopoverState({
    placement: "right-start",
    middleware: [
      offset(({ rects }) => {
        return -rects.reference.width
      }),
    ],
  })
  useUpdateEffect(() => {
    setValue(initialValue)
  }, [row.original.id])

  const onChange = (value: any) => {
    if (value) {
      setValue(value)
      table.options.meta?.updateColumn(row.original.id, column.id, value)
      popover.setOpen(false)
    }
  }

  return (
    <>
      <PopoverAnchor state={popover} asChild>
        <div
          ref={ref}
          style={{ width: cell.column.getSize() }}
          className="group/cell relative border-r px-2 py-1">
          {value}
        </div>
      </PopoverAnchor>
      <Popover state={popover}>
        <Combobox options={options} value={value} onChange={onChange} />
      </Popover>
    </>
  )
}
