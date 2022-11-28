export const Test = () => {
  const a = (e) => {
    console.log('a')
  }

  const b = (e) => {
    // e.stopPropagation()
    console.log('b')
  }
  return (
    <div>
      <div onMouseOverCapture={a}>
        aaa
        <div onMouseOverCapture={b}>bbb</div>
      </div>
    </div>
  )
}