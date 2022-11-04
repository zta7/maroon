import React, { ReactElement } from 'react'
// import { ListCard } from './ListCard'

const CardHeaderSx = {
  pb: 0,
  '& .MuiCardHeader-action': {
    m: 0,
    alignSelf: 'end',
  },
}

type Direction = 'row' | 'column'

type Props = {
  title: string | ReactElement,
  subtitle?: string,
  action?: string | ReactElement,
  direction?: Direction,
  children: any
}

export const CardContainer: React.FC<Props> = ({
  title, subtitle = '', action, children,
}) => {
  console.log(1)

  // // 默认都是6个
  // const itemsLength = items.length
  // const showItems = itemsLength <= 6 ? items : items.slice(0, 6)
  // const action = itemsLength <= 6 ? undefined : <MuiLink underline="hover">123</MuiLink>

  return <Box>
    <CardHeader title={title} subtitle={subtitle} sx={CardHeaderSx} action={action}/>
    <CardContent>
      <Grid container spacing={2}>
        { children }
        {/* {
          showItems.map((item) => <Grid item {...GirdItemProps(direction)} key={item.id}>
            <ListCard item={item} direction={direction} />
          </Grid>)
        } */}
      </Grid>
    </CardContent>
  </Box>
}
