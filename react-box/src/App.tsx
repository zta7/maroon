import { HeaderLeft } from "./layouts/HeaderLeft"
import { LeftDrawer } from "./layouts/LeftDrawer"
// import { Main } from "./layouts/Main"
import { useDrag } from "@use-gesture/react"
import { RightDrawer } from "./layouts/RightDrawer"
// import { useWindowSize } from "react-use"
import { HeaderRight } from "./layouts/HeaderRight"
import { Main } from "./layouts/Main"

const App = () => {
  // const { width, height } = useWindowSize()
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
      console.log(v)
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

  return (
    <div
      className="layout h-full w-full select-none text-gray-500"
      style={{ ...layoutStyle() }}>
      {left && (
        <div
          className="left-side relative flex flex-row"
          style={{ width: leftSideWidth }}>
          <LeftDrawer setLeft={setLeft} />
          <div
            className="absolute -right-2 top-0 bottom-0 w-2 cursor-col-resize touch-none"
            {...leftSideBind()}>
            <div className="h-full w-px border-l"></div>
          </div>
        </div>
      )}
      <HeaderLeft
        left={left}
        setLeft={setLeft}
        className="header group/Header flex flex-row items-center self-center justify-self-start px-4"
      />
      <HeaderRight
        className={`z-10 flex h-10 flex-row items-center justify-between ${
          right
            ? "right-side w-full self-start justify-self-end"
            : "header justify-self-end"
        }`}
        right={right}
        setRight={setRight}
      />
      <Main className="main overflow-auto relative" />
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
