import { ImageComponent } from "."

export const ImageList = ({ data }) => {
  console.log(data)
  if (!data)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"></div>
    )
  if (data) {
    const oneThirdLength = Math.floor(data.hits.length / 3)
    const remainder = data.hits.length % 3
    const firstCol = data.hits.slice(0, oneThirdLength)
    const secondCol = data.hits.slice(oneThirdLength, 2 * oneThirdLength)
    const thirdCol = data.hits.slice(2 * oneThirdLength, data.hits.length)
    console.log(data.hits)
    console.log({ firstCol })
    console.log({ secondCol })
    console.log({ thirdCol })
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 col-gap-5">
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {firstCol.map((hit) => (
            <ImageComponent key={hit.id} hit={hit} />
          ))}
        </div>
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {secondCol.map((hit) => (
            <ImageComponent key={hit.id} hit={hit} />
          ))}
        </div>
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {thirdCol.map((hit) => (
            <ImageComponent key={hit.id} hit={hit} />
          ))}
        </div>
      </div>
    )
  }
}
