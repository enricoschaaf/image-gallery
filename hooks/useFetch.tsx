import { useEffect, useState } from "react"

export function useFetch(url: string) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    const controller = new AbortController()
    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => setError(error))
    return () => controller.abort()
  }, [url])
  return { data, error }
}
