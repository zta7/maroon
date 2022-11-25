import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnOrderState,
  PaginationState,
  CellContext,
  HeaderContext,
  RowData,
} from "@tanstack/react-table"

import { useQuery } from "@tanstack/react-query"
import { api } from "src/boot/axios"
import { Fragment, useMemo, useState } from "react"
import { Header } from "./Header"
import { TextCell } from "./cells/TextCell"
import { TextHeader } from "./headers/TextHeader"
import { SelectCell } from "./cells/SelectCell"
import { SelectHeader } from "./headers/SelectHeader"
import { EmailHeader } from "./headers/EmailHeader"
import { EmailCell } from "./cells/EmailCell"
import { PhoneHeader } from "./headers/PhoneHeader"
import { PhoneCell } from "./cells/PhoneCell"
import { DateCell } from "./cells/DateCell"
import { DateHeader } from "./headers/DateHeader"
import { userSchema } from "src/schema/User"
import { ObjectSchema } from "yup"
import { NumberHeader } from "./headers/NumberHeader"
import { NumberCell } from "./cells/NumberCell"

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateColumn: (id: string, columnId: string, value: unknown) => void
    schema: ObjectSchema<any>
  }
}

export const Table = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        minSize: 100,
        size: 150,
        header: (context: HeaderContext<any, unknown>) => (
          <TextHeader context={context} />
        ),
        cell: (context: CellContext<any, unknown>) => (
          <TextCell context={context} />
        ),
      },
      {
        accessorKey: "password",
        minSize: 100,
        size: 200,
        header: (context: HeaderContext<any, unknown>) => (
          <SelectHeader context={context} />
        ),
        cell: (context: CellContext<any, unknown>) => (
          <SelectCell context={context} options={[1, 2, 3, 4]} />
        ),
      },
      {
        accessorKey: "email",
        minSize: 100,
        size: 200,
        header: (context: HeaderContext<any, unknown>) => (
          <EmailHeader context={context} />
        ),
        cell: (context: CellContext<any, unknown>) => (
          <EmailCell context={context} />
        ),
      },
      {
        accessorKey: "salary",
        minSize: 100,
        size: 200,
        header: (context: HeaderContext<any, unknown>) => (
          <NumberHeader context={context} />
        ),
        cell: (context: CellContext<any, unknown>) => (
          <NumberCell context={context} />
        ),
      },
      {
        accessorKey: "phone",
        minSize: 100,
        size: 200,
        header: (context: HeaderContext<any, unknown>) => (
          <PhoneHeader context={context} />
        ),
        cell: (context: CellContext<any, unknown>) => (
          <PhoneCell context={context} />
        ),
      },
      {
        accessorKey: "birthday",
        minSize: 100,
        size: 200,
        header: (context: HeaderContext<any, unknown>) => (
          <DateHeader context={context} />
        ),
        cell: (context: CellContext<any, unknown>) => (
          <DateCell context={context} />
        ),
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
            order: "createdAt.desc",
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
    onColumnOrderChange: setColumnOrder,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    pageCount,
    onPaginationChange: setPagination,
    manualPagination: true,
    meta: {
      schema: userSchema,
      updateColumn: (id: string, columnId: string, value: unknown) => {
        setData((old: any[]) => {
          console.log(1114124)
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
                        // <div
                        //   key={cell.id}
                        <Fragment key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Fragment>
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
