import Sagn from "@/objects/Sagn"

const now = new Date().getTime();
const tenDaysAgo = now - 10 * 24 * 60 * 60 * 1000;
const testData: Sagn[] = [
    {
      id:1,
      title: "First fortelling",
      text: "This is the first fortelling. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      tags: ["tag1", "tag2"],
      likes: 10,
      dislikes: 2,
      postedAt: new Date(tenDaysAgo + Math.random() * (now - tenDaysAgo)),
    },
    {
      id:2,
      title: "Second fortelling",
      text: "This is the second fortelling.",
      tags: ["tag2222", "tag3", "HIstorie"],
      likes: 5,
      dislikes: 1,
      postedAt: new Date(tenDaysAgo + Math.random() * (now - tenDaysAgo)),
    },
    {
      id:3,
      title: "Third fortelling",
      text: "This is the third fortelling. Maker including versions of Lorem Ipsum.",
      tags: ["tag1", "tag3"],
      likes: 8,
      dislikes: 3,
      postedAt: new Date(tenDaysAgo + Math.random() * (now - tenDaysAgo)),
    },
    {
      id:4,
      title: "4Th fortelling",
      text: "This is the first fortelling. Lorem Ipsum is simply dummy text of the printing and typesndard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      tags: ["tag1", "tag2","tag3","tag2222", "tag3", "HIstorie"],
      likes: 10,
      dislikes: 2,
      postedAt: new Date(tenDaysAgo + Math.random() * (now - tenDaysAgo)),
    },
    {
      id:5,
      title: "5th fortelling",
      text: "This is the second fortelling.",
      tags: ["tag2", "tag3"],
      likes: 5,
      dislikes: 1,
      postedAt: new Date(tenDaysAgo + Math.random() * (now - tenDaysAgo)),
    },
    {
      id:6,
      title: "6th fortelling",
      text: "This is the third fortelling.",
      tags: ["tag1", "tag3"],
      likes: 8,
      dislikes: 3,
      postedAt: new Date(tenDaysAgo + Math.random() * (now - tenDaysAgo)),
    },
  ]

export enum SortTypes{
    LIKES,
    CONTROVERSIAL,
    NEWFIRST,
    OLDFIRST,
    ID
}
export       type SortValue = {
  id: number
  sType: SortTypes
  text: string
}


class SagnListController {
    sagnList: Sagn[]
    sortType: SortTypes 
    sortObjects: SortValue[]

    constructor(){
        this.sagnList = this.fetchSagn()
        this.sortType = SortTypes.NEWFIRST
        this.sortObjects = [
          {id: 1, sType: SortTypes.LIKES, text:'Likes'},
          {id: 2, sType: SortTypes.CONTROVERSIAL, text:'Controversial'},
          {id: 3, sType: SortTypes.NEWFIRST, text:'New First'},
          {id: 4, sType: SortTypes.OLDFIRST, text:'Old First'},
        ]
    }

     sortSagn(sortType: SortTypes): Sagn[] {
      switch(sortType){
          case SortTypes.LIKES:{
            return this.sagnList.slice().sort((a, b) => b.likes - a.likes);
          }
          case SortTypes.CONTROVERSIAL:{
            return this.sagnList.slice().sort((a, b) => a.likes - b.likes);
          }
          case SortTypes.ID:{
            return this.sagnList.slice().sort((a, b) => a.id - b.id);
          }
          case SortTypes.NEWFIRST:{
            return this.sagnList.slice().sort((a, b) => b.postedAt.getUTCMilliseconds() - a.postedAt.getUTCMilliseconds());
          }
          case SortTypes.OLDFIRST:{
            return this.sagnList.slice().sort((a, b) => a.postedAt.getUTCMilliseconds() - b.postedAt.getUTCMilliseconds());
          }
          default: this.sagnList
      }
      return this.sagnList
    }

    fetchSagn():Sagn[] {
        return testData;
    }
}

export default SagnListController