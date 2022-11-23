import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnOrderState,
  PaginationState,
} from "@tanstack/react-table"

import { useQuery } from "@tanstack/react-query"
import { api } from "src/boot/axios"
import { useMemo, useState } from "react"
import { Icon } from "../Icon"
import { Stack } from "../Stack"
import { Header } from "./Header"
import { ActionHeader } from "./headers/ActionHeader"
import { NameHeader } from "./headers/NameHeader"
import { Pagination } from "../Pagination"

export const Table = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        minSize: 100,
        size: 150,
      },
      {
        accessorKey: "password",
        minSize: 100,
        size: 200,
      },
      {
        accessorKey: "createdAt",
        minSize: 300,
        size: 50,
      },
      {
        accessorKey: "updatedAt",
        minSize: 300,
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

  // const [pagination, setPagination] = useState({ limit: 5, page: 1 })

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
  const [page, setPage] = useState(1)
  const {
    // refetch,
    isFetching,
    data = [],
  } = useQuery({
    queryKey: ['user', page],
    queryFn: () => {
      return api.get("user", {
        params: {
          limit: 15,
          offset: (page - 1) * 15
        },
        headers: {
          Prefer: 'count=estimated'
        }
        }).then((res) => res.data)
      },
    // keepPreviousData: true
  })

    // ["user"], () => {
    //   return api.get("user", {
    //     params: {
    //       limit: pagination.limit,
    //       offset: (pagination.page - 1) * pagination.limit
    //     },
    //     headers: {
    //       Prefer: 'count=estimated'
    //     }
    //   }).then((res) => res.data)
    // }

  const defaultData = useMemo(() => [], [])

  const table = useReactTable({
    data,
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true
  })

  return (
    <>
      <div className="w-full h-full relative">
        <div className="w-max min-w-full">

          { JSON.stringify(data) }
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
                  </>
                </div>
              )
            })}
          </div>
          <div className="flex items-center gap-2">
            <div onClick={() => setPage(state => state + 1)}>
              { JSON.stringify(page) }
            </div>
            {isFetching ? 'Loading...' : null}
          </div>
      
        </div>
      </div>
    </>
  )
}
