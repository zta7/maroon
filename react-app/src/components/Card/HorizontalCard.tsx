import { FC } from 'react'
import { GenricList } from '../../models/GenricList'

type Props = {
  item: GenricList
  clearable?: Boolean
}

const CardProps = {
  sx: {
    transition: 'all .25s ease-in-out',
    position: 'relative',
    pr: 1,
    '&': {
      cursor: 'pointer',
      ':hover': {
        bgcolor: 'secondary.main',
        color: 'secondary.contrastText',
        '.PlayArrowIcon': {
          opacity: 1,
          bottom: 4,
        },
      },
    },
  },
}

const PauseIconProps = {
  sx: {
    boxShadow: 3, bgcolor: 'white', color: 'success.main', borderRadius: 5, fontSize: 40, alignSelf: 'center',
  },
  className: 'hvr-grow',
}

const PlayArrowIconProps = {
  sx: {
    boxShadow: 3,
    bgcolor: 'white',
    color: 'success.main',
    borderRadius: 5,
    opacity: 0,
    fontSize: 40,
    transition: 'all .25s ease-in-out',
    alignSelf: 'center',
  },
  className: 'PlayArrowIcon hvr-grow',
}

const CardBoxProps = {
  sx: {
    flexGrow: 1,
    overflow: 'hidden',
    px: 2,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
  },
}

const CardMediaProps = {
  sx: { aspectRatio: '1/1', height: 70 },
}

export const HorizontalCard: FC<Props> = observer(({ item }) => {
  const { title, subtitle, isPlaying } = item

  const PlayOrPauseIcon = () => (isPlaying
    ? <PauseCircleIcon {...PauseIconProps} onClick={() => item.pause()} />
    : <PlayCircleIcon {...PlayArrowIconProps} onClick={() => item.play()}/>)

  return <Stack direction="row" alignItems="stretch" justifyContent="space-between" component={Card} {...CardProps}>
    <Box sx={{ position: 'relative' }}>
      <Box {...CardMediaProps}>
        <CardMedia
            style={{ width: '100%', height: '100%' }}
            component="img"
            image="http://zephoria.com/wp-content/uploads/2014/08/online-community.jpg" />
      </Box>
    </Box>
    <Box {...CardBoxProps}>
      <Typography className={'ellipsis-2-lines break-all'} >
        { title }
      </Typography>
      <Typography className={'ellipsis'} variant="caption" component="div">
        { subtitle }
      </Typography>
    </Box>
    <PlayOrPauseIcon/>
  </Stack>
})
