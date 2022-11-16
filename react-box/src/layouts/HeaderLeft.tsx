import { forwardRef, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHover, useHoverDirty, useUpdate } from "react-use"
import { Icon } from "src/components/basic/Icon"
import { Item } from "src/components/basic/List"
import { LeftStatus, toggleLeft } from "src/store/layout"

const ControlItem = () => {
  const {left} = useSelector((state: any) => state.layout)
  const dispatch = useDispatch()
  const ref = useRef(null)
  const isIconHover = useHoverDirty(ref)
  useEffect(() => {
    if(isIconHover) {
      dispatch(toggleLeft(LeftStatus.VisibleMini))
    }
    else {
      dispatch(toggleLeft(LeftStatus.Invisible))
    }
  }, [isIconHover])
  return (
    <Item rounded  ref={ref}>
      <Icon
        onClick={() => dispatch(toggleLeft(LeftStatus.Visible))}
        name={ left === LeftStatus.Invisible ? "mdi-menu" : "mdi-chevron-double-right" }
      />
    </Item>
  )
}


export const HeaderLeft = <T extends React.HTMLProps<Element>>({
  className,
}: T) => {
  const {left} = useSelector((state: any) => state.layout)
  return (
    <div className={className}>
      {
        left !== LeftStatus.Visible 
          && <ControlItem />
      }
      <Item rounded>Title</Item>
    </div>
  )
}
