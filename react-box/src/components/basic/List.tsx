import { Children, forwardRef } from "react"

export const List = <T extends React.HTMLProps<Element>>({
  className = "",
  style,
  children,
}: T) => {
  const _className = "relative flex flex-col flex-nowrap" + " "
  className = _className + className
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

export const Item = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLElement> & {
    rounded?: Boolean
    active?: Boolean
  }
>(function Item(
  { className = "", children, rounded = false, active = false, onClick },
  ref
) {
  const arr = Children.toArray(children)

  let _className =
    "relative flex flex-row flex-nowrap items-center hover:bg-neutral-200 cursor-pointer" +
    " "
  if (arr.length > 1) {
    if (rounded) _className += "rounded-md mx-1 px-2 py-1" + " "
    else _className += "px-3 py-1" + " "
  } else if (arr.length === 1) {
    _className += "p-1 rounded-md" + " "
  }

  if (active) _className += "bg-neutral-200"

  className = _className + className

  return (
    <div className={className} onClick={onClick} ref={ref}>
      {children}
    </div>
  )
})
