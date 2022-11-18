import { useDrag } from "@use-gesture/react"
import { useCallback, useState } from "react"
import { useSelector } from "react-redux"
import { SplitterLine } from "src/components/rightDrawer/SplitterLine"
import { Slide } from "src/components/transition/Slide"
import { RightStatus } from "src/store/layout"

export const RightDrawer = () => {
  const [width, setWidth] = useState(400)
  const minWidth = 360
  const maxWidth = 520
  const { right } = useSelector((state: any) => state.layout)

  return (
    <Slide
      state={right !== RightStatus.Invisible}
      className="right-side group/rightSide relative"
      style={{ width }}>
      <div className="mt-10 h-[calc(100%-40px)] w-full overflow-auto">
        {Array.from({ length: 100 }).map((e, i) => {
          return <div key={i}>tree</div>
        })}
      </div>
      <SplitterLine
        width={width}
        minWidth={minWidth}
        maxWidth={maxWidth}
        setWidth={setWidth}
      />
    </Slide>
  )
}
