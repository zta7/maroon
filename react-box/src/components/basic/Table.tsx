import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table"

import { useQuery } from "@tanstack/react-query"
import { api } from "src/boot/axios"
import { useMemo } from "react"
import { Icon } from "./Icon"
import { Stack } from "./Stack"

export const Table = () => {
  console.log("kkk")
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
                header: () => (
                  <Stack className="h-full w-full text-xl">
                    <Stack className="btn aspect-square h-full justify-center">
                      <Icon name="mdi-plus" />
                    </Stack>
                    <Stack className="btn h-full grow">
                      <Icon name="mdi-dots-horizontal" />
                    </Stack>
                  </Stack>
                ),
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
    <div style={{ width: table.getTotalSize() }}>
      {/* <div className="flex flex-row">
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
      </div> */}
      {table.getHeaderGroups().map((headerGroup, i, arr) => {
        return (
          <div
            key={headerGroup.id}
            className={`flex flex-row border-t ${
              i === arr.length - 1 ? "sticky top-0 z-10 border-b bg-white" : ""
            }`}>
            {headerGroup.headers.map((header, i, arr) => {
              return (
                <div
                  key={header.id}
                  style={{ width: header.getSize() }}
                  className={`group relative ${
                    i !== arr.length - 1 ? "border-r" : ""
                  } ${i === arr.length - 1 ? "grow" : ""}`}>
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
                      className={`absolute right-0 top-0 bottom-0 w-1 cursor-col-resize select-none ${
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
      {/* </div> */}
      <div>
        {table.getRowModel().rows.map((row, i, arr) => {
          return (
            <div
              key={row.id}
              className={`no-wrap relative flex flex-row ${
                i !== arr.length - 1 ? "border-b" : ""
              }`}>
              {row.getVisibleCells().map((cell, i, arr) => {
                return (
                  <div
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                    className={`break-all ${
                      i !== arr.length - 1 ? "border-r" : ""
                    } ${i === arr.length - 1 ? "grow" : ""}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <div className="no-wrap sticky bottom-0 flex flex-row border-t bg-white">
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
  )
}
