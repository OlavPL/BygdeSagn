import Kommune from '@/types/kommune';
import { Tag } from '@/types/tag';
import { useState, useEffect } from 'react'

interface SagnI{
    title: string
    text: string;
    tags: Tag[];
    likes: LoginInfo[];
    dislikes: LoginInfo[];
    postId: number;
    postedAt?: number;
    happenedAt?: number;
    author: string;
    kommune: Kommune;
    stedsnavn?: string;
}
class Sagn implements SagnI{
    title: string;
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


    constructor(title: string, text: string, tags: Tag[], postedAt: number, kommune: Kommune, stedsnavn: string, postId: number, 
                likes?: LoginInfo[], dislikes?: LoginInfo[], happenedAt?: number, author?: string
    ){
        this.title = title
        this.text = text
        this.tags = tags
        this.likes = likes? likes : Array<LoginInfo>()
        this.dislikes = dislikes? dislikes : Array<LoginInfo>()
        this.postId = postId
        this.postedAt = postedAt
        this.happenedAt = happenedAt
        this.author = author? author : "Ukjent"
        this.kommune = kommune;
        this.stedsnavn = stedsnavn;
    }
}

export default Sagn
