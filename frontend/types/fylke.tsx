import { Kommune } from "./kommune";

interface IFylke {
  fylkenavn: string;
  kommuner: Kommune[];
}

export class Fylke implements IFylke {
  fylkenavn: string;
  kommuner: Kommune[];

  constructor(fylkenavn: string, kommuner: Kommune[]) {
    this.fylkenavn = fylkenavn;
    this.kommuner = kommuner;
  }
}
