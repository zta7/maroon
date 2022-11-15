import { HeaderLeft } from "./layouts/HeaderLeft"
import { LeftDrawer } from "./layouts/LeftDrawer"
// import { Main } from "./layouts/Main"
import { useDrag } from "@use-gesture/react"
import { RightDrawer } from "./layouts/RightDrawer"
// import { useWindowSize } from "react-use"
import { HeaderRight } from "./layouts/HeaderRight"
import { Main } from "./layouts/Main"
import { useCallback, useEffect, useState } from "react"
import {
  useChain,
  useSpring,
  useSpringRef,
  useTransition,
  animated,
} from "react-spring"
import { useWindowSize } from "react-use"

const App = () => {
  const { width: winWidth, height: winHeight } = useWindowSize()
  const [right, setRight] = useState(false)
  const [left, setLeft] = useState(true)

  const [leftSideWidth, setLeftSideWidth] = useState(200)
  const leftSideWidthMin = 200
  const leftSideWidthMax = 480
  const leftSideBind = useDrag(
    ({ delta: [mx] }) => {
      let v = leftSideWidth + mx
      if (v < leftSideWidthMin) v = leftSideWidthMin
      if (v > leftSideWidthMax) v = leftSideWidthMax
      setLeftSideWidth(v)
    },
    { axis: "x" }
  )

  const [rightSideWidth, setRightSideWidth] = useState(400)
  const rightSideWidthMin = 360
  const rightSideWidthMax = 520
  const rightSideBind = useDrag(
    ({ delta: [mx] }) => {
      let v = rightSideWidth - mx
      if (v < rightSideWidthMin) v = rightSideWidthMin
      else if (v > rightSideWidthMax) v = rightSideWidthMax
      setRightSideWidth(v)
    },
    { axis: "x" }
  )

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

  // const springRef = useSpringRef()
  const styles = useSpring({
    // to: [
    //   // { position: "absolute", height: "200px" },
    //   { background: "white" },
    //   // { left: -leftSideWidth },
    //   // { opacity: 0, color: "rgb(14,26,19)" },
    // ],
    to: [
      {
        height: left ? "100%" : `${winHeight - 150}px`,
        config: {
          duration: 0,
        },
      },
      {
        position: left ? "relative" : "absolute",
        background: left ? "rgba(245,245,245,1)" : "white",
        top: left ? 0 : 75,
      },
      { translateX: left ? 0 : -leftSideWidth },
    ],
    from: {
      height: "100%",
      background: "rgba(245,245,245,1)",
      position: "relative",
      // top: 0,
      // bottom: 0,
    },
  })
  // const transitionRef = useSpringRef()
  // const transitions = useTransition({ ref: transitionRef })
  // useChain([springRef, transitionRef])

  return (
    <div
      className="layout h-full w-full select-none text-gray-500"
      style={{ ...layoutStyle() }}>
      <animated.div
        className="left-side relative flex flex-row"
        style={{ width: leftSideWidth, ...styles }}>
        <LeftDrawer setLeft={setLeft} />
        <div
          className="absolute -right-2 top-0 bottom-0 w-2 cursor-col-resize touch-none"
          {...leftSideBind()}>
          <div className="h-full w-px border-l"></div>
        </div>
      </animated.div>
      <HeaderLeft
        left={left}
        setLeft={setLeft}
        className="header group/Header flex flex-row items-center self-center justify-self-start px-4"
      />
      <HeaderRight
        className={`flex h-10 flex-row items-center justify-between ${
          right
            ? "right-side z-10 w-full self-start justify-self-end"
            : "header justify-self-end"
        }`}
        right={right}
        setRight={setRight}
      />
      <Main className="main relative overflow-auto" />
      {right && (
        <div className="right-side relative" style={{ width: rightSideWidth }}>
          <div
            className="absolute top-0 bottom-0 w-2 cursor-col-resize touch-none"
            {...rightSideBind()}>
            <div className="h-full w-px border-l"></div>
          </div>
          <RightDrawer
            // ToDo 找到40px的 css变量
            className="mt-10 h-[calc(100%-40px)] w-full overflow-auto"
          />
        </div>
      )}
    </div>
  )
}

export default App
