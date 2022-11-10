// import {
//   Tooltip,
// } from "../components/basic/Tooltip"

import { Table } from "../components/basic/Table"
import { QueryTest } from "../components/temp/QueryTest"

export const LeftDrawer = () => {
  const rows1 = [
    {
      title: "Search",
      icon: <IconMdiSearch />,
      tooltip: {
        title: "Search and jump quickly to a page",
        shortcut: "cmd+P",
      },
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
  // const rows2 = Array.from({ length: 100 })

  return (
    <div
      className="LeftDrawer group/LeftDrawer col-span-1 row-span-full flex h-full flex-shrink-0 flex-col bg-neutral-100 text-gray-500"
      style={{ width: 1200 }}>
      <div className="flex h-10 shrink-0 flex-row items-center px-3 hover:bg-neutral-200">
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
      {rows1.map(({ title, icon, tooltip }, i) => {
        return (
          <div
            className="group/item relative mx-1 flex flex-row items-center rounded px-2 py-1 hover:bg-neutral-200"
            key={title}>
            <div className="mr-2">{icon}</div>
            <span className="text-sm">{title}</span>
          </div>
        )
      })}
      <div className="h-8 w-full"></div>
      <div className="grow overflow-y-auto">
        {/* <QueryTest /> */}
        <Table />
        {/* {rows2.map((e, i) => {
          return <div key={i}>1</div>
        })} */}
      </div>
      <div className="flex h-10 shrink-0 flex-row items-center border-t px-3 hover:bg-neutral-200">
        <div className="mr-2 text-lg">
          <IconMdiPlus />
        </div>
        <span className="text-sm">New page</span>
      </div>
    </div>
  )
}
