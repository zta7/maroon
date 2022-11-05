import { LeftDrawer } from "./layouts/LeftDrawer"

const rows1 = [
  {
    title: "Search",
    icon: <IconMdiSearch />,
    tooltip: { title: "Search and jump quickly to a page", shortcut: "cmd+P" },
  },
  {
    title: "Updates",
    icon: <IconMdiUpdate />,
    tooltip: {
      title: "Update All pages in this workspace",
      shortcut: "cmd+O+P",
    },
  },
  { title: "Settings & Members", icon: <IconMdiCog /> },
]

function App() {
  return (
    <LeftDrawer>
      <div className="flex h-10 flex-row items-center px-3 hover:bg-neutral-200">
        <div className="mr-2">
          <IconMdiCoffee />
        </div>
        <div className="flex grow flex-row items-center">
          <span className="mr-2">Bingo</span>
          <IconMdiMore />
        </div>
        <div className="hidden rounded text-lg hover:bg-neutral-300 group-hover/LeftDrawer:flex">
          <IconMdiChevronDoubleLeft />
        </div>
      </div>
      {rows1.map(({ title, icon, tooltip }) => {
        return (
          <div
            className="group/item relative mx-1 flex flex-row items-center rounded px-2 py-1 hover:bg-neutral-200"
            key={title}>
            <div className="mr-2">{icon}</div>
            <span className="text-sm">{title}</span>
            {tooltip && (
              <div className="absolute left-full ml-2 hidden flex-wrap rounded bg-black px-2 py-1 text-xs text-white shadow-lg group-hover/item:flex">
                <div className="whitespace-pre">{tooltip.title}</div>
                <div className="text-gray-400">{tooltip.shortcut}</div>
              </div>
            )}
          </div>
        )
      })}
    </LeftDrawer>
  )
}

export default App
