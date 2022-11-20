import {
  ColumnOrderState,
  flexRender,
  Header as _Header,
} from "@tanstack/react-table"
import { useDrag } from "@use-gesture/react"
import { Dispatch, forwardRef, SetStateAction, useEffect, useRef } from "react"
import { animated, useSprings } from "react-spring"
import { findClosest, findClosestIndex } from "src/helper"
import { Column } from "./Column"
import swap from "lodash-move"
import { cloneDeep, head } from "lodash"

interface Props {
  headers: Array<_Header<never, unknown>>
  isLast: boolean
  setColumnOrder: Dispatch<SetStateAction<ColumnOrderState>>
}

export const Header = forwardRef<HTMLDivElement, Props>(function Header(
  { isLast, headers, setColumnOrder },
  propRef
) {
  const fn =
    (
      order: _Header<never, unknown>[],
      originalIndex = 0,
      curIndex = 0,
      x = 0,
      active = false
    ) =>
    (index: number) => {
      if (active && index === originalIndex)
        return {
          x,
          zIndex: 1,
          immediate: (key: string) => key === "zIndex",
        }
      else if (active) {
        const otherCurIndex = order.indexOf(headers[index])
        const activeHeader = headers[originalIndex]
        const x = otherCurIndex > curIndex ? 0 : -activeHeader.getSize()
        return {
          x,
        }
      }
      return {
        x: 0,
      }
    }
  const order = useRef(headers)
  const [springs, api] = useSprings(headers.length, fn(order.current))
  const dragBind = useDrag(({ args: [header], active, movement: [x] }) => {
    console.log(header)
    const curIndex = order.current.indexOf(header)
    const toIndex = findClosestIndex(
      order.current.map((e) => e.getStart()),
      order.current[curIndex].getStart() + x
    )
    const newOrder = swap(order.current, curIndex, toIndex)
    api.start(fn(newOrder, curIndex, toIndex, x, active))
    if (!active) {
      // api.stop()
      console.log(newOrder.map((e) => e.id))

      setColumnOrder([
        "name",
        "password",
        "id",
        "createdAt",
        "updatedAt",
        "actions",
      ])
    }
  })

  return (
    <div
      ref={propRef}
      className={`flex flex-row border-t ${
        isLast ? "sticky top-0 z-10 border-b bg-white" : ""
      }`}>
      {springs.map((style, i, arr) => {
        const header = headers[i]
        const isLastColumn = i === arr.length - 1
        return (
          <animated.div key={i} style={style}>
            <div
              style={{ width: header.getSize() }}
              className={`relative ${!isLastColumn ? "border-r" : ""} ${
                isLastColumn ? "grow" : ""
              }`}>
              <div className="touch-auto" {...dragBind(header)}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </div>
              {!isLastColumn && (
                <div
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={`absolute -right-[2px] top-0 bottom-0 w-[4px] cursor-col-resize select-none ${
                    header.column.getIsResizing()
                      ? "bg-blue-200"
                      : "hover:bg-red-300"
                  }`}
                />
              )}
            </div>
          </animated.div>
        )
      })}
    </div>
  )
})
