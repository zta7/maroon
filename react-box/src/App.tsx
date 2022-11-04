import { Tooltip } from "./components/basic/Tooltip"
import { LeftDrawer } from "./layouts/LeftDrawer"

const rows1 = [
  { title: 'Search', icon:  <IconMdiSearch />},
  { title: 'Updates', icon:  <IconMdiUpdate />},
  { title: 'Settings', icon:  <IconMdiCog />}
]

function App() {
  return (
    <LeftDrawer>
      <div className="flex flex-row items-center h-10 hover:bg-neutral-200 px-3">
        <div className="mr-2"><IconMdiCoffee/></div>
        <div className="flex flex-row items-center grow">
          <span className="mr-2">Bingo</span>
          <IconMdiMore />
        </div>
        <div className="rounded hover:bg-neutral-300 text-lg">
          <IconMdiChevronDoubleLeft />
        </div>
        <Tooltip>fff</Tooltip>
      </div>
      {
        rows1.map(({ title, icon }) => {
          return (
            <div className="flex flex-row items-center hover:bg-neutral-200 rounded px-2 py-1 mx-1">
              <div className="mr-2">
                { icon }
              </div>
              <span className="text-sm">{ title }</span>
            </div>
          )
        })
      }
    </LeftDrawer>
  )
}

export default App
