import { useState } from "react"


export const Pagination = () => {
  const [page, setPage] = useState(1)

  return (
    <div className="flex flex-row">
      <div onClick={() => setPage(page - 1)}>Prev Page</div>
      <div onClick={() => setPage(page + 1)}>Next Page</div>
    </div>
  )
}