import { forwardRef, HTMLProps, SyntheticEvent } from "react"
import { Icon } from "./Icon"
import cx from "classnames"

interface Props {
  onDelete?: () => void
  deletable?: boolean
}

export const Chip = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & Props
>(function Chip(
  { label = "", className = "", onDelete, deletable, ...props },
  propRef
) {
  const onIconMouseDown = (e: SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault()
  }
  const onIconMouseUp = (e: SyntheticEvent<HTMLDivElement>) => {
    onDelete && onDelete()
  }
  return (
    <div
      className={cx([
        "flex h-5 flex-row flex-nowrap items-center rounded bg-neutral-300 px-[6px] text-sm",
        className,
      ])}
      ref={propRef}>
      <div className="mr-[2px]">{label}</div>
      {deletable && (
        <Icon
          name="mdi-close"
          className="text-sm"
          onMouseUp={onIconMouseUp}
          onMouseDown={onIconMouseDown}></Icon>
      )}
    </div>
  )
})
