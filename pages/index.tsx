import Head from "next/head"
import { Page } from "../components"

const Index = () => {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="https://api.unsplash.com/photos/?page=1&client_id=1aPC6HMbXRHmh4fY6QzSpY7OKhWf3x1zmx9NnNf8qKw"
          as="fetch"
          crossOrigin="anonymous"
        />
      </Head>
      <Page />
    </>
  )
}

export default Index
