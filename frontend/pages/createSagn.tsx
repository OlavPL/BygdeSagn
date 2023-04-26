import NewSagnForm from "@/components/sagn1/sagnForm/newSagnForm";
import { useContext, useEffect } from "react"
import { AppContext } from "./_app"


const CreateSagn = () =>{
    const {title, setTitle} = useContext(AppContext);
    // const{data:session,status}= useSession({required:true});

    useEffect(() => {
      setTitle("Lag nytt sagn");
    }, [setTitle])
    
    
    return (
        <div className="w-full mt-5 max-w-2xl p-2 m-auto border-solid rounded">
            <h1 className="text-center font-semibold text-xl">Nytt Sagn</h1>
            <NewSagnForm className=""/>
        </div>
    )
}

export default CreateSagn