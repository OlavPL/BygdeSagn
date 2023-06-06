import { Tag } from "@/types/tag"
import Link from "next/link"
import CardTags from "./cardTags"
import router, { Router, useRouter } from "next/router"
import Sagn from "@/objects/sagn"
import { toast } from "react-toastify"
import { ToastType, getToastOptions } from "@/controllers/toastController"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"

interface Props {
  title: String,
  _id: string,
  onDelete: (postId: string) => Promise<void>;
}

const UserSagnCard = ({ title, _id, onDelete }: Props) => {
  const handleDelete = async () => {
    await onDelete(_id);
  };

  return (
    <div className="w-full flex flex-col p-2 md:mx-0  bg-white rounded-md shadow-md text-textColor space-y-2">
      {/* <div className="flex flex-col justify-between w-full"> */}
        <Link href={`/post/${encodeURIComponent(_id)}`} className="flex my-auto text-xl font-semibold line-clamp-1 md:max-w-x text-textLink">
          <h1 className="font-semibold text-lg text-center mr-4">
            {title}
          </h1>
        </Link>
        <div className="flex flex-row justify-between">
          
          <Link href={`/updateSagn/${encodeURIComponent(_id)}`} className="flex items-center w-fit font-semibold line-clamp-1 md:max-w-x text-textLink">
            <button 
                className="flex items-center space-x-1 font-medium bg-blue-200 hover:bg-blue-400 text-textColor focus:outline-none rounded-md px-2 py-1"
              >
                <FontAwesomeIcon icon={faPen} className="w-6 h-6 cursor-pointer transition-colors duration-100 ease-in-out text-md" />
                Oppdater
            </button>
          </Link>
            
          <button 
            className="flex items-center space-x-1 font-medium bg-red-200 hover:bg-red-400 focus:outline-none rounded-md px-2 py-1"
            onClick={handleDelete}
          >
            Slett
          </button>
        </div>
      {/* </div> */}
    </div>
  );
};

export default UserSagnCard;
