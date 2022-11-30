import { BaseSyntheticEvent, useState } from "react"
import cx from "classnames"

interface Props {
  value?: boolean,
  onChange?: null | ((value: boolean) => void)
}

export const Switch = ({value = false, onChange = null} :Props) => {
  const [v, setV] = useState(value)

  const c1 = cx([
    'h-4 w-7 flex rounded-xl items-center px-0.5 cursor-pointer relative',
    `${!v ? "bg-neutral-300 hover:bg-neutral-400": "bg-blue-500"}`
  ])

  const c2 = cx([
    'bg-white h-3 w-3 rounded-full transition duration-200',
    { "translate-x-3 shadow-lg":  v}
  ])
  
  const onCheck = (e: BaseSyntheticEvent) => {
    if(onChange) {
      onChange(e.target.checked)
      setV(e.target.checked)
    }
    else {
      setV(e.target.checked)
    }
  }

  return (
    <div className={c1}>
      <div className={c2}></div>
      <label className="absolute top-0 bottom-0 left-0 right-0">
        <input type='checkbox' checked={v} onChange={onCheck} className="hidden"/>
      </label>
    </div>
  )
}