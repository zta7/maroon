import { Icon } from "../basic/Icon"
import { Item } from "../basic/List"
import { useTooltipState, TooltipAnchor, Tooltip } from "../basic/Tooltip"

export const CommentItem = ({ onClick }: { onClick: () => any }) => {
  const tooltip = useTooltipState({ placement: "bottom" })

  return (
    <>
      <TooltipAnchor state={tooltip} asChild>
        <Item rounded onClick={onClick}>
          <Icon name="mdi-comment-outline" />
        </Item>
      </TooltipAnchor>
      <Tooltip state={tooltip}>
        <div>View all comments.</div>
      </Tooltip>
    </>
  )
}
