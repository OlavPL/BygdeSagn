import Sagn from "@/objects/sagn";
import { SagnJSON } from "@/objects/sagn";

// Brukes til sortering av visning
export enum SortType{
    LIKES_DESC = 'Mest likt',
    LIKES_ASC = 'Minst likt',
    POST_DATE_DESC = 'Nyest innlegg',
    POST_DATE_ASC = 'Eldst innlegg',
    HAPPENING_DATE_DESC = 'Nyest hendelse',
    HAPPENING_DATE_ASC = 'Eldst hendelse',
}

//Brukes som sorteringsobjekter i sagnSortListBox
export const sortChoises = [
  {id: 0, type: SortType.LIKES_DESC, text:'Mest likt'},
  {id: 1, type: SortType.LIKES_ASC, text:'Minst likt'},
  {id: 2, type: SortType.POST_DATE_DESC, text:'Nyest opplastet'},
  {id: 3, type: SortType.POST_DATE_ASC, text:'Eldst opplastet'},
  {id: 4, type: SortType.HAPPENING_DATE_DESC, text:'Nyest hendelse'},
  {id: 5, type: SortType.HAPPENING_DATE_ASC, text:'Eldst hendelse'},
]

class SagnListController {
    sagnList: Sagn[]
    sortType: SortType

    constructor(data: SagnJSON[]){
      let newData: Sagn[] = []
      data.map(object => {
        newData.push(new Sagn( 
          object._id, object.title, object.text, object.tags, object.postedAt, object.kommune, object?.stedsnavn,
          object.owner, object.likes, object.dislikes, object.comments, object.happenedAt, 
        ))
        
      })
      this.sagnList = newData;
      this.sortType = SortType.POST_DATE_DESC
    }

     sortSagn(sagnList: Sagn[] ,sortType: SortType): Sagn[] {
      switch(sortType){
          case SortType.LIKES_DESC:{
            return sagnList.slice().sort((a, b) => b.likes.length - a.likes.length);
          }
          case SortType.LIKES_ASC:{
            return sagnList.slice().sort((a, b) => a.likes.length - b.likes.length);
          }
          case SortType.POST_DATE_DESC:{
            return sagnList.slice().sort((a, b) => b.postedAt - a.postedAt);
          }
          case SortType.POST_DATE_ASC:{
            return sagnList.slice().sort((a, b) => a.postedAt - b.postedAt);
          }
          case SortType.HAPPENING_DATE_DESC:{
            return sagnList.slice().sort((a, b) => (b.happenedAt? b.happenedAt : 0)  - (a.happenedAt? a.happenedAt : 0));
          }
          case SortType.HAPPENING_DATE_ASC:{
            return sagnList.slice().sort( (a, b) => (a.happenedAt? a.happenedAt : 0)  - (b.happenedAt? b.happenedAt : 0));
          }
          default: sagnList
      }
      return sagnList
    }
}

export default SagnListController
