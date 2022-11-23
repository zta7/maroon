import { useState } from "react"

interface Props {
  page: number
  count: number
  onChange: (page: number) => any
}

export const Pagination = ({ page, count, onChange }: Props) => {
  return (
    <div className="flex flex-row">
      <div onClick={onChange(page - 1)}>Prev Page</div>
      <div onClick={onChange(page - 1)}>Next Page</div>
    </div>
  )
}
