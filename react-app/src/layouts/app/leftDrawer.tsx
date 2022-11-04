import { rootContext } from 'src/store'
import SimpleBar from 'simplebar-react'

const activeStyle = {
  textDecoration: 'underline',
}
const list1 = [
  {
    icon: <HomeIcon />, label: 'Home', id: 'a1', link: forwardRef((props: any, ref) => <NavLink to="home1" ref={ref} {...props} style={({ isActive }) => (isActive ? activeStyle : undefined)}/>),
  },
  {
    icon: <SearchIcon />, label: 'Search', id: 'a2', link: forwardRef((props: any, ref) => <NavLink to="home2" ref={ref} {...props} style={({ isActive }) => (isActive ? activeStyle : undefined)}/>),
  },
  {
    icon: <VideoLibraryIcon />, label: 'Your Library', id: 'a3', link: forwardRef((props: any, ref) => <NavLink to="home3" ref={ref} {...props} style={({ isActive }) => (isActive ? activeStyle : undefined)}/>),
  },
]
const list2 = [
  {
    icon: <AddCircleIcon/>, label: 'Create Playlist', id: 'b1', link: forwardRef((props: any, ref) => <NavLink to="/home4" ref={ref} {...props} style={({ isActive }) => (isActive ? activeStyle : undefined)}/>),
  },
  {
    icon: <FavoriteIcon/>, label: 'Liked Songs', id: 'b2', link: forwardRef((props: any, ref) => <NavLink to="/home5" ref={ref} {...props} style={({ isActive }) => (isActive ? activeStyle : undefined)}/>),
  },
  {
    icon: <AlbumIcon/>, label: 'Your Episode', id: 'b3', link: forwardRef((props: any, ref) => <NavLink to="/home6" ref={ref} {...props} style={({ isActive }) => (isActive ? activeStyle : undefined)}/>),
  },
]
const list3 = [
  { label: '2021年你的最爱歌曲', id: 'c1', link: forwardRef((props: any, ref) => <NavLink to="home7" ref={ref} {...props} style={({ isActive }) => (isActive ? activeStyle : undefined)}/>) },
  { label: 'Asmr Licking', id: 'c2', link: forwardRef((props: any, ref) => <NavLink to="home8" ref={ref} {...props} style={({ isActive }) => (isActive ? activeStyle : undefined)}/>) },
  { label: 'Long Long Long Long Long Long Long Long Long Long Long Long', id: 'c7', link: forwardRef((props: any, ref) => <NavLink to="home9" ref={ref} {...props} style={({ isActive }) => (isActive ? activeStyle : undefined)}/>) },
  { label: 'aaaaa', id: 'c3', link: forwardRef((props: any, ref) => <NavLink to="home7" ref={ref} {...props} style={({ isActive }) => (isActive ? activeStyle : undefined)}/>) },
  { label: 'bbbbb', id: 'c4', link: forwardRef((props: any, ref) => <NavLink to="home8" ref={ref} {...props} style={({ isActive }) => (isActive ? activeStyle : undefined)}/>) },
  { label: 'cccc', id: 'c5', link: forwardRef((props: any, ref) => <NavLink to="home7" ref={ref} {...props} style={({ isActive }) => (isActive ? activeStyle : undefined)}/>) },
  { label: 'dddd', id: 'c6', link: forwardRef((props: any, ref) => <NavLink to="home8" ref={ref} {...props} style={({ isActive }) => (isActive ? activeStyle : undefined)}/>) },
]
const listSx = {
  minWidth: 50,
  maxWidth: 200,
  minHeight: 0,
  p: 0,
  display: 'flex',
  flexFlow: 'column nowrap',
  height: '100%',
}

const textSx = {
  fontWeight: 700,
  fontSize: 14,
  overflow: 'hidden',
  // whiteSpace: 'nowrap',
  noWrap: true,
  textOverflow: 'ellipsis',
}

export const LeftDrawer = observer(() => {
  const $app = useContext(rootContext).app

  return (
    <Box sx={{ position: 'relative' }}>
      <List sx={{ ...listSx }} dense>
        <Box>
          {
            list1.map((item) => <ListItemButton key={item.id} disableRipple component={item.link}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                { item.icon }
              </ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ ...textSx }} />
            </ListItemButton>)
          }
          <Box sx={{ height: 20 }}></Box>
          {
          list2.map((item) => <ListItemButton key={item.id} disableRipple component={item.link}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              { item.icon }
            </ListItemIcon>
            <ListItemText primary={item.label} primaryTypographyProps={{ ...textSx }}/>
            {/* <DownloadingIcon sx={{ fontSize: 16 }}/> */}
          </ListItemButton>)
        }
        </Box>
        <Divider variant="middle"/>
        <Box sx={{
          flexGrow: 1, minHeight: 0, overflow: 'hidden',
        }}>
          <SimpleBar style={{ maxHeight: '100%' }}>
            {
            list3.map((item) => (
              <ListItemButton key={item.id} disableRipple component={item.link}>
                <ListItemText primary={item.label} primaryTypographyProps={{ ...textSx }} />
              </ListItemButton>))
          }
          </SimpleBar>
        </Box>
        {
          <Slide direction="up" in={!$app.a}
              exit={false}
              timeout={{ enter: 0, exit: 0 }}
              unmountOnExit >
            <Box sx={{
              width: '100%',
              aspectRatio: '1/1',
              position: 'relative',
            }}>
              <Avatar src="http://zephoria.com/wp-content/uploads/2014/08/online-community.jpg" variant="square"
                  sx={{ width: '100%', height: '100%' }}>
              </Avatar>
              <Icon sx={{
                position: 'absolute', right: 0, top: 0, zIndex: 9999,
              }} className="hvr-grow" onClick={() => $app.toogle('a')}>expand_more</Icon>
            </Box>
          </Slide>
      }
      </List>
    </Box>
  )
})
