import { offset } from "@floating-ui/react-dom-interactions"
import { CellContext } from "@tanstack/react-table"
import {
  BaseSyntheticEvent,
  ChangeEvent,
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  useEffectOnce,
  useMeasure,
  useUnmount,
  useUpdateEffect,
} from "react-use"
import { ValidationError } from "yup"
import { Popover, PopoverAnchor, usePopoverState } from "../../Popover"
import { Tooltip, TooltipAnchor, useTooltipState } from "../../Tooltip"
import { Icon } from "../../Icon"

interface Props {
  context: CellContext<any, unknown>
  children?: ReactNode
  contentClassName?: string
}

export const Cell = ({ context, children, contentClassName = '' }: Props) => {
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

  // const onEmailClick = (e: BaseSyntheticEvent) => {
  //   e.stopPropagation()
  //   window.location.href = `mailto:${value}`
  // }


  return (
    <>
      <PopoverAnchor state={popover} asChild>
        <div
          ref={ref}
          style={{ width: cell.column.getSize() }}
          className={`group/cell relative border-r px-2 py-1 ${contentClassName}`}>
          {value}
          <div className="absolute top-2 right-2 hidden group-hover/cell:block">
            {children}
          </div>
        </div>
      </PopoverAnchor>
      <Popover state={popover}>
        <TooltipAnchor state={tooltip} asChild>
          <input
            autoFocus
            value={popValue}
            onChange={e => setPopValue(e.target.value)}
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
