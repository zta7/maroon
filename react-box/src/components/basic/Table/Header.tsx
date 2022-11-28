import {
  ColumnOrderState,
  flexRender,
  Header as _Header,
  Table,
} from "@tanstack/react-table"
import { useDrag, useGesture } from "@use-gesture/react"
import { cloneElement, forwardRef, ReactElement, ReactNode } from "react"
import { animated, useSprings } from "react-spring"
import { findClosestIndex } from "src/helper"
import swap from "lodash-move"
// import { ActionHeader } from "./headers/ActionHeader"

interface Props {
  headers: Array<_Header<any, unknown>>
  table: Table<any>
}

export const Header = forwardRef<HTMLDivElement, Props>(function Header(
  { headers, table },
  propRef
) {
  const fn =
    (
      order: _Header<any, unknown>[],
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

  let lastX = 0
  const dragBind = useGesture(
    {
      onDrag: async ({ args: [header], active, movement: [x], dragging, event, cancel }) => {
        const curIndex = headers.indexOf(header)
        const toIndex = findClosestIndex(
          headers.map((header) => header.getStart()),
          headers[curIndex].getStart() + x
        )
          
        const newOrder = swap(headers, curIndex, toIndex)
        const promises = api.start(fn(newOrder, curIndex, x, active))
        console.log(event)
        if (!active) {
          console.log('should canceled')
          lastX = x
          await Promise.all(promises)
          api.start((e) => ({ x: 0, immediate: true }))
          table.setColumnOrder(newOrder.map((e: any) => e.id))
        }
      },
      onClickCapture: ({event, ...state}) => {
        if(lastX !== 0)
          event.stopPropagation();
      }
    },
    {
      eventOptions: {
        capture: false
      }
    }
  )


  return (
    <div className="sticky top-0 flex h-8 flex-row border-t border-b bg-white">
      <div className="flex flex-row">
        {springs.map((style, i) => {
          const header = headers[i]
          // console.log(cloneElement(
          //   flexRender(
          //     header.column.columnDef.header,
          //     header.getContext()
          //   ) as ReactElement,
          //   {style: {background: 'red'}}
          // ))
          // console.log(dragBind(header))
          return (
            <animated.div
              key={i}
              style={{ ...style, width: header.getSize() }}
              className="relative border-r h-full touch-none" {...dragBind(header)}>
                {
                  header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                }
              <div
                onMouseDown={header.getResizeHandler()}
                onTouchStart={header.getResizeHandler()}
                className={`absolute -right-[2px] top-0 bottom-0 w-[4px] cursor-col-resize select-none transition delay-75 ${
                  header.column.getIsResizing()
                    ? "bg-blue-200"
                    : "hover:bg-red-300"
                }`}
              />
            </animated.div>
          )
        })}
      </div>
    </div>
  )
})
