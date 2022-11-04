import { createContext } from 'react'
import SimpleBar from 'simplebar-react'
import { headerHeight } from './header'

const simplebarRef = createRef<SimpleBar>()
const SimplebarRefContext = createContext(simplebarRef)
export const Body = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const location = useLocation()
  useEffect(() => {
    const scrollEl = simplebarRef.current?.getScrollElement() as HTMLElement
    scrollEl.scrollTop = 0
  }, [location])

  return (
    <Paper className="main relative-position" square>
      <Box className="absolute-full">
        <SimpleBar style={{ maxHeight: '100%' }} ref={simplebarRef}>
          <SimplebarRefContext.Provider value={simplebarRef}>
            <Box sx={{
              height: headerHeight, position: 'sticky', top: 0,
            }} />
            <Box>
              {
                mounted && <Outlet />
              }
            </Box>
          </SimplebarRefContext.Provider>
        </SimpleBar>
      </Box>
    </Paper>
  )
}

export { SimplebarRefContext }
