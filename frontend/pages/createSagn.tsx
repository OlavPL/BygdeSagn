import NewSagnForm from "@/components/NewSagnForm"


const createSagn = () =>{
    return (
        <>
        <div id="editor">
            <div className="w-full max-w-lg p-2">
                <div className="">
                    <NewSagnForm className="flex flex-col"/>
                </div>
            </div>
        </div>
        </>
    )
}

export default createSagn