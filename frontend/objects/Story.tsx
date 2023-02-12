class Story {
    private title: String;
    private text: String;

    constructor(title: String, text: String){
        this.title = title;
        this.text = text
    }

    get getTitle(): String {
        return this.title
    }
    get getText(): String{
        return this.text
    }

}

export default Story