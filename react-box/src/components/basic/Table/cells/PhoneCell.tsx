import { offset } from "@floating-ui/react-dom-interactions"
import { CellContext } from "@tanstack/react-table"
import { ChangeEvent, useState } from "react"
import { useUpdateEffect } from "react-use"
import { Popover, PopoverAnchor, usePopoverState } from "../../Popover"
import { Field } from 'formik';


interface Props {
  context: CellContext<any, unknown>
}

export const PhoneCell = ({ context }: Props) => {
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

  const validate = value => {
    let errorMessage;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      errorMessage = 'Invalid email address';
    }
    return errorMessage;
  };

  return (
    <>
      <PopoverAnchor state={popover} asChild>
        <div className="h-full w-full">{value}</div>
      </PopoverAnchor>
      <Popover state={popover}>
        {/* <input
          autoFocus
          value={value}
          onChange={onChange}
          style={{ width: cell.column.getSize() }}
          className="ring"></input> */}

        <Field name="phone" value={value} validate={validate}/>
      </Popover>
    </>
  )
}
