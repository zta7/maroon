import { useGesture } from "@use-gesture/react"

export const GestureTest = () => {
  const bind = useGesture({
    onDrag: (state) => {
      console.log('onDrag')
    },
    onHover: (state) => {
      console.log('onHover')
    },
    onMove: (state) => {
      console.log('onMove')
    }
  })
  return (
    <div {...bind()}>
      123456789
    </div>
  )
}