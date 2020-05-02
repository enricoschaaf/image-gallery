import { AppProps } from "next/app"
import "../styles/index.css"

const App = ({ Component, pageProps }: AppProps) => (
  <div className="flex flex-col max-w-7xl mx-auto h-full">
    <div className="flex flex-col pt-4 sm:p-6 lg:p-8 h-full">
      <Component {...pageProps} />
    </div>
  </div>
)

export default App
