import { Table } from "../components/basic/Table"

export const Main = <T extends React.HTMLProps<Element>>({ className }: T) => {
  return (
    <div className={className}>
      {/* <div>
        123
      </div> */}
      <div className="absolute top-0 bottom-0 left-0 right-0">
        {/* <Table /> */}
      </div>
    </div>
  )
}
