import { Tag } from "@/types/tag"
import Link from "next/link"
import CardTags from "./cardTags"
import router, { Router, useRouter } from "next/router"
import Sagn from "@/objects/sagn"
import { toast } from "react-toastify"
import { ToastType, getToastOptions } from "@/components/controller/toastController"

interface Props {
    title: String,
    text: string,
    tags: Tag[],
    sagn: Sagn

}
// Metode for å delte posts, kan legges til ved siden av Display av brukerens Posts ?
const Delete = async (postId:number) => {
  try {
    const response = await fetch(`/api/post/Post?postId=${postId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      toast.success("Sagn Slettet", getToastOptions(ToastType.light, "sagn deleted"));
      router.push("/profilePage");
    } else {
      console.error("Failed to delete post:", response.statusText);
    }
  } catch (error) {
    console.error("Failed to delete post:", error);
  }
    toast.success("Sagn Slettet", getToastOptions(ToastType.light, "sagn deleted"),)
    router.push("/profilePage")
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
                <div className="flex-row space-x-3">
                    <button className="flex items-center space-x-1 font-medium bg-red-200 hover:bg-red-400 w-full focus:outline-none rounded-md px-4 py-1.5"
                            onClick={() => Delete(sagn.postId)}
                    >
                      Slett
                    </button>
                </div>
            </div>
            <p className="inline-block line-clamp-3"> {text} </p>
        </div>
    )
}

export default UserSagnCard