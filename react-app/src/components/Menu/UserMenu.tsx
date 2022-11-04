export const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const onClick = (event:any) => setAnchorEl(event.currentTarget)
  const onMenuClose = () => setAnchorEl(null)
  const menus = [
    { title: 'Account', icon: <OpenInNewIcon fontSize="small"/> },
    { title: 'Profile' },
    { title: 'Setting' },
    { title: 'Logout', divider: <Divider style={{ margin: 0 }}/> },
  ]

  return <>
    <Stack onClick={onClick} component={ButtonBase}
        direction="row" alignItems="center" sx={{ border: 1, borderRadius: 10, p: 0.1 }}>
      <Avatar sx={{ width: 32, height: 32 }}>H</Avatar>
      <Typography variant="body1" sx={{ ml: 1 }}>
        Zta
      </Typography>
      { open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
    </Stack>
    <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={onMenuClose}>
      {
        menus.map((e) => <Box key={e.title}>
          { e.divider }
          <MenuItem onClick={onMenuClose}
              sx={{
                width: 200, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
            {e.title}
            {e.icon}
          </MenuItem>
        </Box>)
      }
    </Menu>
  </>
}
