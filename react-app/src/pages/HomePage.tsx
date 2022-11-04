import { GenricList } from 'src/models/GenricList'
import { HorizontalCard } from '../components/Card/HorizontalCard'
import { VerticalCard } from '../components/Card/VerticalCard'
import { CardContainer } from '../components/Container/CardContainer'

/* eslint-disable max-len */
export const HomePage = () => {
  const list1 = [
    new GenricList({ title: 'Your Liked', subtitle: 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhfhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhfhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhfhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhfhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhfhh' }),
    new GenricList({ title: 'Justin Bieber' }),
    new GenricList({ title: 'Top 50 - Universe' }),
    new GenricList({ title: 'Post Malone' }),
    new GenricList({ title: 'Long LongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLong' }),
    new GenricList({ title: 'Your most loved in 2021' }),
    new GenricList({ title: 'Excise' }),
    new GenricList({ title: 'Malamla' }),
  ]
  const list2 = [
    new GenricList({ title: 'Asmr(No Talking)', subtitle: 'Jorge Luis Jr.' }),
    new GenricList({ title: 'LazyMiu Asmr', subtitle: 'LazyMiu' }),
    new GenricList({ title: 'Asmr(No Talking)', subtitle: 'Jorge Luis Jr.' }),
    new GenricList({ title: 'Asmr(No Talking)', subtitle: 'Jorge Luis Jr.' }),
    new GenricList({ title: 'LazyMiu Asmr', subtitle: 'LazyMiu' }),
    new GenricList({ title: 'Asmr(No Talking)', subtitle: 'Jorge Luis Jr.' }),
  ]
  const list3 = [
    {
      path: '1',
      title: 'Review Classic',
      children: [
        new GenricList({ title: 'Top 50 - Universe', subtitle: 'Daily updates of your current hottest tracks - Universe' }),
        new GenricList({ title: 'Mood Booster', subtitle: "Get Happy with today's does of feel-good songs!" }),
        new GenricList({ title: 'Top 50 - Universe', subtitle: 'Daily updates of your current hottest tracks - Universe' }),
        new GenricList({ title: 'Mood Booster', subtitle: "Get Happy with today's does of feel-good songs!" }),
        new GenricList({ title: 'Top 50 - Universe', subtitle: 'Daily updates of your current hottest tracks - Universe' }),
        new GenricList({ title: 'Mood Booster', subtitle: "Get Happy with today's does of feel-good songs!" }),
      ],
    },
    {
      path: '2',
      title: 'Never Discovered',
      children: [
        new GenricList({ title: 'Top 50 - Universe', subtitle: 'Daily updates of your current hottest tracks - Universe' }),
        new GenricList({ title: 'Mood Booster', subtitle: "Get Happy with today's does of feel-good songs!" }),
        new GenricList({ title: 'Top 50 - Universe', subtitle: 'Daily updates of your current hottest tracks - Universe' }),
        new GenricList({ title: 'Mood Booster', subtitle: "Get Happy with today's does of feel-good songs!" }),
        new GenricList({ title: 'Top 50 - Universe', subtitle: 'Daily updates of your current hottest tracks - Universe' }),
        new GenricList({ title: 'Mood Booster', subtitle: "Get Happy with today's does of feel-good songs!" }),
      ],
    },
    {
      path: '3',
      title: 'Recent Played',
      children: [
        new GenricList({ title: 'Top 50 - Universe', subtitle: 'Daily updates of your current hottest tracks - Universe' }),
        new GenricList({ title: 'Mood Booster', subtitle: "Get Happy with today's does of feel-good songs!" }),
        new GenricList({ title: 'Top 50 - Universe', subtitle: 'Daily updates of your current hottest tracks - Universe' }),
        new GenricList({ title: 'Mood Booster', subtitle: "Get Happy with today's does of feel-good songs!" }),
        new GenricList({ title: 'Top 50 - Universe', subtitle: 'Daily updates of your current hottest tracks - Universe' }),
        new GenricList({ title: 'Mood Booster', subtitle: "Get Happy with today's does of feel-good songs!" }),
      ],
    },
    {
      path: '4',
      title: 'Hot Played',
      children: [
        new GenricList({ title: 'Top 50 - Universe', subtitle: 'Daily updates of your current hottest tracks - Universe' }),
        new GenricList({ title: 'Mood Booster', subtitle: "Get Happy with today's does of feel-good songs!" }),
        new GenricList({ title: 'Top 50 - Universe', subtitle: 'Daily updates of your current hottest tracks - Universe' }),
        new GenricList({ title: 'Mood Booster', subtitle: "Get Happy with today's does of feel-good songs!" }),
        new GenricList({ title: 'Top 50 - Universe', subtitle: 'Daily updates of your current hottest tracks - Universe' }),
        new GenricList({ title: 'Mood Booster', subtitle: "Get Happy with today's does of feel-good songs!" }),
      ],
    },
    {
      path: '5',
      title: 'More You Loved',
      subtitle: 'Listen More You Loved !',
      children: [
        new GenricList({ title: 'Top 50 - Universe', subtitle: 'Daily updates of your current hottest tracks - Universe' }),
        new GenricList({ title: 'Mood Booster', subtitle: "Get Happy with today's does of feel-good songs!" }),
        new GenricList({ title: 'Top 50 - Universe', subtitle: 'Daily updates of your current hottest tracks - Universe' }),
        new GenricList({ title: 'Mood Booster', subtitle: "Get Happy with today's does of feel-good songs!" }),
        new GenricList({ title: 'Top 50 - Universe', subtitle: 'Daily updates of your current hottest tracks - Universe' }),
        new GenricList({ title: 'Mood Booster', subtitle: "Get Happy with today's does of feel-good songs!" }),
      ],
    },
  ]
  return <>
    <CardContainer title="Good Afternoon" >
      {
        list1.map((item) => <Grid item xs={12} md={6} lg={3} key={item.id}>
          <HorizontalCard item={item}/>
        </Grid>)
      }
    </CardContainer>
    <CardContainer title="Your Entertainment" action={<MuiLink underline="hover">View More</MuiLink>}>
      {
        list2.map((item) => <Grid item xs={12} sm={6} md={4} lg={2} key={item.id} sx={{ display: 'flex' }}>
          <VerticalCard item={item} />
        </Grid>)
      }
    </CardContainer>
    {
      list3.map((e) => {
        const TitleLink = (title: string) => <MuiLink href="#" underline="hover" component={NavLink} to="/fff">{title}</MuiLink>
        return <CardContainer key={e.path} title={TitleLink(e.title)} subtitle={e.subtitle} action={<MuiLink underline="hover">View More</MuiLink>}>
          {
            e.children.map((item) => <Grid item xs={12} sm={6} md={4} lg={2} key={item.id} sx={{ display: 'flex' }}>
              <VerticalCard item={item} />
            </Grid>)
          }

        </CardContainer>
      })
    }
  </>
}
