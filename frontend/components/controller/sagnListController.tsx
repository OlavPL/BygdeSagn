import Sagn from "@/objects/sagn";
import { SagnJSON } from "@/types/sagnJson";
import SagnType from "@/types/sagnType";

export enum SortTypes{
    LIKES,
    CONTROVERSIAL,
    NEWFIRST,
    OLDFIRST,
    ID
}

const sortChoises = [
  {id: 1, type: SortTypes.LIKES, text:'Mest likt'},
  {id: 2, type: SortTypes.CONTROVERSIAL, text:'Kontroversielle'},
  {id: 3, type: SortTypes.NEWFIRST, text:'Nyest først'},
  {id: 4, type: SortTypes.OLDFIRST, text:'Eldst først'},
]

export type SortValue = {
  id: number
  type: SortTypes
  text: string
}


class SagnListController {
    sagnList: Sagn[]
    sortType: SortValue 
    sortObjects: SortValue[]

    constructor(data: SagnJSON[]){
      let newData: Sagn[] = []
      data.map(object => {
        newData.push(new Sagn(object.title, object.text, object.tags, object.postedAt, object.likes, object.dislikes))
      })
      this.sagnList = newData;
      this.sortType = sortChoises[2]
      this.sortObjects = sortChoises
    }

     sortSagn(sortType: SortTypes): Sagn[] {
      switch(sortType){
          case SortTypes.LIKES:{
            return this.sagnList.slice().sort((a, b) => b.likes - a.likes);
          }
          case SortTypes.CONTROVERSIAL:{
            return this.sagnList.slice().sort((a, b) => a.likes - b.likes);
          }
          case SortTypes.NEWFIRST:{
            return this.sagnList.slice().sort((a, b) => a.postedAt.getMilliseconds() - b.postedAt.getMilliseconds());
          }
          case SortTypes.OLDFIRST:{
            return this.sagnList.slice().sort((a, b) => b.postedAt.getMilliseconds() - a.postedAt.getMilliseconds());
          }
          default: this.sagnList
      }
      return this.sagnList
    }
}

export default SagnListController