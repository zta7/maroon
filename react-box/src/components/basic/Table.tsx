import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  // getPaginationRowModel,
} from "@tanstack/react-table"

import { useQuery } from "@tanstack/react-query"
import { api } from "src/boot/axios"
import { Drag } from "./Drag"

export const Table = () => {
  const columns = useMemo(
    () => [
      {
        header: "h1",
        columns: [
          {
            accessorKey: "id",
            minSize: 100,
            size: 200,
          },
          {
            accessorKey: "name",
            minSize: 100,
            size: 200,
          },
        ],
      },
      {
        header: "h2",
        columns: [
          {
            accessorKey: "password",
            minSize: 100,
            size: 200,
          },
          {
            header: "h3",
            columns: [
              {
                accessorKey: "createdAt",
                minSize: 100,
                size: 200,
              },
              {
                accessorKey: "updatedAt",
                minSize: 100,
                size: 200,
              },
              {
                id: "actions",
                // size: 'auto',
                header: () => <div>123</div>,
              },
            ],
          },
        ],
      },
    ],
    []
  )

  const {
    isLoading,
    error,
    data = [],
    isFetching,
  } = useQuery(["users"], () => api.get("user").then((res) => res.data))

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="h-full w-full">
      {/* visible checkbox */}
      <div className="flex flex-row">
        {table.getAllLeafColumns().map((column, i) => {
          return (
            <div key={column.id}>
              <div>
                <input
                  {...{
                    type: "checkbox",
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />
                {column.id}
              </div>
            </div>
          )
        })}
      </div>

      <div className="border-t border-b">
        <div className="flex flex-col">
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <div key={headerGroup.id} className="flex flex-row">
                {headerGroup.headers.map((header, i, arr) => {
                  return (
                    <div
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className={`group relative border-b ${
                        i !== arr.length - 1 && "border-r"
                      } ${i === arr.length - 1 && "grow"}`}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {i !== arr.length - 1 && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`absolute right-0 top-0 bottom-0 w-1 cursor-col-resize select-none
                          ${
                            header.column.getIsResizing()
                              ? "bg-blue-200"
                              : "group-hover:bg-red-300"
                          }`}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
        {table.getRowModel().rows.map((row) => {
          return (
            <div key={row.id} className="no-wrap relative flex flex-row">
              {row.getVisibleCells().map((cell, i, arr) => {
                return (
                  <div
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                    className={`break-all border-b ${
                      i !== arr.length - 1 && "border-r"
                    } ${i === arr.length - 1 && "grow"}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                )
              })}
            </div>
          )
        })}
        <div style={{ width: table.getTotalSize() }} className="border-b">
          + New
        </div>
        <div className="no-wrap relative flex flex-row">
          {table.getAllLeafColumns().map((column, i, arr) => {
            return (
              <div
                key={column.id}
                style={{ width: column.getSize() }}
                className={`${i !== arr.length - 1 && "border-r"}`}>
                <label>Cacl</label>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
