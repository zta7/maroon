import { Dialog, useDialogState } from "../basic/Dialog"
import { Icon } from "../basic/Icon"
import { Item } from "../basic/List"
import { Tooltip, TooltipAnchor, useTooltipState } from "../basic/Tooltip"

export const SearchItem = () => {
  const tooltip = useTooltipState({ placement: "right" })
  const dialog = useDialogState({ placement: "top" })
  const ref = useRef(null)
  return (
    <>
      <TooltipAnchor state={tooltip} asChild>
        <Item rounded onClick={() => dialog.setOpen(true)}>
          <Icon className="mr-2" name="mdi-search" />
          <span className="text-sm">Search</span>
        </Item>
      </TooltipAnchor>
      <Tooltip state={tooltip}>
        <div>Search and jump quickly to a page</div>
        <div className="text-gray-400">cmd+O+P</div>
      </Tooltip>
      <Dialog state={dialog}>
        <div>123</div>
      </Dialog>
    </>
  )
}
