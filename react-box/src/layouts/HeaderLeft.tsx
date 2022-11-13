import { Dispatch, SetStateAction } from "react"
import { Icon } from "src/components/basic/Icon"
import { Item } from "src/components/basic/List"

interface Props {
  left: Boolean
  setLeft: Dispatch<SetStateAction<boolean>>
}

export const HeaderLeft = <T extends React.HTMLProps<Element> & Props>({
  className,
  left,
  setLeft,
}: T) => {
  return (
    <div className={className}>
      {!left && (
        <Icon
          onClick={() => setLeft(true)}
          name="mdi-chevron-double-right"
          className="rounded text-lg hover:bg-neutral-300 group-hover/LeftDrawer:flex"
        />
      )}
      <Item rounded>Title</Item>
    </div>
  )
}
