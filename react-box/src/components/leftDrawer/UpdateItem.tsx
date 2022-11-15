import { useCallback } from "react"
import { Icon } from "../basic/Icon"
import { Item } from "../basic/List"
import { Popover, PopoverAnchor, usePopoverState } from "../basic/Popover"
import { useTooltipState, TooltipAnchor, Tooltip } from "../basic/Tooltip"

export const UpdateItem = () => {
  const popover = usePopoverState({ placement: "right" })
  const tooltipDisabled = useCallback(() => popover.open, [popover.open])
  const tooltip = useTooltipState({
    placement: "right",
    disabled: tooltipDisabled(),
  })

  return (
    <>
      <TooltipAnchor state={tooltip} asChild>
        <PopoverAnchor state={popover} asChild>
          <Item rounded>
            <Icon className="mr-2" name="mdi-update" />
            <span className="text-sm">Update</span>
          </Item>
        </PopoverAnchor>
      </TooltipAnchor>
      <Tooltip state={tooltip}>
        <div>Update All pages in this workspace</div>
        <div className="text-gray-400">cmd+O+P</div>
      </Tooltip>

      <Popover state={popover}>
        <div className="bg-red-800">
          12333333333333333333333333333333333333333
        </div>
      </Popover>
    </>
  )
}
