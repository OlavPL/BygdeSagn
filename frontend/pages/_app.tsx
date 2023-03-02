import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/header/Header'
import Footer from '@/components/header/Footer'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' 

config.autoAddCss = false

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <>
      <Header/> 
      <Component {...pageProps} />
      <Footer/>
    </>
  )
}

export default App