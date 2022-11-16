import { Dispatch, SetStateAction } from "react"
import { Item } from "src/components/basic/List"
import { Icon } from "src/components/basic/Icon"
import { useSelector, useDispatch } from "react-redux"
import { toggleRight } from "src/store/layout"

const btns = [
  { title: "Share", tooltip: "Share or publish to the web." },
  { icon: "mdi-comment-outline", tooltip: "View all comments." },
  { icon: "mdi-history", tooltip: "View all updates." },
  { icon: "mdi-star-outline", tooltip: "Pin this page in your sidebar." },
  { icon: "mdi-dots-horizontal", tooltip: "more..." },
]

export const HeaderRight = <T extends React.HTMLProps<Element> >({
  className,
}: T) => {
  const {right} = useSelector((state: any) => state.layout)
  const dispatch = useDispatch()
  return (
    <div className={className}>
      {right && (
        <Item rounded onClick={() => dispatch(toggleRight())}>
          <Icon name="mdi-chevron-double-right" className="rounded text-lg" />
        </Item>
      )}
      <div className="flex flex-row flex-nowrap">
        {btns.map(({ title, icon }, i) => {
          return (
            <Item rounded key={i} onClick={() => dispatch(toggleRight())}>
              {title && <span className="text-sm">{title}</span>}
              {icon && <Icon name={icon} className="text-xl" />}
            </Item>
          )
        })}
      </div>
    </div>
  )
}
