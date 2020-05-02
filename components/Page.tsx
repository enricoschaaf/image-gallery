import Head from "next/head"
import { useRouter } from "next/router"
import { MutableRefObject, useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery } from "react-query"
import { ImageContainer, Search } from "."
//@ts-ignore
import BlankCanvas from "../public/blank-canvas.svg"
//@ts-ignore
import ServerDown from "../public/server-down.svg"

function searchKeyboardShortcut(
  searchRef: MutableRefObject<HTMLInputElement>,
  e: KeyboardEvent
) {
  if (e.key === "/") {
    e.preventDefault()
    searchRef.current.focus()
  }
}

const fetchImages = async (input, page = 1) => {
  if (input === " ") {
    const res = await fetch(
      `https://api.unsplash.com/photos/?page=${page}&client_id=jcMNsi9XLMv8SE8mcoYq2cXu0JfuUrFh01IbonJSvAU`
    )
    return await res.json()
  }
  const res = await fetch(
    `https://api.unsplash.com/search/photos?page=${page}&query=${input}&client_id=jcMNsi9XLMv8SE8mcoYq2cXu0JfuUrFh01IbonJSvAU`
  )
  const { results } = await res.json()
  return results
}

const NoData = ({ setInput, searchRef }) => (
  <>
    <Head>
      <title>Image Gallery</title>
    </Head>
    <div className=" px-4 sm:px-0 pb-4 sm:pb-6 lg:pb-8">
      <Search searchRef={searchRef} setInput={setInput} />
    </div>
    <div className="flex flex-col flex-1 items-center space-y-4 sm:space-y-6 lg:space-y-8 justify-center">
      <BlankCanvas className="w-96 px-4 sm:px-0" />
      <span className="text-gray-600">
        Sorry, we couldn't find any matches.
      </span>
    </div>
  </>
)

const Error = ({ searchRef, setInput }) => (
  <>
    <Head>
      <title>Image Gallery</title>
    </Head>
    <div className=" px-4 sm:px-0 pb-4 sm:pb-6 lg:pb-8">
      <Search searchRef={searchRef} setInput={setInput} />
    </div>
    <div className="flex flex-col flex-1 items-center space-y-4 sm:space-y-6 lg:space-y-8 justify-center">
      <ServerDown className="w-96 px-4 sm:px-0" />
      <span className="text-gray-600">Oops! Something went wrong.</span>
    </div>
  </>
)

const Loading = ({ input, setInput, searchRef }) => (
  <>
    <Head>
      <title>
        {input !== ""
          ? `${input.charAt(0).toUpperCase()}${input.slice(1).toLowerCase()} - `
          : ""}
        Image Gallery
      </title>
    </Head>
    <div className=" px-4 sm:px-0 pb-4 sm:pb-6 lg:pb-8">
      <Search searchRef={searchRef} setInput={setInput} />
    </div>
  </>
)

export const Page = () => {
  const router = useRouter()
  const [input, setInput] = useState(null)
  const searchRef = useRef(null)

  const {
    status,
    data,
    fetchMore,
    //@ts-ignore
  } = useInfiniteQuery(input, fetchImages, {
    getFetchMore: (lastGroup, allGroups) => {
      if (lastGroup.length === 10) return allGroups.length + 1
    },
  })

  useEffect(() => {
    if (typeof router.query.search === "string") setInput(router.query.search)
    if (router.query.search === undefined) setInput(" ")
    window.addEventListener("keydown", e =>
      searchKeyboardShortcut(searchRef, e)
    )
    return () => {
      removeEventListener("keydown", () => searchKeyboardShortcut)
    }
  }, [router.query.search])

  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      fetchMore()
    }
  }, [inView])

  if (status === "loading")
    return <Loading input={input} searchRef={searchRef} setInput={setInput} />

  if (status === "error") {
    return <Error searchRef={searchRef} setInput={setInput} />
  }
  if (status === "success" && data.flat().length == 0)
    return <NoData searchRef={searchRef} setInput={setInput} />

  if (data)
    return (
      <>
        <Head>
          <title>
            {input
              ? `${input.charAt(0).toUpperCase()}${input
                  .slice(1)
                  .toLowerCase()} - `
              : ""}
            Image Gallery
          </title>
        </Head>
        <div className=" px-4 sm:px-0 pb-4 sm:pb-6 lg:pb-8">
          <Search searchRef={searchRef} setInput={setInput} />
        </div>
        <ImageContainer data={data} />
        <div ref={ref} className="mb-4" />
      </>
    )
}
