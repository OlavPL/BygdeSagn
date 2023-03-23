import Image from "next/image"
import { useContext } from "react";
import { AppContext } from "./_app";

const ProfilePage = () => {
    const {title, setTitle} = useContext(AppContext);
    setTitle("Min Profil")
    return (
        <div>
            <h1 className="mt-10 text-center text-2xl font-bold ">Her finner du detaljer om din profil</h1>
        </div>
    )

}

export default ProfilePage