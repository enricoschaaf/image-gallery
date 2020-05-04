import Head from "next/head"
import { Page } from "../components"

const Index = () => {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href={`https://api.unsplash.com/photos/?page=1&client_id=${process.env.CLIENT_ID}`}
          as="fetch"
          crossOrigin="anonymous"
        />
      </Head>
      <Page />
    </>
  )
}

export default Index
