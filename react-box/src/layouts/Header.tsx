const btns = [
  { title: "Share", tooltip: "Share or publish to the web." },
  { icon: <IconMdiCommentTextOutline />, tooltip: "View all comments." },
  { icon: <IconMdiHistory />, tooltip: "View all updates." },
  { icon: <IconMdiStarOutline />, tooltip: "Pin this page in your sidebar." },
  { icon: <IconMdiDotsHorizontal />, tooltip: "more..." },
]

export const Header = () => {
  return (
    <div className="Header z-10 flex h-10 flex-row items-center justify-between px-4">
      <div className="rounded p-1 text-sm hover:bg-neutral-200">Title</div>
      <div className="flex flex-row items-center gap-4">
        {btns.map(({ title, icon }, i) => {
          return title ? (
            <div className="rounded p-1 text-sm hover:bg-neutral-200">
              {title}
            </div>
          ) : (
            <div className="rounded p-1 hover:bg-neutral-200">{icon}</div>
          )
        })}
      </div>
    </div>
  )
}
