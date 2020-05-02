import { useEffect, useRef, useState } from "react"

export const Image = ({ result, offsetWidth }) => {
  const [error, setError] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const current = ref.current
    return () => {
      if (current) {
        current.src = ""
      }
    }
  }, [])

  if (offsetWidth) {
    if (error) {
      return (
        <div
          style={{
            backgroundColor: result.color,
            height: Math.round(offsetWidth * (result.height / result.width)),
          }}
          className="shadow"
        />
      )
    }
    return (
      <img
        onError={() => setError(true)}
        ref={ref}
        style={{ backgroundColor: result.color, color: result.color }}
        width={offsetWidth}
        height={Math.round(offsetWidth * (result.height / result.width))}
        className="shadow"
        src={`${result.urls.raw}&auto=format&w=${offsetWidth}&dpr=${
          devicePixelRatio < 2 ? devicePixelRatio : 2
        }`}
        alt={result.alt_description}
        loading="lazy"
      />
    )
  }
  return null
}
