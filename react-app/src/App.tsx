import AppLayout from 'src/layouts/app/index'
import { MuiThemeProvider } from './theme'

const App = () => (
  <MuiThemeProvider>
    <AppLayout />
  </MuiThemeProvider>
)

export default App
