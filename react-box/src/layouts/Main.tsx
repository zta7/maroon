import { SpringTest } from "src/components/temp/SpringTest"
import { Table } from "../components/basic/Table"
import { Test } from "src/components/temp/Test"
import { GestureTest } from "src/components/temp/GestureTest"
import { Switch } from "src/components/basic/Switch"

export const Main = () => {
  return (
    <div className="main relative">
      <div className="absolute top-0 bottom-0 left-0 right-0 overflow-auto px-20">
        {/* <Switch /> */}
        <Table />
        {/* <SpringTest /> */}
        {/* <Test /> */}
        {/* <GestureTest /> */}
      </div>
    </div>
  )
}
