export const ImageComponent = ({ hit }) => {
  return (
    <img
      width={hit.imageWidth}
      height={hit.imageHeight}
      className="shadow w-full"
      src={hit.largeImageURL}
      alt={hit.tags}
      loading="lazy"
    />
  )
}
