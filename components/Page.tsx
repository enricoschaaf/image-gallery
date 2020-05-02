import Head from "next/head"
import { useRouter } from "next/router"
import { MutableRefObject, useEffect, useRef, useState } from "react"
import { ImageContainer, Search } from "."
import { useFetch, useInfiniteScroll } from "../hooks"
import BlankCanvas from "../public/blank-canvas.svg"

function searchKeyboardShortcut(
  searchRef: MutableRefObject<HTMLInputElement>,
  e: KeyboardEvent
) {
  if (e.key === "/") {
    e.preventDefault()
    searchRef.current.focus()
  }
}

export const Page = () => {
  const router = useRouter()
  const [input, setInput] = useState("")
  const [count, setCount] = useState(1)
  const searchRef = useRef(null)
  useEffect(() => {
    if (typeof router.query.search === "string") setInput(router.query.search)
    window.addEventListener("keydown", e =>
      searchKeyboardShortcut(searchRef, e)
    )
    return () => {
      removeEventListener("keydown", e => searchKeyboardShortcut(searchRef, e))
    }
  }, [router.query.search])
  const { data } = useFetch(
    input === ""
      ? `https://api.unsplash.com/photos/?page=1&client_id=1aPC6HMbXRHmh4fY6QzSpY7OKhWf3x1zmx9NnNf8qKw`
      : `https://api.unsplash.com/search/photos?page=${count}&query=${input}&client_id=1aPC6HMbXRHmh4fY6QzSpY7OKhWf3x1zmx9NnNf8qKw`
  )
  const { ref } = useInfiniteScroll(setCount)
  return (
    <>
      <Head>
        <title>
          {input !== ""
            ? `${input.charAt(0).toUpperCase()}${input
                .slice(1)
                .toLowerCase()} - `
            : ""}
          Image Gallery
        </title>
      </Head>
      <div className="flex flex-col max-w-7xl mx-auto h-full">
        <div className="pt-4 sm:p-6 lg:p-8">
          <div className="pb-4 px-4 sm:px-0 sm:pb-6 lg:pb-8">
            <Search searchRef={searchRef} setInput={setInput} />
          </div>
          {data === null ? (
            <div>
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
              </svg>
            </div>
          ) : Array.isArray(data) ? (
            <ImageContainer data={data} />
          ) : data.results?.length > 0 ? (
            <ImageContainer data={data.results} />
          ) : (
            <div className="flex flex-col flex-1 justify-center space-y-4 sm:space-y-6 lg:space-y-8">
              <BlankCanvas />
              <span className="text-center text-gray-600">
                Sorry, we couldn't find any matches.
              </span>
            </div>
          )}
        </div>
      </div>
      <div ref={ref} style={{ border: "1px solid red" }}></div>
    </>
  )
}
