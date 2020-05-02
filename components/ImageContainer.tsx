import { useEffect, useRef, useState } from "react"
import { Image } from "."

export const ImageContainer = ({ data }) => {
  const ref = useRef(null)
  const [offsetWidth, setOffsetWidth] = useState(null)
  useEffect(() => {
    if (ref.current) setOffsetWidth(ref.current.offsetWidth)
  }, [])

  const test = data.flat()
  const oneThirdLength = Math.floor(test.length / 3)
  const firstCol = test.slice(0, oneThirdLength)
  const secondCol = test.slice(oneThirdLength, 2 * oneThirdLength)
  const thirdCol = test.slice(2 * oneThirdLength, test.length)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 sm:row-gap-4 col-gap-4 sm:col-gap-6 lg:col-gap-8 sm:pb-6 lg:pb-8">
      <div
        className="space-y-4 sm:space-y-6 lg:space-y-8 mb-4 sm:mb-0"
        ref={ref}
      >
        {thirdCol.map(result => (
          <Image key={result.id} result={result} offsetWidth={offsetWidth} />
        ))}
      </div>
      <div className="space-y-4 sm:space-y-6 lg:space-y-8 mb-4 sm:mb-0">
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
