import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Provider } from 'react-redux'
import { store } from 'src/store';


// import { Provider } from 'react-redux'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
            <App />
        </Provider>
      </DndProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
