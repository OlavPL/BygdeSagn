import { Tag } from "./tag";


export  type SagnJSON = {
    title: string
    text: string;
    tags: Tag[];
    likes: number;
    dislikes: number;
    id?: string;
    postedAt: number;
}