import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import { ImageList, Search } from "../components"
import { useFetch } from "../hooks"

const Index = () => {
  const search = useRef(null)
  const [input, setInput] = useState(null)
  const [loading, error, data] = useFetch(
    input,
    `https://pixabay.com/api/?key=16306894-fc419582821a076f9b7cfe2da&qs&image_type=photo&q=${input}`
  )

  function searchKeyboardShortcut(e: KeyboardEvent) {
    if (e.key === "/") {
      e.preventDefault()
      search.current.focus()
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", searchKeyboardShortcut)
    return () => {
      removeEventListener("keydown", searchKeyboardShortcut)
    }
  }, [])
  return (
    <>
      <Head>
        <title>Image Gallery</title>
      </Head>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="pb-4 sm:pb-6 lg:pb-8">
          <Search searchRef={search} setInput={setInput} />
        </div>
        <ImageList data={data} />
      </div>
    </>
  )
}

export default Index
