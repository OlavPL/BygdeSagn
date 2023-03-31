import Fylke from "./Fylke";
import { Tag } from "./tag";


export  type SagnJSON = {
    title: string
    text: string;
    tags: Tag[];
    likes: [];
    dislikes: [];
    id?: string;
    postedAt: number;
    happenedAt?: number;
    author: string;
    fylke: Fylke;
    stedsnavn: string;
}