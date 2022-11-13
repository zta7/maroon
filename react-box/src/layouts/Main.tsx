import { Table } from "../components/basic/Table"

export const Main = <T extends React.HTMLProps<Element>>({ className }: T) => {
  return (
    <div className={className}>
      {/* 123 */}
      <Table />
    </div>
  )
}
