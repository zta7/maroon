import { useState } from "react"
import cx from "classnames"

export const Switch = () => {
  const [value, setValue] = useState(true)

  const c1 = cx([
    'h-4 w-7 flex rounded-xl items-center px-0.5 cursor-pointer',
    `${value ? "bg-neutral-300 hover:bg-neutral-400": "bg-blue-500"}`
  ])

  const c2 = cx([
    'bg-white h-3 w-3 rounded-full transition duration-200',
    { "translate-x-3 shadow-lg":  !value}
  ])
  

  return (
    <div className={c1} role="checkbox" onClick={() => setValue(!value)}>
      <div className={c2}></div>
    </div>
  )
}