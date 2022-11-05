interface Props {
  children: React.ReactNode
}

export const LeftDrawer = ({ children }: Props) => {
  return (
    <div className="LeftDrawer group/LeftDrawer w-56 h-full bg-neutral-100 text-gray-500">
      {children}
    </div>
  )
}