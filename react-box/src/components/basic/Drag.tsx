import { CSSProperties } from "react"
import { useDrag, useDrop } from "react-dnd"
import { getEmptyImage } from "react-dnd-html5-backend"

interface Props {
  children: JSX.Element,
  item: Object,
}

export const Drag = ({ children, item }: Props) => {
  const [, dropRef] = useDrop({
    accept: 'column',
    drop: (targetItem) => {
      console.log(targetItem, item)
    },
  })

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    type: "column",
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  // useEffect(() => {
  //   preview(getEmptyImage(), { captureDraggingState: true })
  // }, [])
  return (
    <div ref={dropRef}>
      <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
        {children}
      </div>
    </div>
  )
}
