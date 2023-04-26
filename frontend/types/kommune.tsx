import { Stedsnavn } from "./stedsnavn";


interface IKommune{
    kommunenavn: string;
    kommunenavnNorsk: string;
    kommunenummer: string;
    stedsnavnList: Stedsnavn[];
    fylkesnavn: string;
    fylkesnummer: string;
}

export class Kommune implements IKommune{
    kommunenavn: string;
    kommunenavnNorsk: string;
    kommunenummer: string;
    stedsnavnList: Stedsnavn[];
    fylkesnavn: string;
    fylkesnummer: string;

    constructor(kommunenavn: string, kommunenavnNorsk: string, kommunenummer: string, stedsnavn: Stedsnavn[], fylkesnavn: string, fylkesnummer: string) {
        this.kommunenavn = kommunenavn;
        this.kommunenavnNorsk = kommunenavnNorsk;
        this.kommunenummer = kommunenummer;
        this.stedsnavnList = stedsnavn;
        this.fylkesnavn = fylkesnavn;
        this.fylkesnummer = fylkesnummer;
    }
}