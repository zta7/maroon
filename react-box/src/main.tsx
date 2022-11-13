import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { rootContext, rootStore } from "./store"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <rootContext.Provider value={rootStore}>
      <QueryClientProvider client={queryClient}>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </QueryClientProvider>
    </rootContext.Provider>
  </React.StrictMode>
)
