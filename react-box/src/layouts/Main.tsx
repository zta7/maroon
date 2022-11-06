export const Main = () => {
  return (
    <div className="Main m-auto flex h-full max-w-4xl  grow cursor-text flex-col text-sm opacity-40">
      <div className=" flex w-full flex-col">
        <div className="Main-head basis-42 group w-full flex-initial grow pl-24">
          <div className="flex w-full grow flex-col">
            <div className="notion-control mt-24 flex  grow opacity-0 group-hover:opacity-100">
              <div className="c1">
                <ControlBottom Img={<IconMdiMore />} text={"Add icon"} />
              </div>
              <div className="c2">
                <ControlBottom Img={<IconMdiCoffee />} text={"Add cover"} />
              </div>
              <div className="c3">
                <ControlBottom Img={<IconMdiCog />} text={"Add commit"} />
              </div>
            </div>
            <div className="flex grow flex-row">
              <div className="Main-header flex w-0  grow flex-col pr-24 text-5xl  opacity-100">
                <div
                  className="whitespace-pre-wrap break-words py-1.5 pr-2 pl-1.5 font-black"
                  contentEditable="true"
                  spellCheck="true"
                  placeholder="Untitled"
                  data-content-editable-leaf="true"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="flex grow flex-col  px-24 pb-36">
        <div
          onClick={() => console.log("点击转换可编辑div")}
          className="whitespace-pre-wrap break-words py-1.5 pr-2 pl-1.5 pb-6">
          Press Enter to continue with an empty page, or pick a template (↑↓ to
          select)
        </div>
        <div>
          <div>
            <div>
              <ControlBottom Img={<IconMdiCog />} text={"Add commit"} />
              <ControlBottom Img={<IconMdiCog />} text={"Add commit"} />
              <ControlBottom Img={<IconMdiCog />} text={"Add commit"} />
              <ControlBottom Img={<IconMdiCog />} text={"Add commit"} />
            </div>
            <div>
              <div className="p-1.5 pt-6 pr-2 pl-1.5">DATABASE</div>
              <ControlBottom Img={<IconMdiCog />} text={"Add commit"} />
              <ControlBottom Img={<IconMdiCog />} text={"Add commit"} />
              <ControlBottom Img={<IconMdiCog />} text={"Add commit"} />
              <ControlBottom Img={<IconMdiCog />} text={"Add commit"} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const ControlBottom = (props: { Img: any; text: string; bgcolor?: string }) => {
  const className = !props.bgcolor ? "bg-gray-200" : props.bgcolor //run
  return (
    <div
      className={
        "flex cursor-pointer rounded-lg py-1.5 pr-2 pl-1.5 hover:bg-gray-200"
      }>
      <div className="my-auto mr-2">{props.Img}</div>
      <span>{props.text}</span>
    </div>
  )
}
