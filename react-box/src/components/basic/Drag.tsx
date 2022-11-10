import { CSSProperties } from "react"
import { useDrag } from "react-dnd"
import { getEmptyImage } from "react-dnd-html5-backend"

interface Props {
  children: JSX.Element
}

function getStyles(isDragging: boolean): CSSProperties {
  if (isDragging) {
    console.log(isDragging)

    return {
      position: "absolute",
      background: "red",
      // IE fallback: hide the real node using CSS when dragging
      // because IE will ignore our custom "empty image" drag preview.
      opacity: isDragging ? 0 : 1,
      height: isDragging ? 0 : "",
    }
  }
  return {}
}
export const Drag = ({ children }: Props) => {
  const [{ isDragging }, dragRef, preview] = useDrag({
    type: "Drag",
    item: () => {
      return { id: Math.random() }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])
  return (
    <div ref={dragRef} style={getStyles(isDragging)}>
      {children}
    </div>
  )
}
