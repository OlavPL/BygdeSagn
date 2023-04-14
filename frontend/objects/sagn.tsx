import Kommune from '@/types/typKommune';
import { Tag } from '@/types/tag';
import AppUser from '@/types/AppUser';

export type SagnJSON = {
    title: string
    text: string;
    tags: Tag[];
    likes: LoginInfo[];
    dislikes: LoginInfo[];
    postId: number;
    postedAt: number;
    happenedAt?: number;
    owner: AppUser;
    kommune: Kommune;
    stedsnavn: string;
}

interface SagnI{
    title: string
    text: string;
    tags: Tag[];
    likes: LoginInfo[];
    dislikes: LoginInfo[];
    postId: number;
    postedAt?: number;
    happenedAt?: number;
    owner: AppUser;
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
    owner: AppUser;
    kommune: Kommune;
    stedsnavn: string;


    constructor(title: string, text: string, tags: Tag[], postedAt: number, kommune: Kommune, stedsnavn: string, postId: number, 
                likes?: LoginInfo[], dislikes?: LoginInfo[], happenedAt?: number, owner: AppUser
    ){
        this.title = title
        this.text = text
        this.tags = tags
        this.likes = likes? likes : Array<LoginInfo>()
        this.dislikes = dislikes? dislikes : Array<LoginInfo>()
        this.postId = postId
        this.postedAt = postedAt
        this.happenedAt = happenedAt
        this.owner = owner 
        this.kommune = kommune;
        this.stedsnavn = stedsnavn;
    }
}

export default Sagn
