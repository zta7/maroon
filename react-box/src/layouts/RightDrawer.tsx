import { useDrag } from "@use-gesture/react"
import { useState } from "react"

export const RightDrawer = <T extends React.HTMLProps<Element>>({}: T) => {
  const [rightSideWidth, setRightSideWidth] = useState(400)
  const rightSideWidthMin = 360
  const rightSideWidthMax = 520
  const rightSideBind = useDrag(
    (state) => {
      const mx = state.delta[0]
      let v = rightSideWidth - mx
      if (v < rightSideWidthMin) v = rightSideWidthMin
      else if (v > rightSideWidthMax) v = rightSideWidthMax
      setRightSideWidth(v)
    },
    { axis: "x" }
  )

  return (
    <div className="right-side relative" style={{ width: rightSideWidth }}>
      <div
        className="absolute top-0 bottom-0 w-2 cursor-col-resize touch-none"
        {...rightSideBind()}>
        <div className="h-full w-px border-l"></div>
      </div>
      <div className="mt-10 h-[calc(100%-40px)] w-full overflow-auto">
        {Array.from({ length: 100 }).map((e, i) => {
          return <div key={i}>tree</div>
        })}
      </div>
    </div>
  )
}
