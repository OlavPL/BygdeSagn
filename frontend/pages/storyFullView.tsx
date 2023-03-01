import Link from "next/link"
import { useState } from "react"
import 'react-quill/dist/quill.snow.css';
import { Dropdown, Textarea } from "@nextui-org/react";
import TagsListBox from "@/components/tagsListBox";
import Input from "@/components/Input";
import NewSagnForm from "@/components/NewSagnForm";

const StoryFullView = () => {
    const [value, setValue] = useState('')

    return (
    <div className="flex flex-col bg-gradient-to-b from-plantation-200 to-primary-200 min-h-screen items-center">
        <Link href={"/"} className="flex text-blue-500 p-2 mt-10 place-content-center">Go Back</Link>
        
        <div className="w-full max-w-lg p-2">
            <div className="">
                <NewSagnForm className="flex flex-col"/>
            </div>
        </div>
    </div>
    )

}

export default StoryFullView