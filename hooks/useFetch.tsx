import { useEffect, useState } from "react"

export function useFetch(key: string, url: string) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (key) {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => setError(error))
      setLoading(false)
    }
  }, [url])
  return [loading, error, data]
}
