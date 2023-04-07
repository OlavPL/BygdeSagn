import Sagn from "@/objects/sagn";
import Kommune from "@/types/Kommune";

interface Props {
    title: string
    text: string;
    tags: string[];
    likes: number;
    dislikes: number;
    id?: string;
    postedAt: number;
    happenedAt?: number;
    author: string;
    kommune: Kommune;
    stedsnavn?: string;
}

const SagnFullView = (sagn: Sagn ) =>{
    const {title, text, tags, likes, dislikes, postedAt, kommune, stedsnavn, happenedAt, author} = sagn;
    
    return (
        <div className="p-4 border rounded-md">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{new Date(postedAt).toLocaleString()}</p>
        <p className="text-lg mb-4">{text}</p>
        <p className="text-gray-600 mb-4">Tags: {tags.join(', ')}</p>
        <p className="text-gray-600 mb-4">Kommune: {kommune.kommunenavnNorsk}</p>
        <p className="text-gray-600 mb-4">Stedsnavn: {stedsnavn}</p>
        <div className="flex space-x-4">
            <p className="text-green-500 font-bold">Likes: {likes}</p>
            <p className="text-red-500 font-bold">Dislikes: {dislikes}</p>
        </div>
        <p className="text-gray-600 mb-4">Happened at: {happenedAt? new Date(happenedAt).toLocaleString() : "Ukjent"}</p>
        <p className="text-gray-600">Author: {author}</p>
        </div>
    );
};

export default SagnFullView