import Sagn from "@/objects/Sagn"

const testData: Sagn[] = [
  {
    title: "First fortelling",
    text: "This is the first fortelling. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    tags: ["tag1", "tag2"],
    likes: 10,
    dislikes: 2,
  },
  {
    title: "Second fortelling",
    text: "This is the second fortelling.",
    tags: ["tag2222", "tag3", "HIstorie"],
    likes: 5,
    dislikes: 1,
  },
  {
    title: "Third fortelling",
    text: "This is the third fortelling. Maker including versions of Lorem Ipsum.",
    tags: ["tag1", "tag3"],
    likes: 8,
    dislikes: 3,
  },
  {
    title: "4Th fortelling",
    text: "This is the first fortelling. Lorem Ipsum is simply dummy text of the printing and typesndard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    tags: ["tag1", "tag2","tag3","tag2222", "tag3", "HIstorie"],
    likes: 10,
    dislikes: 2,
  },
  {
    title: "5th fortelling",
    text: "This is the second fortelling.",
    tags: ["tag2", "tag3"],
    likes: 5,
    dislikes: 1,
  },
  {
    title: "6th fortelling",
    text: "This is the third fortelling.",
    tags: ["tag1", "tag3"],
    likes: 8,
    dislikes: 3,
  },
]

export interface SagnModelInterface {
    sagnList: Sagn[]
    sortDateDesc: (list:Sagn[]) => Sagn[]
    sortDateAsc: (list:Sagn[]) => Sagn[]
    sortLikes: {}
    sortDislikes: (list:Sagn[]) => Sagn[]
}

export class SagnModel implements SagnModelInterface{
  sagnList: Sagn[]

  constructor(_sagnList: Sagn[]) {
    this.sagnList = _sagnList
  }

  sortLikes() {
    console.log(this.sagnList)
    this.sagnList.sort((a, b) => b.likes - a.likes)
    console.log(this.sagnList)
  }

  sortDislikes(list: Sagn[]): Sagn[]{
    return list.slice().sort((a, b) => b.dislikes - a.dislikes);
  }

  sortDateAsc(list: Sagn[]): Sagn[] {
      return list.slice().sort((a, b) => a.postedAt.getUTCMilliseconds() - b.postedAt.getUTCMilliseconds());
  }

  sortDateDesc(list: Sagn[]) {
      return list.slice().sort((a, b) => b.postedAt.getUTCMilliseconds() - a.postedAt.getUTCMilliseconds());
  }

  static createTestData(){
    return new SagnModel(testData)
  }
  
}

