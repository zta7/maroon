import { offset } from "@floating-ui/react-dom-interactions"
import { CellContext } from "@tanstack/react-table"
import { BaseSyntheticEvent, ReactNode, useRef, useState } from "react"
import { useUpdateEffect } from "react-use"
import { ValidationError } from "yup"
import { Icon } from "../../Icon"
import { Popover, PopoverAnchor, usePopoverState } from "../../Popover"
import { Tooltip, TooltipAnchor, useTooltipState } from "../../Tooltip"

interface Props {
  context: CellContext<any, unknown>
}

export const EmailCell = ({ context }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const { row, getValue, cell, table, column } = context
  const initialValue = (getValue() as string) || ""
  const [value, setValue] = useState<string>(initialValue)
  const [popValue, setPopValue] = useState<string>(value)
  const tooltip = useTooltipState({ placement: "right", onOpenChange() {} })
  const [error, setError] = useState<false | ValidationError>(false)
  const popover = usePopoverState({
    placement: "right",
    middleware: [
      offset(({ rects }) => {
        return -rects.reference.width
      }),
    ],
    onOpenChange(v) {
      if (v) popover.setOpen(v)
      else {
        const schema = table.options.meta?.schema
        schema
          ?.pick([`${column.id}`])
          .validate({ [column.id]: popValue })
          .then(() => {
            setError(false)
            popover.setOpen(v)

            if (value !== popValue) {
              setValue(popValue)
              table.options.meta?.updateColumn(
                row.original.id,
                column.id,
                popValue
              )
            }
          })
          .catch((err: ValidationError) => {
            setError(err)
          })
      }
    },
  })

  useUpdateEffect(() => {
    tooltip.setOpen(!!error)
  }, [error])

  useUpdateEffect(() => {
    setValue(initialValue)
  }, [row.original.id])

  const onEmailClick = (e: BaseSyntheticEvent) => {
    e.stopPropagation()
    window.location.href = `mailto:${context.cell.getValue()}`
  }

  return (
    <>
      <PopoverAnchor state={popover} asChild>
        <div
          ref={ref}
          style={{ width: cell.column.getSize() }}
          tabIndex={0}
          className="group/cell relative border-r px-2 py-1 underline underline-offset-4">
          {value}
          <div className="absolute top-2 right-2 hidden group-hover/cell:block">
            <Icon name="mdi-at" onClick={onEmailClick} />
          </div>
        </div>
      </PopoverAnchor>
      <Popover state={popover}>
        <TooltipAnchor state={tooltip} asChild>
          <input
            autoFocus
            value={popValue}
            onChange={(e) => setPopValue(e.target.value)}
            style={{
              width: ref.current?.offsetWidth,
              height: ref.current?.offsetHeight,
            }}
            className={`rounded-sm ring-offset-1 ring-offset-gray-400 ${
              error ? "ring-2 ring-red-500" : "ring-2"
            }`}></input>
        </TooltipAnchor>
        <Tooltip state={tooltip}>
          <div>{error && error.errors[0]}</div>
        </Tooltip>
      </Popover>
    </>
  )
}
