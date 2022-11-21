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
  // 0 1 2 3 4
  
  // 0

  const fn =
    (
      order: _Header<never, unknown>[],
      originalIndex = 0,
      x = 0,
      active = false
    ) =>
    (index: number) => {
      if (active && index === originalIndex) {
        const left = headers.slice(0, index).reduce((arr, cur) => arr += cur.getSize(), 0)
        return {
          position: 'absolute',
          left: left + x,
          zIndex: 1,
          immediate: true
        }
      }
      else{
        const curIndex = order.indexOf(headers[index])
        return {
          position: 'absolute',
          left: order.slice(0, curIndex).reduce((arr, cur) => arr += cur.getSize(), 0),
          immediate: false
        }
      }
    }
  const order = useRef(headers)
  const [springs, api] = useSprings(headers.length, () => ({}))

  const dragBind = useDrag(async({ args: [header], active, movement: [x], first }) => {

    // if(first) api.start(() => ({ position: 'absolute' }))

    const curIndex = headers.indexOf(header)
    const toIndex = findClosestIndex(
      headers.map((e) => e.getStart()),
      headers[curIndex].getStart() + x
    )
    const newOrder = swap(headers, curIndex, toIndex)
    const promises = api.start(fn(newOrder, curIndex, x, active))
    if (!active) {
      await Promise.all(promises)
      // console.log(newOrder.map((e) => e.id))
      // setColumnOrder(newOrder.map((e) => e.id))
    }
  })

  return (
    <div
      ref={propRef}
      className={`flex flex-row border-t h-6 relative ${
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
              <div style={{ touchAction: 'none' }} {...dragBind(header)}>
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
