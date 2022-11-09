import { Header } from "./layouts/Header"
import { LeftDrawer } from "./layouts/LeftDrawer"
import { Main } from "./layouts/Main"
// import { RightDrawer } from "./layouts/RightDrawer"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-full w-full select-none flex-row">
        <LeftDrawer />
        <div className="flex grow flex-col">
          <Header />
          <div className="Body flex grow flex-row">
            <div className="grow">
              <Main />
            </div>
          </div>
        </div>
        {/* <div
        className="absolute right-0 top-0 bottom-0 flex flex-row"
        style={{ width: "400px" }}>
        <div className="h-full w-px bg-red-800"></div>
        <RightDrawer />
      </div> */}
      </div>
    </QueryClientProvider>
  )
}

export default App
