import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' 

config.autoAddCss = false

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <>
      {/* <div className="bg-gradient-to-b from-eggBlue-200 to-white text-textColor min-h-screen relative"> */}
      <div className="bg-secondary-100  text-textColor min-h-screen relative">
        <Header/> 
        <Component {...pageProps} />
      </div>
        <Footer/>
    </>
  )
}

export default App