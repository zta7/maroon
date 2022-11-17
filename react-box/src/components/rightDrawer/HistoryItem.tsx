import { Icon } from "../basic/Icon"
import { Item } from "../basic/List"
import { useTooltipState, TooltipAnchor, Tooltip } from "../basic/Tooltip"

export const HistoryItem = ({ onClick }: { onClick: () => any }) => {
  const tooltip = useTooltipState({ placement: "bottom" })

  return (
    <>
      <TooltipAnchor state={tooltip} asChild>
        <Item rounded onClick={onClick}>
          <Icon name="mdi-history" />
        </Item>
      </TooltipAnchor>
      <Tooltip state={tooltip}>
        <div>View all updates.</div>
      </Tooltip>
    </>
  )
}
