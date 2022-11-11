import { Splitter } from "./components/basic/Splitter"
import { Header } from "./layouts/Header"
import { LeftDrawer } from "./layouts/LeftDrawer"
import { Main } from "./layouts/Main"
import { RightDrawer } from "./layouts/RightDrawer"

function App() {
  return (
    <Splitter className="flex h-full w-full select-none flex-row text-gray-500 overflow-hidden">
      <LeftDrawer />
      <div className="flex grow flex-col">
        <Header />
        <div className="Body flex grow flex-row" style={{ width: 500 }}>
          <div style={{ width: 500 }} className='w-full h-full px-40'>123456</div>
            {/* <Main /> */}
          </div>
      </div>
      <div
        className="absolute right-0 top-0 bottom-0 flex flex-row"
        style={{ width: 400 }}>
        <div className="h-full w-px bg-red-800"></div>
        <RightDrawer />
      </div>
    </Splitter>
  )
}

export default App
