import { User } from "next-auth";
import Fylke from "./typFylke";
import Kommune from "./typKommune";
import { Tag } from "./tag";
import AppUser from '@/types/AppUser';

export  type SagnJSON = {
    title: string
    text: string;
    tags: Tag[];
    likes: LoginInfo[];
    dislikes: LoginInfo[];
    postId: number;
    postedAt: number;
    happenedAt?: number;
    author: string;
    kommune: Kommune;
    stedsnavn: string;
}