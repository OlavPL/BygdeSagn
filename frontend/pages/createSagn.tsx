import NewSagnForm from "@/components/NewSagnForm"


const createSagn = () =>{
    return (
        <>
        <div id="editor" className="mt-5">
            <div className="w-full max-w-lg p-2 m-auto shadow-md">
                <div className="">
                    <NewSagnForm className="flex flex-col"/>
                </div>
            </div>
        </div>
        </>
    )
}

export default createSagn