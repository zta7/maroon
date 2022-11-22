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
import { ActionHeader } from "./headers/actionHeader"
import { NameHeader } from "./headers/NameHeader"

export const Table = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        minSize: 100,
        size: 150,
        footer: 'calc',
        header: ({column}) => {
          return <NameHeader text={column.id}/>
        }
      },
      {
        accessorKey: "password",
        minSize: 100,
        size: 200,
        footer: 'calc',
      },
      {
        accessorKey: "createdAt",
        minSize: 100,
        size: 50,
        footer: 'calc',
      },
      {
        accessorKey: "updatedAt",
        minSize: 100,
        footer: 'calc',
      },
      {
        id: "actions",
        size: 50,
        affixed: true,
        header: ActionHeader,
      },
    ],
    []
  )

  
  const {
    isLoading,
    error,
    data = [],
    isFetching,
  } = useQuery(['user'], () => {
    return api.get("user").then(res => res.data)
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
      {
        !isLoading && 
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
        <Header
            setColumnOrder={table.setColumnOrder}
            headers={table.getLeafHeaders()}></Header>
        <div>
          {table.getRowModel().rows.map((row) => {
            return (
              <div
                key={row.id}
                className="no-wrap relative flex flex-row border-b last:border-b-0">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <div
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className="break-all border-r last:border-r-0 last:grow">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
        {table.getFooterGroups().map(footerGroup => (
          <div key={footerGroup.id} className="no-wrap sticky bottom-0 flex flex-row border-t bg-white">
            {footerGroup.headers.map((header) => (
              <div key={header.id} style={{ width: header.getSize() }} className="border-r last:border-r-0">
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
      }
    </>
  )
}
