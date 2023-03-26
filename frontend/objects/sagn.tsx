import { Tag } from '@/types/tag';
import { useState, useEffect } from 'react'

// interface SagnI{
//     _title: String
//     _text: string;
//     _tags: string[];
//     _likes: number;
//     _dislikes: number;
//     _id?: string;
//     _postedAt?: Date;
// }
// const Sagn = ({_title, _text, _tags, _likes, _dislikes,_id, _postedAt}: SagnI) =>{
//     const [title, setTitle] = useState(_title)
//     const [tags, settags] = useState(_text)
//     const [likes, setlikes] = useState(_likes)
//     const [dislikes, setdislikes] = useState(_dislikes)
//     const [id, setid] = useState(_id? _id : 0)
//     const [postedAt, setpostedAt] = useState( _postedAt? _postedAt : new Date(Date.now()) )
// }

interface SagnI{
    title: string
    text: string;
    tags: string[];
    likes: number;
    dislikes: number;
    id?: string;
    postedAt?: number;
}
class Sagn implements SagnI{
    title: string;
    text: string;
    tags: string[];
    likes: number;
    dislikes: number;
    id: string;
    postedAt: number;


    constructor(_title: string, _text: string, _tags: Tag[], postedAt: number, _likes?: number, _dislikes?: number){
        this.title = _title
        this.text = _text
        this.tags = _tags
        this.likes = _likes? _likes : 0
        this.dislikes = _dislikes? _dislikes : 0
        this.id = ""
        this.postedAt = postedAt;
    }
}

export default Sagn
