import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' 
import { SagnModel} from '@/ViewModel/SagnModel'
import { useContext, useState } from 'react'

config.autoAddCss = false

const App = ({ Component, pageProps }: AppProps) => {
  const sagnModel: SagnModel = SagnModel.createTestData()


  return (
      <Component {...pageProps} sagnModel={sagnModel} />
  )
}

export default App