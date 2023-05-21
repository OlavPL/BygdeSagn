import { Kommune } from '@/types/kommune';
import { Tag } from '@/types/tag';
import AppUser from '@/types/AppUser';
import { LoginInfo } from '@/types/loginInfo';
import { Comment } from '@/types/comment';

export type SagnJSON = {
    _id: string
    title: string
    text: string;
    tags: Tag[];
    likes: LoginInfo[];
    dislikes: LoginInfo[];
    comments: Comment[];
    postedAt: number;
    happenedAt?: number;
    owner: AppUser;
    kommune: Kommune;
    stedsnavn: string;
}

class Sagn {
    _id: string
    title: string;
    text: string;
    tags: Tag[];
    likes: LoginInfo[];
    dislikes: LoginInfo[];
    comments: Comment[];
    postedAt: number;
    happenedAt?: number;
    owner: AppUser;
    kommune: Kommune;
    stedsnavn: string;
    dislikeRatioFlagged?: boolean


    constructor(_id: string, title: string, text: string, tags: Tag[], postedAt: number, kommune: Kommune, stedsnavn: string, owner: AppUser, 
                likes?: LoginInfo[], dislikes?: LoginInfo[],  comments?: Comment[],happenedAt?: number, dislikeRationFlagged?: boolean
    ){
        this._id = _id
        this.title = title
        this.text = text
        this.tags = tags
        this.likes = likes? likes : Array<LoginInfo>()
        this.dislikes = dislikes? dislikes : Array<LoginInfo>()
        this.comments = comments? comments : Array<Comment>()
        this.postedAt = postedAt
        this.happenedAt = happenedAt
        this.owner = owner 
        this.kommune = kommune;
        this.stedsnavn = stedsnavn;
        this.dislikeRatioFlagged = dislikeRationFlagged
    }
}

export default Sagn
