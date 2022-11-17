import { useDrag } from "@use-gesture/react"
import { Dispatch, SetStateAction } from "react"

interface Props {
  width: number
  minWidth: number
  maxWidth: number
  setWidth: Dispatch<SetStateAction<number>>
}

export const SplitterLine = ({
  width,
  minWidth,
  maxWidth,
  setWidth,
}: Props) => {
  const rightSideBind = useDrag(
    (state) => {
      const mx = state.delta[0]
      let v = width - mx
      if (v < minWidth) v = minWidth
      else if (v > maxWidth) v = maxWidth
      setWidth(v)
    },
    { axis: "x" }
  )

  return (
    <div
      className="absolute top-0 bottom-0 w-2 cursor-col-resize touch-none"
      {...rightSideBind()}>
      <div className="h-full w-px border-l"></div>
    </div>
  )
}
