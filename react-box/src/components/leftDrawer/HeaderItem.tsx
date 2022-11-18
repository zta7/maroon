import { Dispatch, SetStateAction } from "react"
import { useSelector, useDispatch } from "react-redux"
import { LeftStatus, toggleLeft } from "src/store/layout"
import { Icon } from "../basic/Icon"
import { Item } from "../basic/List"
import { Popover, PopoverAnchor, usePopoverState } from "../basic/Popover"
import { Stack } from "../basic/Stack"

interface Props {
  setBeforeMouseFirstMove: Dispatch<SetStateAction<boolean>>
}

export const HeaderItem = ({ setBeforeMouseFirstMove }: Props) => {
  const { left } = useSelector((state: any) => state.layout)
  const dispatch = useDispatch()
  const onToggleLeftClick = () => {
    setBeforeMouseFirstMove(true)
    dispatch(toggleLeft(LeftStatus.VisibleMini))

    const detectMouseFirstMove = () => {
      dispatch(toggleLeft(LeftStatus.Invisible))
      setBeforeMouseFirstMove(false)
      window.removeEventListener("mousemove", detectMouseFirstMove, {
        capture: true,
      })
    }
    window.addEventListener("mousemove", detectMouseFirstMove, {
      capture: true,
    })
  }
  const popover = usePopoverState({ placement: "bottom" })
  return (
    <Stack className="btn h-10 shrink-0 px-3">
      <PopoverAnchor asChild state={popover}>
        <Stack className="grow" onClick={() => popover.setOpen(true)}>
          <Icon name="mdi-coffee" className="mr-2" />
          <span className="mr-2">Bingo</span>
          <Icon name="mdi-more" />
        </Stack>
      </PopoverAnchor>
      {left === LeftStatus.Visible && (
        <Icon
          onClick={() => onToggleLeftClick()}
          name="mdi-chevron-double-left"
          className="btn-1 hidden rounded text-xl group-hover/LeftDrawer:flex"
        />
      )}

      <Popover state={popover}>
        <div className="bg-red-800">
          12333333333333333333333333333333333333333
        </div>
      </Popover>
    </Stack>
  )
}
