export const Main = () => {
  return (
    <div className="Main m-auto flex h-full max-w-4xl  grow cursor-text flex-col">
      <div className=" flex w-full flex-col">
        <div className="Main-head basis-42 group w-full flex-initial grow pl-24">
          <div className="flex w-full grow flex-col">
            <div className="notion-control mt-24 flex  grow opacity-0 group-hover:opacity-40">
              <div className="c1">
                <ControlBottom Img={<IconMdiMore />} />
              </div>
              <div className="c2">
                <ControlBottom Img={<IconMdiCoffee />} />
              </div>
              <div className="c3">
                <ControlBottom Img={<IconMdiCog />} />
              </div>
            </div>
            <div className="flex grow flex-row">
              <div
                className="Main-header w-0 grow whitespace-pre-wrap  break-words pr-24"
                style={{ fontSize: "2rem" }}>
                UUUUUnitiedUUUnidtiedUUUnitiedUUUnitiedUUUnitiedUUni
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
      <main className="flex grow flex-row  px-24 pb-36">
        <div className="w-0 grow whitespace-pre-wrap break-words">
          UUUUUnitiedUUUnidtiedUUUnitiedUUUnitiedUUUnitiedUUni112345623456112345623456112345623456
        </div>
      </main>
    </div>
  )
}

const ControlBottom = (props: any) => {
  return (
    <div className="flex cursor-pointer  rounded-lg py-1.5 pr-2 pl-1.5 text-sm hover:bg-gray-200">
      <div className="m-auto mr-2">{props.Img}</div>
      <span>Add icon</span>
    </div>
  )
}
