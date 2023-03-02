import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/header/Header'
import Footer from '@/components/Footer/Footer'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' 
import { SagnModel} from '@/ViewModel/SagnModel'
import { useContext, useState } from 'react'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

config.autoAddCss = false

const App = ({ Component, pageProps }: AppProps) => {
  const sagnModel: SagnModel = SagnModel.createTestData()


  return (
    <>
      <Header/> 
      
      <Component {...pageProps} sagnModel={sagnModel} />
      <Footer/>
    </>
  )
}

export default App