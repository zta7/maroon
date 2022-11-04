import {useMount} from 'react-use';

interface Props {
  children: React.ReactNode
}

export const Tooltip = ({ children }: Props) => {
  const tooltipRef = useRef(null)
  useMount(() => {
    // console.dir(tooltipRef.current.parentElement)
  })
  return (
    <div ref={tooltipRef}>
      { children }
    </div>
  )
}