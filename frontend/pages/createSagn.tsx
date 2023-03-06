import Background from "@/components/background"
import NewSagnForm from "@/components/newSagnForm"


const createSagn = () =>{
    return (
        <>
        <div id="editor" className="mt-5 ">
            <div className="w-full max-w-lg p-2 m-auto border-solid rounded">
                <h1 className="text-center">Opprett Nytt Sagn</h1>
                <NewSagnForm className="flex flex-col"/>
            </div>
        </div>
        </>
    )
}

export default createSagn