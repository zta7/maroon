import { useSpring, animated, useSprings } from "react-spring"

export const SpringTest = () => {
  let opacity = 1
  let x = 1
  const [springs, api] = useSprings(7, () => () => ({ opacity, x }))
  const onStart = () => {
    opacity ? (opacity = 0) : (opacity = 1)
    // api.start({ opacity: 0, x: 0 })
  }
  const onSet = () => {
    x += 1
    console.log(api.set({ x: 100 }))
  }
  const onUpdate = () => {
    x += 2
    // api.update(() => ({ x }))
  }
  return (
    <>
      <div className="flex flex-row flex-nowrap gap-2">
        <div onClick={onStart}>start</div>
        <div onClick={onSet}>set</div>
        <div onClick={onUpdate}>update</div>
      </div>
      {springs.map((style, i) => {
        return (
          <animated.div style={style} key={i}>
            {i}
          </animated.div>
        )
      })}
    </>
  )
}
