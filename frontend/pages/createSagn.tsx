import Background from "@/components/background"
import NewSagnForm from "@/components/sagnForm/newSagnForm"
import { useContext } from "react"
import { AppContext } from "./_app"
import {useSession,signOut,getSession} from 'next-auth/react'


const CreateSagn = () =>{
    const {title, setTitle} = useContext(AppContext);
    setTitle("Lag nytt sagn")
    const{data:session,status}= useSession({required:true});
    
    return (
        <>
        <div id="editor" className="mt-5">
            <div className="w-full max-w-lg p-2 m-auto border-solid rounded">
                <h1 className="text-center font-semibold text-xl">Nytt Sagn</h1>
                <NewSagnForm className="flex flex-col"/>
            </div>
        </div>
        </>
    )
}

export default CreateSagn