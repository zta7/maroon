import { Header } from "./layouts/Header"
import { LeftDrawer } from "./layouts/LeftDrawer"
import { Main } from "./layouts/Main"
import { RightDrawer } from "./layouts/RightDrawer"

function App() {
  return (
    <div className="flex h-full w-full select-none flex-row">
      <LeftDrawer />
      <div className="flex grow flex-col">
        <Header />
        <div className="Body flex grow flex-row">
          <div className="grow">
            <Main />
          </div>
          <RightDrawer />
        </div>
        {/* <div className="RightDrawer">13</div> */}
      </div>
    </div>
  )
}

export default App
