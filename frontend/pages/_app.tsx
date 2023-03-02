import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/header/header'
import Footer from '@/components/Footer/footer'
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