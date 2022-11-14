import { Dispatch, SetStateAction } from "react"
import { Card, CardSection } from "src/components/basic/Card"
import { Dialog } from "src/components/basic/Dialog"
import { Icon } from "src/components/basic/Icon"
import { Item, List } from "src/components/basic/List"
import { Popover } from "src/components/basic/Popover"
import { Tooltip } from "src/components/basic/Tooltip"
// import { Table } from "../components/basic/Table"
// import { QueryTest } from "../components/temp/QueryTest"

interface Props {
  setLeft: Dispatch<SetStateAction<boolean>>
}

export const LeftDrawer = ({ setLeft }: Props) => {

  const [SearchDialogOpen, SetSearchDialogOpen] = useState(false)
  const [UpdatePopoverOpen, SetUpdatePopoverOpen] = useState(false)

  // const rows1 = [
  //   {
  //     title: "Search",
  //     icon: "mdi-search",
  //     tooltip: {
  //       title: "Search and jump quickly to a page",
  //       shortcut: "cmd+P",
  //     },
  //     // onClick: () => SetSearchDialogOpen(!SearchDialogOpen)
  //   },
  //   {
  //     title: "Updates",
  //     icon: "mdi-update",
  //     tooltip: {
  //       title: "Update All pages in this workspace",
  //       shortcut: "cmd+O+P",
  //     },
  //     // onClick: () => SetUpdatePopoverOpen(!SearchDialogOpen)
  //   },
  //   { title: "Settings & Members", icon: "mdi-cog" },
  // ]
  // const rows2 = Array.from({ length: 100 })

  return (
    <List className="group/LeftDrawer h-full w-full">
      <Item className="h-10 shrink-0">
        <Icon name="mdi-coffee" className="mr-2" />
        <div className="flex grow flex-row items-center">
          <span className="mr-2">Bingo</span>
          <Icon name="mdi-more" />
        </div>
        <Icon
          onClick={() => setLeft(false)}
          name="mdi-chevron-double-left"
          className="hidden rounded text-lg hover:bg-neutral-300 group-hover/LeftDrawer:flex"
        />
      </Item>
      {/* {rows1.map(({ title, icon, tooltip }, i) => {
        return (
          <Item rounded key={title}>
            <Icon className="mr-2" name={icon} />
            <span className="text-sm">{title}</span>
          </Item>
        )
      })} */}
      <div className="h-6 w-full"></div>
      <div className="relative grow overflow-auto">
        {Array.from({ length: 100 }).map((e, i) => {
          return (
            <div key={i} className="">
              Tree
            </div>
          )
        })}

        <Item>
          <Icon name="mdi-plus" className="mr-2"></Icon>
          <span className="text-sm">Add a page</span>
        </Item>

        <div className="h-6 w-full"></div>
        <Item rounded>
          <Icon name="mdi-language-html5" className="mr-2"></Icon>
          <span className="text-sm">Templates</span>
        </Item>
        <Item rounded>
          <Icon name="mdi-download" className="mr-2"></Icon>
          <span className="text-sm">Import</span>
        </Item>
        <Item rounded>
          <Icon name="mdi-delete-empty" className="mr-2"></Icon>
          <span className="text-sm">Trash</span>
        </Item>
        <div className="h-6 w-full"></div>

        {/* <QueryTest /> */}
        {/* <Table /> */}
        {/* {rows2.map((e, i) => {
            return <div key={i}>1</div>
          })} */}
      </div>
      <Item className="h-10 shrink-0 border-t">
        <Icon name="mdi-plus" className="mr-2 text-lg" />
        <span className="text-sm">New page</span>
      </Item>
    </List>
  )
}
