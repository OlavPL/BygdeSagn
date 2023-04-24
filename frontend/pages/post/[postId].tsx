import Sagn from "@/objects/sagn";
import { Kommune } from "@/types/typKommune";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import clientPromise from "@/lib/mongodb";
import CardTags from "@/components/sagn1/sagnCard/cardTags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import LikeDislikeButtons from "@/components/sagn1/sagnCard/likeDislikeButtons";
import { format } from "date-fns";
import { ObjectId } from "mongodb";
import Comments from "@/components/comments";
const SagnFullView = (props:any) =>{
    const [sagn, setSagn] = useState<Sagn>() 
  
    useEffect(() => {
        const sagnProp = props.sagn
        console.log(sagnProp)
        if(props.sagn != null){
            setSagn(new Sagn(sagnProp._id, sagnProp.title, sagnProp.text, sagnProp.tags, sagnProp.postedAt, sagnProp.kommune, sagnProp.stedsnavn, sagnProp.owner, sagnProp.likes, sagnProp.dislikes, sagnProp.happenedAt))
        }
    }, [props.sagn])
    
    
    return (
        <div className="flex flex-col">
        {!sagn && 
            <div>
                <p className="text-center">Kunne ikke finne sagn</p>
            </div>
        }
        {sagn && 
            <div className="flex flex-col bg-emphasis-50 rounded-md max-w-screen-xl mx-2 mt-5 p-2 space-y-4 shadow-md self-center">
                <h2 className="text-xl font-bold text-center sm:text-start">{sagn.title}</h2>
                <p className="max-h-96 overflow-y-auto">{sagn.text}</p>
                <div className="flex flex-col sm:flex-row w-full">
                    <div className="flex flex-row">
                        <div className="flex flex-row mr-5">
                            <p ><FontAwesomeIcon className="w-5 mr-1 text-primary-600" icon={faClock} /> År:&nbsp;</p>
                            <p className=""> {sagn.happenedAt? sagn.happenedAt : "Ukjent"}</p>
                        </div>

                        <div className="flex flex-row mr-5">
                            <p ><FontAwesomeIcon className="w-5 mr-1 text-emphasis-600" icon={faLocationDot} /></p>
                            {sagn.stedsnavn && <p>{sagn.stedsnavn } i&nbsp;</p>}
                            <p>{sagn.kommune.kommunenavnNorsk} {sagn.kommune.fylkesnavn && (", " + sagn.kommune.fylkesnavn)}</p>
                        </div>
                    </div>
                    <CardTags className="sm:ml-auto mt-2" tags={sagn.tags}/>
                </div>


                <div className="flex flex-col xs:flex-row-reverse">
                    <LikeDislikeButtons likes={sagn.likes} dislikes={sagn.dislikes} _id={sagn._id} ></LikeDislikeButtons>
                    
                    <div className="flex flex-row w-auto mr-auto my-auto max-w-[290px]">
                        <span><FontAwesomeIcon className="w-5 mr-1" icon={faCircleUser} /></span>
                        <span className=""> {sagn.owner? sagn.owner.name : "Ukjent"}</span>
                        <span className="text-gray-500 mr-2">, { format(new Date(sagn.postedAt),'dd. MMMM /yy HH:MM')}</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <Comments _id={sagn._id} />
                </div>
            </div>
        }
        </div>
    );
};

export async function getServerSideProps(context: {params: { postId:string} }) {
    try {
        const {params} = context
        const postId = params.postId
        const client = await clientPromise;
        const db = client.db("App_Db");

        const response = await db
        .collection(process.env.POST_COLLECTION!)
        .findOne({_id: new ObjectId(postId)})

        return {
            props: {sagn: JSON.parse(JSON.stringify(response))}
        };
    } catch (e) {
        console.error(e);
    }

}

export default SagnFullView