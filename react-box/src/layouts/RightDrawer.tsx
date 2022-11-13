export const RightDrawer = <T extends React.HTMLProps<Element>>({
  className,
  style,
}: T) => {
  return (
    <div className={className} style={style}>
      {Array.from({ length: 100 }).map((e, i) => {
        return <div key={i}>tree</div>
      })}
    </div>
  )
}
