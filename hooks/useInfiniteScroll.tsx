import { useEffect, useRef } from "react"

export const useInfiniteScroll = dispatch => {
  const ref = useRef(null)
  useEffect(() => {
    new IntersectionObserver(entries => {
      entries.forEach(() => {
        dispatch(count => count + 1)
      })
    }).observe(ref.current)
  }, [dispatch, ref])
  return { ref }
}
