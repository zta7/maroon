import { useQuery } from "@tanstack/react-query"
import { api } from "src/boot/axios"

export const QueryTest = () => {
  
  const { isLoading, error, data, isFetching } = useQuery(["users"], () => (
    api.get('user')
    .then((res) => res.data)
  ))

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>An error has occurred !</div>

  return (
    <div>
      123
    </div>
  )
}
