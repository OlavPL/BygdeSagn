import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/header/header'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider, getSession, useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { setDefaultOptions } from 'date-fns'
import { nb } from 'date-fns/locale'
import CookiePopup from '@/components/cookiePopup'
import { AppContext, ContextInterface } from '@/components/appContext'
import Image from 'next/image'

const getDefaultOptions = require('date-fns/getDefaultOptions')
setDefaultOptions({locale: nb })

config.autoAddCss = false
interface MyAppProps extends AppProps {
  session: Session
}

const App = ({ Component, pageProps, session }: MyAppProps) => {
  const [title, setTitle] = useState<string>('');

  const contextValue: ContextInterface = {
    title,
    setTitle,
    userSession: undefined
  };

  return (
    <div className='bg-emphasis-100 text-textColor min-h-screen relative pb-20 overflow-hidden'>
    <SessionProvider session ={session}>

      <Image
        alt="background"
        className='absolute animate-float-slow pointer-events-none'
        src="frontend\images\FloaterBG.png"
        fill
      />

      <AppContext.Provider value={contextValue}>
        <div className=" text-textColor min-h-screen bg-center relative">
          <CookiePopup />
          <Header />
            <ToastContainer />  {/* Et ankerpunkt for toastify popup'ene i hele applikasjonen */}
          <Component {...pageProps} />
        </div>
      </AppContext.Provider>
    </SessionProvider>
    </div>
  )
}

export { AppContext };

export default App