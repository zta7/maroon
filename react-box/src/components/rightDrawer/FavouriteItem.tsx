import { useDispatch, useSelector } from "react-redux"
import { toggleFavourite } from "src/store/layout"
import { Icon } from "../basic/Icon"
import { Item } from "../basic/List"
import { useTooltipState, TooltipAnchor, Tooltip } from "../basic/Tooltip"

export const FavouriteItem = () => {
  const tooltip = useTooltipState({ placement: "bottom" })
  const { favourite } = useSelector((state: any) => state.layout)
  const dispatch = useDispatch()

  return (
    <>
      <TooltipAnchor state={tooltip} asChild>
        <Item
          rounded
          onClick={() => dispatch(toggleFavourite())}
          className={favourite ? "text-orange-400" : ""}>
          <Icon name={favourite ? "mdi-star" : "mdi-star-outline"} />
        </Item>
      </TooltipAnchor>
      <Tooltip state={tooltip}>
        <div>Pin this page in your sidebar.</div>
        <div>CMD</div>
      </Tooltip>
    </>
  )
}
