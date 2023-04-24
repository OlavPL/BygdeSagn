export default interface FylkeSearchType {
    fylkeNavn:string
    kommuner:{
        KommuneNavn:string,
        stedsnavn:string[]
    }[]
}