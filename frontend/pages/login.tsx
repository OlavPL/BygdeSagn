import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import Link from 'next/link'
import { getProviders, signIn, getCsrfToken } from "next-auth/react"
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import { ToastType, getToastOptions } from "@/controllers/toastController"
import Cookies from "js-cookie"
import CookiePopup from "@/components/cookiePopup"

// Definerer login komponent som gir csrfToken roms props. 
export default function Login({ providers, csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // useState satt til false, hvis true så kommer det en popup 
  const [showCookiePopup, setShowCookiePopup] = useState(false)
 
  // Rendrer login form
  return (
    <div className="flex flex-col items-center mt-20 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full ">
        <div className="font-bold text-4xl flex justify-center min-w-full">
            <span className="text-primary-90 ">Bygde</span><span className="drop-shadow-md text-primary-400">Sagn</span>
        </div>
        <form method="post" action="/api/auth/callback/credentials">
          {/* CSRF token som er lagret inn i et gjemt input felt innen "form method="post" " */}
          <input name="csrfToken" type="hidden" defaultValue={csrfToken}/>
            {/* Epost */}
            <label className="block text-gray-700 font-bold mb-2 w-full relative ">
              Email
              <div className="flex border-gray-400 rounded w-full focus-within:border-blue-500 border-2">
                <span className="p-2 rounded rounded-r-none border-r-0">
                  <FontAwesomeIcon icon={faEnvelope} size="lg" />
                </span>
                <input 
                  className="grow rounded-l-none bg-white focus:outline-none border-l-0 rounded placeholder-textColor placeholder-opacity-50 w-full"
                  name="email"
                  type="text"
                  placeholder="Enter your email..."/>
              </div>
            </label>
            
            {/* Passord */}
            <label className="block text-gray-700 font-bold mb-2 w-full relative">
              Password
              <div className="flex border-gray-400 rounded w-full focus-within:border-blue-500 border-2">
                <span className="p-2 rounded rounded-r-none border-r-0">
                  <FontAwesomeIcon icon={faLock} size="lg" />
                </span>
                <input
                  className="grow rounded-l-none bg-white focus:outline-none border-l-0 rounded placeholder-textColor placeholder-opacity-50 w-full"
                  name="password"
                  type="password"
                  placeholder="Skriv inn Passord"
                />
              </div>
            </label>
          
            {/* Login med bruker knapp */}
            <button className="w-full text-white bg-primary-400 hover:bg-primary-600 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 my-2"
              type="submit">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Login med bruker
            </button>

            <div className="flex items-center">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-3 text-gray-600">Eller</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Login med Google knapp */}
            <button className="w-full text-white bg-primary-400 hover:bg-primary-600 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 my-2"
              type="button" 
              onClick={() => { 
                if(Cookies.get("cookieAcceptance") === ("1") || Cookies.get("cookieAcceptance") === ("0") )
                  signIn("google")
                else{
                  setShowCookiePopup(true)
                  toast.error("For å logge inn må du bekrefte at vi kan bruke ditt google navn og epost", getToastOptions(ToastType.light, "need_gdpr_accept"))
                }
              }}
            >
              <FontAwesomeIcon icon={faGoogle} className="mr-2" />
              Login med Google
            </button>
        </form>
        <div className = "w-full text-right">
          <p className="text-sm text-gray-500">Har du ikke bruker? <Link href="/register" className ="text-primary-400 hover:underline hover:text-primary-500 cursor-pointer ">Registrer her</Link></p>
        </div>
      </div>
      <CookiePopup 
        stateValue={showCookiePopup}
        setStateValue={(e) => setShowCookiePopup(e)}/>
    </div>
  )
}




export async function getServerSideProps(context: GetServerSidePropsContext) {
 
  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)
  
  return {
    props: { providers: providers ?? [], csrfToken },
  }
}
