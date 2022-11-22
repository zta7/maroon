import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnOrderState,
} from "@tanstack/react-table"

import { useQuery } from "@tanstack/react-query"
import { api } from "src/boot/axios"
import { useMemo, useState } from "react"
import { Icon } from "../Icon"
import { Stack } from "../Stack"
import { Header } from "./Header"
import { ActionHeader } from "./headers/ActionHeader"
import { NameHeader } from "./headers/NameHeader"

export const Table = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        minSize: 100,
        size: 150,
        footer: "Calculate",
        header: ({ column }) => {
          return <NameHeader text={column.id} />
        },
      },
      {
        accessorKey: "password",
        minSize: 100,
        size: 200,
        footer: "Calculate",
      },
      {
        accessorKey: "createdAt",
        minSize: 100,
        size: 50,
        footer: "Calculate",
      },
      {
        accessorKey: "updatedAt",
        minSize: 100,
        footer: "Calculate",
      },
      // {
      //   id: "actions",
      //   size: 50,
      //   affixed: true,
      //   header: ActionHeader,
      // },
    ],
    []
  )

  const {
    isLoading,
    error,
    data = [],
    isFetching,
  } = useQuery(["user"], () => {
    return api.get("user").then((res) => res.data)
  })

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
  const table = useReactTable({
    data,
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      {!isLoading && (
        <div className="w-max min-w-full">
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
          <Header table={table} headers={table.getLeafHeaders()}></Header>
          <div>
            {table.getRowModel().rows.map((row) => {
              return (
                <div
                  key={row.id}
                  className="no-wrap relative flex flex-row border-b last:border-b-0">
                  <>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <div
                          key={cell.id}
                          style={{ width: cell.column.getSize() }}
                          className="break-all border-r">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      )
                    })}
                    <div></div>
                  </>
                </div>
              )
            })}
          </div>
          {table.getFooterGroups().map((footerGroup) => (
            <div
              key={footerGroup.id}
              className="group/footer no-wrap sticky bottom-0 flex h-8 flex-row border-t bg-white">
              {footerGroup.headers.map((header) => (
                <div
                  key={header.id}
                  style={{ width: header.getSize() }}
                  className="btn flex flex-row items-center justify-end text-sm opacity-0 duration-200 first:opacity-100 group-hover/footer:opacity-100">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
