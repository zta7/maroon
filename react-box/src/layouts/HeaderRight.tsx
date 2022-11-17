import { Item, List } from "src/components/basic/List"
import { Icon } from "src/components/basic/Icon"
import { useSelector, useDispatch } from "react-redux"
import { toggleRight } from "src/store/layout"
import { MenuItem } from "src/components/rightDrawer/MenuItem"
import { FavouriteItem } from "src/components/rightDrawer/FavouriteItem"
import { HistoryItem } from "src/components/rightDrawer/HistoryItem"
import { CommentItem } from "src/components/rightDrawer/CommentItem"
import { ShareItem } from "src/components/rightDrawer/ShareItem"

export const HeaderRight = <T extends React.HTMLProps<Element>>({
  className,
}: T) => {
  const { right } = useSelector((state: any) => state.layout)
  const dispatch = useDispatch()
  // const selectedItem = []
  const onHistoryClick = () => {
    dispatch(toggleRight())
  }
  const onCommentClick = () => {
    dispatch(toggleRight())
  }
  return (
    <div className={className}>
      {right && (
        <Item rounded onClick={() => dispatch(toggleRight())}>
          <Icon name="mdi-chevron-double-right" className="rounded text-lg" />
        </Item>
      )}
      <div className="flex flex-row flex-nowrap gap-2 text-lg">
        <ShareItem />
        <CommentItem onClick={onCommentClick} />
        <HistoryItem onClick={onHistoryClick} />
        <FavouriteItem />
        <MenuItem />
      </div>
    </div>
  )
}
