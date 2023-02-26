import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/header/Header'
import Footer from '@/components/header/Footer'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' 
import { SagnModel} from '@/ViewModel/SagnModel'
import { NextUIProvider } from '@nextui-org/react';

config.autoAddCss = false

const App = ({ Component, pageProps }: AppProps) => {
  const sagnModel: SagnModel = SagnModel.createTestData()


  return (
    <>
      <Header/> 
      <NextUIProvider>
      <Component {...pageProps} sagnModel={sagnModel} />
      </NextUIProvider>
      {/* <Footer/> */}
    </>
  )
}

export default App