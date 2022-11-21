import { SpringTest } from "src/components/temp/SpringTest"
import { Table } from "../components/basic/Table"

export const Main = () => {
  return (
    <div className="main relative">
      <div className="absolute top-0 bottom-0 left-0 right-0 overflow-auto px-20">
        <Table />
        {/* <SpringTest /> */}
      </div>
    </div>
  )
}
