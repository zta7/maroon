import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import { EpisodePage } from './pages/EpisodePage'
import { HomePage } from './pages/HomePage'
import { LibraryPage } from './pages/LibraryPage'
import { LikedPage } from './pages/LikedPage'
import { PlayListPage } from './pages/PlayListPage'
import { SearchPage } from './pages/SearchPage'
import { rootContext, rootStore } from './store'

// css
import './index.css'
import 'hover.css'
// import 'animate.css'
import 'simplebar-react/dist/simplebar.min.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <rootContext.Provider value={rootStore}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home1" element={<HomePage />} />
            <Route path="home2" element={<SearchPage />} />
            <Route path="home3" element={<LibraryPage />} />
            <Route path="home4" element={<PlayListPage />} />
            <Route path="home5" element={<LikedPage />} />
            <Route path="home6" element={<EpisodePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </rootContext.Provider>
  </React.StrictMode>,
)
