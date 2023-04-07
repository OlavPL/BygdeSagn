import Fylke from "./Fylke";
import Kommune from "./Kommune";
import { Tag } from "./tag";


export  type SagnJSON = {
    title: string
    text: string;
    tags: Tag[];
    likes: [];
    dislikes: [];
    postId: number;
    postedAt: number;
    happenedAt?: number;
    author: string;
    kommune: Kommune;
    stedsnavn: string;
}