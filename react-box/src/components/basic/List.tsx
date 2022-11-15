interface ListProps {
  tag?: keyof JSX.IntrinsicElements
}

export const List = <T extends React.HTMLProps<Element> & ListProps>({
  className = "",
  style,
  children,
  tag: Tag = "div",
}: T) => {
  const _className = "relative flex flex-col flex-nowrap bg-neutral-100" + " "
  className = _className + className
  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  )
}

interface ItemProps extends React.HTMLProps<Element> {
  // tag?: keyof JSX.IntrinsicElements
  // rounded?: Boolean
}

export const Item = forwardRef<HTMLElement, ItemProps>(
  (
    { className = "", children, tag: Tag = "div", rounded = false, onClick },
    ref
  ) => {
    let _className =
      "relative flex flex-row flex-nowrap items-center hover:bg-neutral-200 cursor-pointer" +
      " "

    if (rounded) _className += "rounded-md mx-1 px-2 py-1" + " "
    else _className += "px-3 py-1" + " "

    className = _className + className

    return (
      <Tag className={className} onClick={onClick} ref={ref}>
        {children}
      </Tag>
    )
  }
)
