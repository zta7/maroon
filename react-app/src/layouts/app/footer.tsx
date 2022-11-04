import { MusicBar } from 'src/components/Bar/MusicBar'
import { Music } from 'src/models/Music'

export const Footer = () => {
  const music = new Music()

  return (
    <Box className="footer">
      <MusicBar music={music} />
    </Box>
  )
}
