import { LeftDrawer } from "./layouts/LeftDrawer"

const rows1 = [
  { title: 'Search', icon:  <IconMdiSearch />, tooltip: { title: 'Search and jump quickly to a page', shortcut: 'cmd+P' }},
  { title: 'Updates', icon:  <IconMdiUpdate />, tooltip: { title: 'Update All pages in this workspace', shortcut: 'cmd+O+P' }},
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
        <div className="hidden group-hover/LeftDrawer:flex rounded hover:bg-neutral-300 text-lg">
          <IconMdiChevronDoubleLeft />
        </div>
      </div>
      {
        rows1.map(({ title, icon, tooltip }) => {
          return (
            <div className="group/item relative flex flex-row items-center hover:bg-neutral-200 rounded px-2 py-1 mx-1" key={ title }>
              <div className="mr-2">
                { icon }
              </div>
              <span className="text-sm">{ title }</span>
              {
                tooltip && 
                <div className="absolute hidden group-hover/item:flex flex-wrap left-full ml-2 px-2 py-1 text-white bg-black shadow-lg rounded text-xs">
                  <div className="whitespace-pre">{tooltip.title}</div>
                  <div className="text-gray-400">{ tooltip.shortcut }</div>
                </div>
              }
            </div>
          )
        })
      }
    </LeftDrawer>
  )
}

export default App
