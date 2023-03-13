import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' 
import { AppWrapper } from "../context/state"

import{SessionProvider} from 'next-auth/react'
config.autoAddCss = false

import { Session } from 'next-auth'
interface MyAppProps extends AppProps {
  session: Session
}

const App = ({ Component, pageProps, session }: MyAppProps) => {

  return (
    <SessionProvider session ={session}>
      {/* <div className="bg-gradient-to-b from-eggBlue-200 to-white text-textColor min-h-screen relative"> */}
      <div className="bg-secondary-100  text-textColor min-h-screen relative">
        <Header/> 
        <Component {...pageProps} />
      </div>
        <Footer/>
    </SessionProvider>
  )
}

export default App