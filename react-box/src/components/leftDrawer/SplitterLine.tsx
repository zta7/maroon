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
  const leftSideDragBind = useDrag(
    (state) => {
      const mx = state.delta[0]
      let v = width + mx
      if (v < minWidth) v = width
      if (v > maxWidth) v = maxWidth
      setWidth(v)
    },
    { axis: "x" }
  )
  return (
    <div
      className="group/splitter absolute -right-1 top-0 bottom-0 flex w-2 cursor-col-resize touch-none flex-row items-center justify-center"
      {...leftSideDragBind()}>
      <div className=" h-[calc(100%-2px)] w-px border-l group-hover/splitter:border-neutral-300"></div>
    </div>
  )
}
