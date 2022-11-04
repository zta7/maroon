import { GenricList } from 'src/models/GenricList'
import { VerticalCard } from '../components/Card/VerticalCard'
import { CardContainer } from '../components/Container/CardContainer'

const list1 = [
  new GenricList({ title: 'Your Liked', subtitle: 'Artist' }),
  new GenricList({ title: 'Justin Bieber' }),
  new GenricList({ title: 'Top 50 - Universe' }),
  new GenricList({ title: 'Post Malone' }),
  new GenricList({ title: 'Long LongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLong' }),
  new GenricList({ title: 'Your most loved in 2021' }),
]

export const LibraryPage = () => {
  console.log('LibraryPage')
  return <>
    <CardContainer title="Your Entertainment" action={<MuiLink underline="hover">View More</MuiLink>}>
      {
      list1.map((item) => <Grid item xs={12} sm={6} md={4} lg={2} xl={1} key={item.id} sx={{ display: 'flex' }}>
        <VerticalCard item={item} />
      </Grid>)
    }
    </CardContainer>
    {/* <CardContainer title="你最喜欢的曲风">
    {
      list2.map((item) => <Grid item xs={4} key={item.id} sx={{ display: 'flex' }}>
        <CoverCard item={item} aspectRatio="2/1" />
      </Grid>)
    }
  </CardContainer>
  <CardContainer title="浏览全部">
    {
      list3.map((item) => <Grid item xs={12} sm={6} md={4} lg={2} key={item.id}>
        <CoverCard item={item}/>
      </Grid>)
    }
  </CardContainer> */}
  </>
}
