import { Item, List } from "src/components/basic/List"
import { Icon } from "src/components/basic/Icon"
import { useSelector, useDispatch } from "react-redux"
import { RightStatus, toggleRight } from "src/store/layout"
import { MenuItem } from "src/components/rightDrawer/MenuItem"
import { FavouriteItem } from "src/components/rightDrawer/FavouriteItem"
import { CommentItem } from "src/components/rightDrawer/CommentItem"
import { ShareItem } from "src/components/rightDrawer/ShareItem"
import { UpdateItem } from "src/components/rightDrawer/UpdateItem"
import { Stack } from "src/components/basic/Stack"

export const HeaderRight = <T extends React.HTMLProps<Element>>({
  className,
}: T) => {
  const { right } = useSelector((state: any) => state.layout)
  const dispatch = useDispatch()

  return (
    <div className={className}>
      {right !== RightStatus.Invisible && (
        <Item
          rounded
          onClick={() => dispatch(toggleRight(RightStatus.Invisible))}>
          <Icon name="mdi-chevron-double-right" className="rounded text-lg" />
        </Item>
      )}
      {/* className="flex flex-row flex-nowrap gap-2 text-lg" */}
      <Stack className="text-xl" gap>
        <ShareItem />
        <CommentItem />
        <UpdateItem />
        <FavouriteItem />
        <MenuItem />
      </Stack>
    </div>
  )
}
