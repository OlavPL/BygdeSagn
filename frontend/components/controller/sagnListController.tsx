import Sagn from "@/objects/sagn";
import { SagnJSON } from "@/types/sagnJson";
import SagnType from "@/types/sagnType";

export enum SortTypes{
    LIKES_DESC = 'Mest likt',
    LIKES_ASC = 'Minst likt',
    POST_DATE_DESC = 'Nyest innlegg',
    POST_DATE_ASC = 'Eldst innlegg',
    HAPPENING_DATE_DESC = 'Nyest hendelse',
    HAPPENING_DATE_ASC = 'Eldst hendelse',
}

const sortChoises = [
  {id: 0, type: SortTypes.LIKES_DESC, text:'Mest likt'},
  {id: 1, type: SortTypes.LIKES_ASC, text:'Minst likt'},
  {id: 2, type: SortTypes.POST_DATE_DESC, text:'Nyest innlegg'},
  {id: 3, type: SortTypes.POST_DATE_ASC, text:'Eldst innlegg'},
  {id: 4, type: SortTypes.HAPPENING_DATE_DESC, text:'Nyest hendelse'},
  {id: 5, type: SortTypes.HAPPENING_DATE_ASC, text:'Eldst hendelse'},
]

export type SortValue = {
  id: number
  type: SortTypes
}


class SagnListController {
    sagnList: Sagn[]
    sortType: SortValue 
    sortObjects: SortValue[]

    constructor(data: SagnJSON[]){
      let newData: Sagn[] = []
      data.map(object => {
        newData.push(new Sagn(
          object.title, object.text, object.tags, object.postedAt, object.kommune, object.stedsnavn, object.postId,
           object.likes.length, object.dislikes.length, object.happenedAt, object.author
        ))
      })
      this.sagnList = newData;
      this.sortType = sortChoises[2]
      this.sortObjects = sortChoises
    }

     sortSagn(sortType: SortTypes): Sagn[] {
      switch(sortType){
          case SortTypes.LIKES_DESC:{
            return this.sagnList.slice().sort((a, b) => b.likes - a.likes);
          }
          case SortTypes.LIKES_ASC:{
            return this.sagnList.slice().sort((a, b) => a.likes - b.likes);
          }
          case SortTypes.POST_DATE_DESC:{
            return this.sagnList.slice().sort((a, b) => b.postedAt - a.postedAt);
          }
          case SortTypes.POST_DATE_ASC:{
            return this.sagnList.slice().sort((a, b) => a.postedAt - b.postedAt);
          }
          case SortTypes.HAPPENING_DATE_DESC:{
            return this.sagnList.slice().sort((a, b) => (b.happenedAt? b.happenedAt : 0)  - (a.happenedAt? a.happenedAt : 0));
          }
          case SortTypes.HAPPENING_DATE_ASC:{
            return this.sagnList.slice().sort( (a, b) => (a.happenedAt? a.happenedAt : 0)  - (b.happenedAt? b.happenedAt : 0));
          }
          default: this.sagnList
      }
      return this.sagnList
    }
}

export default SagnListController
