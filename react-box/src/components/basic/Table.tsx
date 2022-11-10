import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  // getPaginationRowModel,
} from "@tanstack/react-table"

import { useQuery } from "@tanstack/react-query"
import { useDrag, useDrop } from 'react-dnd'
import { api } from "src/boot/axios"
import { set } from 'lodash'

export const Table = () => {
  // type Person = {
  //   c1: string
  //   c2: string
  //   c3: string
  //   c4: string
  //   c5: string
  // }

  // const [data, setData] = useState([])

  // const data: Person[] = useMemo(
  //   () =>
  //     Array.from({ length: 100 }, (e) => ({
  //       c1: "Hello",
  //       c2: "World",
  //       c3: "Your",
  //       c4: "Mother",
  //       c5: "Fucker",
  //     })),
  //   []
  // )

  const columns = useMemo(
    () => [
      {
        header: "h1",
        columns: [
          {
            accessorKey: "id",
            minSize: 100,
            size: 200
          },
          {
            accessorKey: "name",
            minSize: 100,
            size: 200
          },
        ],
      },
      {
        header: "h2",
        columns: [
          {
            accessorKey: "password",
            minSize: 100,
            size: 200
          },
          {
            header: "h3",
            columns: [
              {
                accessorKey: "createdAt",
                minSize: 100,
                size: 200
              },
              {
                accessorKey: "updatedAt",
                minSize: 100,
                size: 200
              },
              {
                id: 'actions',
                // size: 'auto',
                header: () => <div>123</div>
              }
            ],
          },
        ],
      },
    ],
    []
  )

  
  const { isLoading, error, data = [], isFetching } = useQuery(["users"], () => (
    api.get('user')
    .then((res) => res.data)
  ))

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  })

  const dragRefs = useRef([])

  const [{ isDragging }, drag] = useDrag({
    type: 'fff',
    item: () => {
      return { id: 1, index: 0 }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  useEffect(() => {
    // dragRefs.current.map(e => {
    //   drag(e)
    // })
  }, [])

  return (
    <div className="h-full w-full">
      {/* visible checkbox */}
      <div className="flex flex-row">
        {table.getAllLeafColumns().map((column, i) => {
          return (
            <div key={column.id} ref={ (el) => set(dragRefs.current, [i], el) }>
              <label>
                <input
                  {...{
                    type: "checkbox",
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />
                {column.id}
              </label>
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
                      className={ `group relative border-b ${ i !== arr.length - 1 && 'border-r'} ${ i === arr.length - 1 && 'grow' }`}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                        )}
                      {
                        i !== arr.length - 1 &&
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`absolute right-0 top-0 bottom-0 w-1 cursor-col-resize select-none
                          ${
                            header.column.getIsResizing()
                              ? "bg-blue-200"
                              : "group-hover:bg-red-300"
                          }`}/>
                      }
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
        {table.getRowModel().rows.map((row) => {
          return (
            <div key={row.id}  className='no-wrap flex flex-row relative'>
              {row.getVisibleCells().map((cell, i, arr) => {
                return (
                  <div key={cell.id} style={{ width: cell.column.getSize() }} className={`break-all border-b ${ i !== arr.length - 1 && 'border-r'} ${ i === arr.length - 1 && 'grow' }`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                )
              })}
            </div>
          )
        })}
        <div style={{ width: table.getTotalSize() }} className='border-b'>
          + New
        </div>
        <div className='no-wrap flex flex-row relative'>
          {table.getAllLeafColumns().map((column, i, arr) => {
            return (
              <div key={column.id} style={{ width: column.getSize() }} className={`${ i !== arr.length - 1 && 'border-r'}`}>
                <label>
                  Cacl
                </label>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
