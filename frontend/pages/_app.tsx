import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import{SessionProvider} from 'next-auth/react'
config.autoAddCss = false

import { Session } from 'next-auth'
import { createContext, useState } from 'react'
interface MyAppProps extends AppProps {
  session: Session
}

const AppContext = createContext<ContextInerface>(({
  title: "Tittel",
  setTitle: ()=>{}
}));

interface ContextInerface {
  title: string,
  setTitle: React.Dispatch<React.SetStateAction<string>>
}

const App = ({ Component, pageProps, session }: MyAppProps) => {
  const [title, setTitle] = useState<string>("");

  const contextValue: ContextInerface = {
    title,
    setTitle,
  };

  return (
    <SessionProvider session ={session}>
    <div className='bg-emphasis-100 text-textColor min-h-screen relative'>
    {/* <div className="bg-gradient-to-b from-eggBlue-200 to-white text-textColor min-h-screen relative"> */}
      <div className='absolute animate-float-slow pointer-events-none top-40' >
        <img alt="" src="https://res.cloudinary.com/zsa-technology/image/upload/f_auto/q_auto/v1/zsa-io-refactor-prod/hot-swappable-waves.png?_a=ATCqVAA0" srcSet="https://res.cloudinary.com/zsa-technology/image/upload/f_auto/q_auto/c_scale,w_405/v1/zsa-io-refactor-prod/hot-swappable-waves.png?_a=ATCqVAA0 405w, https://res.cloudinary.com/zsa-technology/image/upload/f_auto/q_auto/c_scale,w_810/v1/zsa-io-refactor-prod/hot-swappable-waves.png?_a=ATCqVAA0 810w, https://res.cloudinary.com/zsa-technology/image/upload/f_auto/q_auto/c_scale,w_1215/v1/zsa-io-refactor-prod/hot-swappable-waves.png?_a=ATCqVAA0 1215w, https://res.cloudinary.com/zsa-technology/image/upload/f_auto/q_auto/c_scale,w_1621/v1/zsa-io-refactor-prod/hot-swappable-waves.png?_a=ATCqVAA0 1621w, https://res.cloudinary.com/zsa-technology/image/upload/f_auto/q_auto/c_scale,w_810/v1/zsa-io-refactor-prod/hot-swappable-waves.png?_a=ATCqVAA0 810w, https://res.cloudinary.com/zsa-technology/image/upload/f_auto/q_auto/c_scale,w_1620/v1/zsa-io-refactor-prod/hot-swappable-waves.png?_a=ATCqVAA0 1620w, https://res.cloudinary.com/zsa-technology/image/upload/f_auto/q_auto/c_scale,w_2430/v1/zsa-io-refactor-prod/hot-swappable-waves.png?_a=ATCqVAA0 2430w, https://res.cloudinary.com/zsa-technology/image/upload/f_auto/q_auto/c_scale,w_3242/v1/zsa-io-refactor-prod/hot-swappable-waves.png?_a=ATCqVAA0 3242w" sizes="(max-width: 1621px) 100vw, 1621px" loading="lazy"/>
      </div>

      <AppContext.Provider value={contextValue}>
        <div className=" bg-cover text-textColor min-h-screen bg-center relative">
          <Header/>
          <Component {...pageProps} />
        </div>
          <Footer/>
      </AppContext.Provider>
    </div>
    </SessionProvider>
  )
}

export { AppContext};

export default App