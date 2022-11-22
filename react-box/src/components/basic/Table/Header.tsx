import {
  ColumnOrderState,
  flexRender,
  Header as _Header,
} from "@tanstack/react-table"
import { useDrag } from "@use-gesture/react"
import { Dispatch, forwardRef, SetStateAction, useEffect, useRef } from "react"
import { animated, useSprings } from "react-spring"
import { findClosestIndex } from "src/helper"
import swap from "lodash-move"

interface Props {
  headers: Array<_Header<never, unknown>>
  setColumnOrder: Dispatch<SetStateAction<ColumnOrderState>>
}

export const Header = forwardRef<HTMLDivElement, Props>(function Header(
  {headers, setColumnOrder },
  propRef
) {
  const fn =
    (
      order: _Header<never, unknown>[],
      originalIndex = 0,
      x = 0,
      active = false
    ) =>
    (index: number) => {
      if (active && index === originalIndex) {
        return {
          x,
          zIndex: 1,
          immediate: true,
        }
      } else {
        const curIndex = order.indexOf(headers[index])
        const curLeft = order
          .slice(0, curIndex)
          .reduce((arr, cur) => (arr += cur.getSize()), 0)
        const left = headers
          .slice(0, index)
          .reduce((arr, cur) => (arr += cur.getSize()), 0)
        return {
          x: curLeft - left,
          immediate: !active,
        }
      }
    }
  const [springs, api] = useSprings(headers.length, fn(headers))

  const dragBind = useDrag(
    async ({ args: [header], active, movement: [x] }) => {

      const curIndex = headers.indexOf(header)
      const toIndex = findClosestIndex(
        headers.map((header) => header.column.columnDef.affixed ? -Infinity: header.getStart()),
        headers[curIndex].getStart() + x
      )

      // const target = headers[curIndex].getStart() + x
      // header.reduce((a: any, b: any) => {

      //   return Math.abs(b.getStart() - target) < Math.abs(a.getStart() - target)
      //     ? b
      //     : a
      // })

      const newOrder = swap(headers, curIndex, toIndex)
      const promises = api.start(fn(newOrder, curIndex, x, active))
      if (!active) {
        await Promise.all(promises)
        api.start((e) => ({ x: 0, immediate: true }))
        setColumnOrder(newOrder.map((e: any) => e.id))
      }
    },
    {
      delay: 100,
    }
  )

  return (
    <div
      ref={propRef}
      className="flex h-8 flex-row border-t sticky top-0 z-10 border-b bg-white">
      {springs.map((style, i, arr) => {
        const header = headers[i]
        const isLastColumn = i === arr.length - 1
        console.log(header.getContext())
        return (
          <animated.div
            key={i}
            style={{ ...style, width: header.getSize() }}
            className="relative border-r last:border-r-0 last:grow">
            <div className="h-full touch-none"
              {...header.column.columnDef.affixed ? false : dragBind(header)}>

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
          </animated.div>
        )
      })}
    </div>
  )
})
