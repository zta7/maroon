interface Props {
  children: React.ReactNode
}

export const LeftDrawer = ({children}: Props) => {
  return (
    <div className="LeftDrawer group/LeftDrawer h-full w-56 bg-neutral-100 text-gray-500">
      {children}
    </div>
  )
}
