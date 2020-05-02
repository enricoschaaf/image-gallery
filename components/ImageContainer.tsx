import { useEffect, useRef, useState } from "react"
import { Image } from "."

export const ImageContainer = ({ data }) => {
  const ref = useRef(null)
  const [offsetWidth, setOffsetWidth] = useState(null)
  useEffect(() => {
    if (ref.current) setOffsetWidth(ref.current.offsetWidth)
  }, [])

  const oneThirdLength = Math.floor(data.length / 3)
  const remainder = data.length % 3
  const firstCol = data.slice(0, oneThirdLength)
  const secondCol = data.slice(oneThirdLength, 2 * oneThirdLength)
  const thirdCol = data.slice(2 * oneThirdLength, data.length)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 row-gap-4 sm:row-gap-4 col-gap-4 sm:col-gap-6 lg:col-gap-8">
      <div className="space-y-4 sm:space-y-6 lg:space-y-8" ref={ref}>
        {thirdCol.map(result => (
          <Image key={result.id} result={result} offsetWidth={offsetWidth} />
        ))}
      </div>
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        {secondCol.map(result => (
          <Image key={result.id} result={result} offsetWidth={offsetWidth} />
        ))}
      </div>
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        {firstCol.map(result => (
          <Image key={result.id} result={result} offsetWidth={offsetWidth} />
        ))}
      </div>
    </div>
  )
}
