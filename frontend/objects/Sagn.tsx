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
    title: String
    text: string;
    tags: string[];
    likes: number;
    dislikes: number;
    id?: string;
    postedAt?: Date;
}
class Sagn implements SagnI{
    title: string;
    text: string;
    tags: string[];
    likes: number;
    dislikes: number;
    id: string;
    postedAt: Date;


    constructor(_title: string, _text: string, _tags: string[],){
        this.title = _title
        this.text = _text
        this.tags = _tags
        this.likes = 0
        this.dislikes = 0
        this.id = ""
        this.postedAt = new Date(Date.now());
    }
}

export default Sagn
