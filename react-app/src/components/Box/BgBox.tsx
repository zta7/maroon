interface Props {
  bgcolor?: string
}

export const BgBox = ({ bgcolor } : Props) => (
  <Box sx={{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    bgcolor,
    zIndex: -9999,
  }}>
  </Box>
)
