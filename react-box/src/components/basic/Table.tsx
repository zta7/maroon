import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  // getPaginationRowModel,
} from "@tanstack/react-table"

export const Table = () => {
  type Person = {
    c1: string
    c2: string
    c3: string
    c4: string
    c5: string
  }

  const data: Person[] = useMemo(
    () =>
      Array.from({ length: 100 }, (e) => ({
        c1: "Hello",
        c2: "World",
        c3: "Your",
        c4: "Mother",
        c5: "Fucker",
      })),
    []
  )

  const columns = useMemo(
    () => [
      {
        header: "h1",
        columns: [
          {
            accessorKey: "c1",
            minSize: 60,
            size: 80,
          },
          {
            accessorKey: "c2",
            minSize: 60,
            size: 80,
          },
        ],
      },
      {
        header: "h2",
        columns: [
          {
            accessorKey: "c3",
            minSize: 60,
            size: 80,
          },
          {
            header: "h3",
            columns: [
              {
                accessorKey: "c4",
                minSize: 60,
                size: 80,
              },
              {
                accessorKey: "c5",
                minSize: 60,
                size: 80,
              },
            ],
          },
        ],
      },
    ],
    []
  )

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
        {table.getAllLeafColumns().map((column) => {
          return (
            <div key={column.id}>
              <label>
                <input
                  {...{
                    type: "checkbox",
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />{" "}
                {column.id}
              </label>
            </div>
          )
        })}
      </div>

      <div className="m-1 border" style={{ width: table.getTotalSize() }}>
        <div className="flex flex-col">
          {table.getHeaderGroups().map((headerGroup) => {
            console.log(table.getState())

            return (
              <div key={headerGroup.id} className="flex flex-row">
                {headerGroup.headers.map((header) => {
                  return (
                    <div
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className="group relative">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`absolute right-0 top-0 bottom-0 w-1 cursor-col-resize select-none
                         ${
                           header.column.getIsResizing()
                             ? "bg-blue-200"
                             : "group-hover:bg-red-300"
                         }
                      `}
                      />
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
        {table.getRowModel().rows.map((row) => {
          return (
            <div key={row.id} className="no-wrap flex flex-row">
              {row.getVisibleCells().map((cell) => {
                return (
                  <div key={cell.id} style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
