import { rootContext } from 'src/store'
import { MusicItem } from './MusicBar/MusicItem'
import { Music } from '../../models/Music'

interface Props {
  music: Music,
}

const sliderSx = {
  '&.MuiSlider-dragging, &:hover': {
    '.MuiSlider-track': {
      backgroundColor: 'red',
      border: '1px solid red',
    },
    '.MuiSlider-thumb': {
      display: 'block',
      backgroundColor: 'red',
    },
  },
  '.MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: 'none',
    },
    display: 'none',
  },
}

export const MusicBar = observer(({ music }: Props) => {
  const { isPlaying } = music
  const $app = useContext(rootContext).app
  const { isShuffling, playingMode, volume } = $app
  return <Paper square sx={{ px: 2, height: 'inherit', minWidth: 950 }}>
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ height: 'inherit' }}>
      <Stack direction="row" alignItems="center" justifyContent="start" sx={{
        minWidth: 180,
        width: '30%',
      }}>
        <MusicItem music={music}/>
      </Stack>
      <Stack sx={{
        maxWidth: 722,
        width: '40%',
      }} alignItems="center">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Stack sx={{ position: 'relative' }} color={isShuffling ? 'error.main' : 'text.primary'} alignItems="center">
            <ShuffleIcon onClick={() => $app.toogle('isShuffling')}/>
            { isShuffling && <CircleIcon sx={{ fontSize: 8, position: 'absolute', bottom: '-8px' }}/> }
          </Stack>
          <SkipPreviousIcon fontSize="large"/>
          <Box onClick={() => music.toogle('isPlaying')} sx={{ fontSize: 42, display: 'flex' }}>
            { isPlaying ? <PlayArrowIcon fontSize="inherit"/> : <PauseIcon fontSize="inherit"/> }
          </Box>
          <SkipNextIcon fontSize="large"/>
          <Stack sx={{ position: 'relative' }}
              color={playingMode % 3 === 0 ? 'error.main' : 'text.primary'} alignItems="center" onClick={() => $app.set(['playingMode', playingMode + 1])}>
            { playingMode % 3 === 1 ? <LooksOneIcon /> : <LoopIcon/> }
            { playingMode % 3 === 0 && <CircleIcon sx={{ fontSize: 8, position: 'absolute', bottom: '-8px' }}/>}
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ width: '100%' }}>
          <Typography variant="caption">
            0:00
          </Typography>
          <Slider
              size="small"
              defaultValue={70}
              sx={{ ...sliderSx }}/>
          <Typography variant="caption">
            5:20
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="end" spacing={1} sx={{
        minWidth: 180,
        width: '30%',
      }}>
        <MicIcon />
        <QueueMusicIcon />
        <CastIcon />
        <Stack direction="row" spacing={0.5} alignItems="center">
          {
            volume === 0 ? <VolumeOffIcon />
              : volume <= 70
                ? <VolumeDownIcon/>
                : <VolumeUpIcon />
          }
          <Slider size="small" value={volume} onChange={(evt, v) => $app.set(['volume', v])}
              min={0} max={100} sx={{ ...sliderSx, width: '120px' }}/>
        </Stack>
        <OpenInFullIcon />
      </Stack>
    </Stack>
  </Paper>
})
