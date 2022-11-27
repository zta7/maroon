import { useRef } from "react"
import { Dialog, DialogAnchor, useDialogState } from "../basic/Dialog"
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
        <DialogAnchor state={dialog} asChild>
          <Item rounded ref={ref}>
            <Icon className="mr-2" name="mdi-search" />
            <span>Search</span>
          </Item>
        </DialogAnchor>
      </TooltipAnchor>
      <Tooltip state={tooltip}>
        <div>Search and jump quickly to a page</div>
        <div className="text-gray-400">cmd+O+P</div>
      </Tooltip>
      <Dialog state={dialog}>
        <div>
          <input type="text" />
          <div>
            <div>111111</div>
            <div>222222</div>
            <div>333333</div>
            <div>444444</div>
          </div>
        </div>
      </Dialog>
    </>
  )
}
