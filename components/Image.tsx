import { useEffect, useRef } from "react"

export const Image = ({ result, offsetWidth }) => {
  const ref = useRef(null)
  useEffect(() => {
    const current = ref.current
    return () => (current.src = "")
  }, [])

  if (offsetWidth) {
    return (
      <img
        ref={ref}
        style={{ backgroundColor: result.color, color: result.color }}
        width={offsetWidth}
        height={Math.round(offsetWidth * (result.height / result.width))}
        className="shadow"
        src={`${result.urls.raw}&auto=format&w=${offsetWidth}&dpr=${devicePixelRatio}`}
        alt={result.alt_description}
        loading="lazy"
      />
    )
  }
  return <div></div>
}
