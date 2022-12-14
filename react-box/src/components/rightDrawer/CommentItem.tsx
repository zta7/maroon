import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RightStatus, toggleRight } from "src/store/layout"
import { Icon } from "../basic/Icon"
import { Item } from "../basic/List"
import { useTooltipState, TooltipAnchor, Tooltip } from "../basic/Tooltip"

export const CommentItem = () => {
  const tooltip = useTooltipState({ placement: "bottom" })
  const { right } = useSelector((state: any) => state.layout)
  const active = useMemo(() => RightStatus.Comment === right, [right])
  const dispatch = useDispatch()

  const onClick = () => {
    active
      ? dispatch(toggleRight(RightStatus.Invisible))
      : dispatch(toggleRight(RightStatus.Comment))
  }
  return (
    <>
      <TooltipAnchor state={tooltip} asChild>
        <Item rounded onClick={onClick} active={active}>
          <Icon name="mdi-comment-outline" />
        </Item>
      </TooltipAnchor>
      <Tooltip state={tooltip}>
        <div>{active ? "Close all comments." : "View all comments."}</div>
      </Tooltip>
    </>
  )
}
