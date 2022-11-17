import { Icon } from "../basic/Icon"
import { Item } from "../basic/List"
import { Popover, PopoverAnchor, usePopoverState } from "../basic/Popover"
import { useTooltipState, TooltipAnchor, Tooltip } from "../basic/Tooltip"

export const MenuItem = () => {
  const tooltip = useTooltipState({ placement: "bottom" })
  const popover = usePopoverState({ placement: "bottom" })
  return (
    <>
      <TooltipAnchor state={tooltip} asChild>
        <PopoverAnchor state={popover} asChild>
          <Item rounded onClick={() => popover.setOpen(true)}>
            <Icon name="mdi-dots-horizontal" />
          </Item>
        </PopoverAnchor>
      </TooltipAnchor>
      <Tooltip state={tooltip}>
        <div>More</div>
      </Tooltip>

      <Popover state={popover}>
        <div className="bg-red-800">
          12333333333333333333333333333333333333333
        </div>
      </Popover>
    </>
  )
}
