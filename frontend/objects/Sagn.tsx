import React, { Component } from 'react'
interface SagnI{
    title: String
    text: String;
    tags: string[];
    likes: number;
    dislikes: number;
    _id: number;
    postedAt: Date;
}
class Sagn implements SagnI{
    title: string;
    text: String;
    tags: string[];
    likes: number;
    dislikes: number;
    _id: number;
    postedAt: Date;


    constructor(_title: string, _text: string, _tags: string[],){
        this.title = _title
        this.text = _text
        this.tags = _tags
        this.likes = 0
        this.dislikes = 0
        this._id = 0
        this.postedAt = new Date(Date.now());
    }
    



}

export default Sagn
