export const Test = () => {
  const a = (e) => {
    console.log('a')
  }

  const b = (e) => {
    // e.stopPropagation()
    console.log('b')
  }

  const c = (e) => {
    // e.stopPropagation()
    console.log('c')
  }
  return (
    <div onMouseDown={a}>
      <div className="pointer-events-none">
        <div onMouseDown={b}>
          <div onMouseDown={c}>
            ffffffff
          </div>
        </div>
      </div>
    </div>
  )
}