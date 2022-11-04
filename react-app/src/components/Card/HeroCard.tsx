import { FC } from 'react'
import { Cover } from '../../models/Cover'

type Props = {
  item: Cover,
  aspectRatio?: string
}

const CardProps = {
  sx: {
    position: 'relative',
    '&': {
      cursor: 'pointer',
    },
  },
}

const titleProps = {
  sx: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: 'white',
  },
}

export const HeroCard: FC<Props> = ({ item, aspectRatio = '2/1' }) => {
  const { title } = item
  return <Card {...CardProps}>
    <Typography variant="h6" {...titleProps}>
      {title}
    </Typography>
    <CardMedia
        style={{ aspectRatio }}
        component="img"
        image="http://zephoria.com/wp-content/uploads/2014/08/online-community.jpg" />
  </Card>
}
