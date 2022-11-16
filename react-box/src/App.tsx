import { HeaderLeft } from "./layouts/HeaderLeft"
import { LeftDrawer } from "./layouts/LeftDrawer"
// import { Main } from "./layouts/Main"
import { useDrag, useHover } from "@use-gesture/react"
import { RightDrawer } from "./layouts/RightDrawer"
// import { useWindowSize } from "react-use"
import { HeaderRight } from "./layouts/HeaderRight"
import { Main } from "./layouts/Main"
import { useCallback, useRef, useState } from "react"
import { useSelector } from "react-redux"
const App = () => {
  const {right} = useSelector((state: any) => state.layout)

  const layoutStyle = useCallback(() => {
    return right
      ? {
          gridTemplateAreas: `
            "left-side header right-side"
            "left-side main right-side"
            "left-side main right-side"
          `,
        }
      : {
          gridTemplateAreas: `
            "left-side header header"
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
      <HeaderLeft
        className="header group/Header flex flex-row items-center self-center justify-self-start px-4"
      />
      <HeaderRight
        className={`flex h-10 flex-row items-center justify-between ${
          right
            ? "right-side z-10 w-full self-start justify-self-end"
            : "header justify-self-end"
        }`}
      />
      <Main className="main relative overflow-auto" />
      {right && 
        <RightDrawer />
      }
    </div>
  )
}

export default App
