import { flexRender, Header, RowData } from "@tanstack/react-table"
import { useDrag } from "@use-gesture/react"
import { forwardRef, HTMLProps } from "react"

interface Props {
  header: Header<never, unknown>
  headers: Array<Header<never, unknown>>
  isLastColumn: boolean
}

export const Column = forwardRef<HTMLDivElement, Props>(function Column(
  { isLastColumn, header, headers },
  propRef
) {
  // const dragBind = useDrag(
  //   (state) => {
  //     console.log(1)
  //   },
  //   {
  //     axis: "x",
  //   }
  // )
  return (
    <div
      ref={propRef}
      style={{ width: header.getSize() }}
      className={`relative ${!isLastColumn ? "border-r" : ""} ${
        isLastColumn ? "grow" : ""
      }`}>
      <div>
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
      </div>
      {!isLastColumn && (
        <div
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className={`absolute right-0 top-0 bottom-0 w-1 cursor-col-resize select-none ${
            header.column.getIsResizing() ? "bg-blue-200" : "hover:bg-red-300"
          }`}
        />
      )}
    </div>
  )
})
