import { Children, Fragment } from "react"

interface Props {
  children: React.ReactNode,
}

export const Splitter = <T extends React.HTMLProps<Element> & Props>({ children, className }: T) => {
  const arrayChildren = Children.toArray(children)
  const refs = useRef<Array<HTMLElement>>([])
  useEffect(() => {
    refs.current.map(el => {
      if(el) {
        console.dir(el.getBoundingClientRect())
      }
    })
  }, [])

  return (
    <div className={className}>
      {
        arrayChildren.map((e, i) => {
          return (
            <Fragment key={i}>
              {e}
            </Fragment>
          )
        })
      }
    </div>
  )
}