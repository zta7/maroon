import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnOrderState,
  PaginationState,
  CellContext,
} from "@tanstack/react-table"

import { useQuery } from "@tanstack/react-query"
import { api } from "src/boot/axios"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Header } from "./Header"
import { TextCell } from "./cells/TextCell"

export const Table = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        minSize: 100,
        size: 150,
        cell: (context: CellContext<any, unknown>) => {
          return <TextCell context={context} />
        },
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
    ],
    []
  )

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
  const [pageCount, setPageCount] = useState<number>()
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [data, setData] = useState<any>([])
  const { isFetching } = useQuery({
    queryKey: ["user", { pageIndex, pageSize }],
    queryFn: () => {
      return api
        .get("user", {
          params: {
            limit: pageSize,
            offset: pageIndex * pageSize,
            order: "createdAt.asc",
          },
          headers: {
            Prefer: "count=estimated",
          },
        })
        .then((res) => {
          const range = res.headers["content-range"]
          const [, totalNumber] = range?.split("/") as Array<string>
          setPageCount(Math.ceil(Number(totalNumber) / pageSize))
          return res.data
        })
    },
    onSuccess: setData,
    keepPreviousData: true,
  })

  const table = useReactTable({
    data,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
      columnOrder,
    },
    // autoResetPageIndex,
    onColumnOrderChange: setColumnOrder,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    pageCount,
    onPaginationChange: setPagination,
    manualPagination: true,
    meta: {
      updateColumn: (id: string, columnId: string, value: unknown) => {
        setData((old: any[]) => {
          const oldRow = old.find((e) => e.id === id)
          oldRow[columnId] = value
          api.patch(
            "user",
            {
              [columnId]: value,
            },
            {
              params: {
                id: `eq.${id}`,
              },
            }
          )
          return old
        })
      },
    },
  })

  return (
    <>
      <div className="relative h-full w-full">
        <div className="w-max min-w-full">
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
            <button
              className="rounded border p-1"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}>
              {"<<"}
            </button>
            <button
              className="rounded border p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              {"<"}
            </button>
            <button
              className="rounded border p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              {">"}
            </button>
            <button
              className="rounded border p-1"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}>
              {">>"}
            </button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>

            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value))
              }}>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>

          {isFetching ? "Loading..." : null}
        </div>
      </div>
    </>
  )
}
