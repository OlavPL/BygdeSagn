import { Tag } from '@/types/tag';
import { useState, useEffect } from 'react'

interface SagnI{
    title: string
    text: string;
    tags: string[];
    likes: number;
    dislikes: number;
    id?: string;
    postedAt?: number;
    happenedAt?: number;
    author: string;
    fylke: string;
    stedsnavn: string;
}
class Sagn implements SagnI{
    title: string;
    text: string;
    tags: string[];
    likes: number;
    dislikes: number;
    id: string;
    postedAt: number;
    happenedAt?: number;
    author: string;
    fylke: string;
    stedsnavn: string;


    constructor(title: string, text: string, tags: Tag[], postedAt: number, fylke: string, stedsnavn: string, 
                likes?: number, dislikes?: number, happenedAt?: number, author?: string, id?: string
    ){
        this.title = title
        this.text = text
        this.tags = tags
        this.likes = likes? likes : 0
        this.dislikes = dislikes? dislikes : 0
        this.id = id? id : ""
        this.postedAt = postedAt
        this.happenedAt = happenedAt
        this.author = author? author : "Ukjent"
        this.fylke = fylke;
        this.stedsnavn = stedsnavn;
    }
}

export default Sagn
