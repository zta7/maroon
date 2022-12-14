import {
  ColumnOrderState,
  flexRender,
  Header as _Header,
  Table,
} from "@tanstack/react-table"
import { useDrag, useGesture } from "@use-gesture/react"
import { cloneElement, forwardRef, ReactElement, ReactNode, useEffect, useRef, useState } from "react"
import { animated, useSpringRef, useSprings } from "react-spring"
import { findClosestIndex } from "src/helper"
import swap from "lodash-move"
import { Header } from "./Header"
// import { ActionHeader } from "./headers/ActionHeader"

interface Props {
  headers: Array<_Header<any, unknown>>
}

export const Headers = forwardRef<HTMLDivElement, Props>(function Headers(
  { headers },
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
  const headerRefs = useRef<HTMLDivElement[]>([])

  useEffect(
    () => {
      headerRefs.current = headerRefs.current.slice(0, headers.length)
   }, [headers]
  )

  const dragBind = useGesture(
    {
      onDrag: async ({ args: [_header], active, movement: [x], event, cancel }) => {
        let header = _header as _Header<any, unknown>
        const curIndex = headers.indexOf(header)
        const headerRef = headerRefs.current[curIndex]

        if(event.target && !headerRef.contains(event.target as Node)) cancel()

        const toIndex = findClosestIndex(
          headers.map((header) => header.getStart()),
          headers[curIndex].getStart() + x
        )

        header.column.isDragging = true
          
        const newOrder = swap(headers, curIndex, toIndex)
        const promises = api.start(fn(newOrder, curIndex, x, active))
        if (!active) {
          await Promise.all(promises)
          api.start((e) => ({ x: 0, immediate: true }))
          header.column.isDragging = false
          if(curIndex !== toIndex){
            const {table } = header.getContext()
            table.setColumnOrder(newOrder.map((e: any) => e.id))
          }
          
        }
      },
      // onClickCapture: ({event, ...state}) => {
      //   if(lastX !== 0)
      //     event.stopPropagation();
      // }
    },
  )

  return (
    <div className="sticky top-0 flex h-8 flex-row border-t border-b bg-white">
      <div className="flex flex-row">
        {springs.map((style, i) => {
          const header = headers[i]
          // console.log(dragBind(header))
          return (
            <animated.div
              key={i}
              style={{ ...style, width: header.getSize() }}
              ref={el => headerRefs.current[i] =  el }
              className="relative border-r">
                <Header {...dragBind(header)} className="touch-none h-full" header={header}/>
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
