import { Row as _Row } from "@tanstack/react-table"
import { Cell } from "./Cell"

interface Props {
  row: _Row<any>,
}

export const Row = ({row}: Props) => {
  return (
    <div
      className="no-wrap relative flex flex-row border-b last:border-b-0">
      <>
        {row.getVisibleCells().map((cell) => {
          return (
            <Cell key={cell.id} cell={cell}/>
          )
        })}
      </>
    </div>
  )
}