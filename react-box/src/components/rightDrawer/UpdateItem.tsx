import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RightStatus, toggleRight } from "src/store/layout"
import { Icon } from "../basic/Icon"
import { Item } from "../basic/List"
import { useTooltipState, TooltipAnchor, Tooltip } from "../basic/Tooltip"

export const UpdateItem = () => {
  const tooltip = useTooltipState({ placement: "bottom" })
  const { right } = useSelector((state: any) => state.layout)
  const active = useMemo(() => RightStatus.Update === right, [right])
  const dispatch = useDispatch()

  const onClick = () => {
    active
      ? dispatch(toggleRight(RightStatus.Invisible))
      : dispatch(toggleRight(RightStatus.Update))
  }

  return (
    <>
      <TooltipAnchor state={tooltip} asChild>
        <Item rounded onClick={onClick} active={active}>
          <Icon name="mdi-history" />
        </Item>
      </TooltipAnchor>
      <Tooltip state={tooltip}>
        <div>{active ? "Close all updates." : "View all updates."}</div>
      </Tooltip>
    </>
  )
}
