import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
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

  const columnHelper = createColumnHelper<Person>()

  const columns = useMemo(
    () => [
      columnHelper.group({
        id: "a",
        columns: [
          columnHelper.accessor("c1", {
            cell: (e) => e.getValue(),
          }),
          columnHelper.accessor("c2", {
            cell: (e) => e.getValue(),
          }),
        ],
      }),
      columnHelper.group({
        id: "b",
        columns: [
          columnHelper.accessor("c3", {
            cell: (e) => e.getValue(),
          }),
          columnHelper.group({
            id: "c",
            columns: [
              columnHelper.accessor("c4", {
                cell: (e) => e.getValue(),
              }),
              columnHelper.accessor("c5", {
                cell: (e) => e.getValue(),
              }),
            ],
          }),
        ],
      }),
    ],
    []
  )

  const [columnVisibility, setColumnVisibility] = useState({})
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
    },
    columnResizeMode: "onChange",
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  })

  //  table.getAllLeafColumns().forEach((e, i) => {
  //    if(i === 0)
  //     e.toggleVisibility(false)
  //  })

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

      <div className="flex flex-col">
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <div key={headerGroup.id} className="flex flex-row">
              {headerGroup.headers.map((header) => {
                return (
                  <div
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className="relative">
                    {header.id}
                    <div
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${
                          header.column.getIsResizing() ? "isResizing" : ""
                        }`,
                      }}
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
                <div
                  key={cell.id}
                  style={{ width: cell.column.columnDef.size }}>
                  {cell.id}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
