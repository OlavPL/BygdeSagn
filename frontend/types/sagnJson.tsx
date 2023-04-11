import { User } from "next-auth";
import Fylke from "./Fylke";
import Kommune from "./kommune";
import { Tag } from "./tag";
import AppUser from '@/types/AppUser';

export  type SagnJSON = {
    title: string
    text: string;
    tags: Tag[];
    likes: AppUser[];
    dislikes: AppUser[];
    postId: number;
    postedAt: number;
    happenedAt?: number;
    author: string;
    kommune: Kommune;
    stedsnavn: string;
}