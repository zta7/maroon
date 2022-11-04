import { UserMenu } from 'src/components/Menu/UserMenu'

export const headerHeight = 64

export const Header = () => (
  <CardContent
      className="main"
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 0,
        zIndex: 5,
        position: 'sticky',
        top: 0,
        height: headerHeight,
        pointerEvents: 'none',
      }}>
    <Box sx={{ pointerEvents: 'auto' }}>
      <Icon fontSize="large" sx={{ borderRadius: 5, mr: 1 }}>keyboard_arrow_left</Icon>
      <Icon fontSize="large" sx={{ borderRadius: 5 }}>keyboard_arrow_right</Icon>
    </Box>
    <Box>
      {/* <TextField
  size="small"
  color="primary"
  focused
  InputProps={{
    startAdornment: (
      <SearchIcon />
    ),
    endAdornment: (
      <CloseIcon sx={{ cursor: 'pointer' }}/>
    ),
  }}
  variant="outlined"/> */}
    </Box>
    <Box sx={{ pointerEvents: 'auto' }}>
      <UserMenu />
    </Box>
  </CardContent>
)
