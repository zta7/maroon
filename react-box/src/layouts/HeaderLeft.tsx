import { forwardRef, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHover, useHoverDirty, useUpdateEffect } from "react-use"
import { Icon } from "src/components/basic/Icon"
import { Item } from "src/components/basic/List"
import { LeftStatus, toggleLeft } from "src/store/layout"

const ControlItem = () => {
  const { left } = useSelector((state: any) => state.layout)
  const dispatch = useDispatch()
  const ref = useRef(null)
  const isHover = useHoverDirty(ref)
  useUpdateEffect(() => {
    if (isHover) {
      dispatch(toggleLeft(LeftStatus.VisibleMini))
    } else {
      dispatch(toggleLeft(LeftStatus.Invisible))
    }
  }, [isHover])
  return (
    <Item rounded ref={ref} className="mr-2 p-0">
      <Icon
        className="text-xl"
        onClick={() => dispatch(toggleLeft(LeftStatus.Visible))}
        name={
          left === LeftStatus.Invisible
            ? "mdi-menu"
            : "mdi-chevron-double-right"
        }
      />
    </Item>
  )
}

export const HeaderLeft = <T extends React.HTMLProps<Element>>({
  className,
}: T) => {
  const { left } = useSelector((state: any) => state.layout)
  return (
    <div className={className}>
      {left !== LeftStatus.Visible && <ControlItem />}
      <Item rounded>Title</Item>
    </div>
  )
}
