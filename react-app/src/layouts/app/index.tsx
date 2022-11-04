import { Body } from './body'
import { Footer } from './footer'
import { Header } from './header'
import { LeftDrawer } from './leftDrawer'

const App = () => (
  <Box className="app">
    <Header />
    <Stack className="navbar" direction="row" sx={{ minHeight: 0 }}>
      <LeftDrawer />
      <Divider orientation="vertical"/>
    </Stack>
    <Body />
    <Footer />
  </Box>
)

export default App
