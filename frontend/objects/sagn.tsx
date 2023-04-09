import Kommune from '@/types/Kommune';
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
    kommune: Kommune;
    stedsnavn?: string;
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
    kommune: Kommune;
    stedsnavn: string;


    constructor(title: string, text: string, tags: Tag[], postedAt: number, kommune: Kommune, stedsnavn: string, 
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
        this.kommune = kommune;
        this.stedsnavn = stedsnavn;
    }
}

export default Sagn
