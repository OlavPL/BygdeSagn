import AppUser from '@/types/AppUser';
import Kommune from '@/types/Kommune';
import { Tag } from '@/types/tag';

interface SagnI{
    title: string
    text: string;
    tags: string[];
    likes: AppUser[];
    dislikes: AppUser[];
    postID: number;
    postedAt?: number;
    happenedAt?: number;
    author: string;
    kommune: Kommune;
    stedsnavn?: string;
    year?: number;
}
class Sagn implements SagnI{
    title: string;
    text: string;
    tags: Tag[];
    likes: AppUser[]
    dislikes: AppUser[];
    postID: number;
    postedAt: number;
    happenedAt?: number;
    author: string;
    kommune: Kommune;
    stedsnavn: string;
    year?: number;


    constructor(title: string, text: string, tags: Tag[], postedAt: number, kommune: Kommune, stedsnavn: string, postID: number,
                likes?: AppUser[], dislikes?: AppUser[], happenedAt?: number, author?: string,  year?: number
    ){
        this.title = title
        this.text = text
        this.tags = tags
        this.likes = likes? likes : []
        this.dislikes = dislikes? dislikes : []
        this.postID = postID 
        this.postedAt = postedAt
        this.happenedAt = happenedAt
        this.author = author? author : "Ukjent"
        this.kommune = kommune;
        this.stedsnavn = stedsnavn;
        this.year = year
    }
}

export default Sagn
