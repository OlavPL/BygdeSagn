import { Tag } from "@/types/tag"
import Link from "next/link"
import CardTags from "./cardTags"
import router, { Router, useRouter } from "next/router"
import Sagn from "@/objects/sagn"
import { toast } from "react-toastify"

interface Props {
    title: String,
    text: string,
    tags: Tag[],
    sagn: Sagn

}
// Metode for å delte posts, kan legges til ved siden av Display av brukerens Posts ?
const Delete = async (postId:number) => {
    try {
        const response = await fetch("/api/post/deletePost", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId: postId }),
        });
        

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        console.error("Failed to delete post:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
    toast.success("Sagn Slettet", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
      toastId: "succsessful post"
    },)
    router.push("/profilePageNew")
  }


const UserSagnCard = ({title, text, tags, sagn}: Props) => {

    return (
        <div className="w-full flex flex-col p-2 md:mx-0  bg-white rounded-md shadow-md text-textColor space-y-2">
            <div className="flex flex-row justify-between w-full">
                <Link href={`/post/${encodeURIComponent(sagn.postId)}`} className=" box-content text-xl font-semibold line-clamp-1 md:max-w-x text-textColor">
                <h1 className="font-semibold text-lg">
                    {title}
                </h1>
                </Link>
                <div className="flex-row space-x-3 hidden lg:flex">
                    <CardTags tags={tags}/>
                    <button onClick={() => Delete(sagn.postId)}>Slett</button>
                    
                </div>
            </div>
            <p className="inline-block line-clamp-3"> {text} </p>
            <div className="flex flex-row-reverse space-x-reverse space-x-2 place-content-between p-2 lg:hidden">
                <CardTags tags={tags}/>
            </div>
        </div>
    )
}

export default UserSagnCard