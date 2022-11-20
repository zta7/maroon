import { HeaderLeft } from "./layouts/HeaderLeft"
import { LeftDrawer } from "./layouts/LeftDrawer"
import { RightDrawer } from "./layouts/RightDrawer"
import { HeaderRight } from "./layouts/HeaderRight"
import { Main } from "./layouts/Main"
import { useCallback } from "react"
import { useSelector } from "react-redux"
import { RightStatus } from "./store/layout"
const App = () => {
  const { right } = useSelector((state: any) => state.layout)

  const layoutStyle = useCallback(() => {
    return right !== RightStatus.Invisible
      ? {
          gridTemplateAreas: `
            "left-side header right-side"
            "left-side main right-side"
            "left-side main right-side"
          `,
        }
      : {
          gridTemplateAreas: `
          "left-side header right-side"
          "left-side main main"
          "left-side main main"
          `,
        }
  }, [right])

  return (
    <div
      className="layout h-full w-full select-none text-gray-500"
      style={{ ...layoutStyle() }}>
      <LeftDrawer />
      <HeaderLeft className="header group/Header flex h-10 flex-row items-center self-center justify-self-start px-4" />
      <HeaderRight
        className={`right-side flex h-10 flex-row items-center justify-between px-2 ${
          right !== RightStatus.Invisible
            ? "z-10 w-full self-start justify-self-end"
            : "justify-self-end"
        }`}
      />
      <Main />
      <RightDrawer />
    </div>
  )
}

export default App
