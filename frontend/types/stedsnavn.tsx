import { Kommune } from "./kommune";

interface IStedsnavn {
  kommune: Kommune;
  stedsnavn: string;
}

export class Stedsnavn implements IStedsnavn {
  kommune: Kommune;
  stedsnavn: string;

  constructor(kommune: Kommune, stedsnavn: string) {
    this.kommune = kommune;
    this.stedsnavn = stedsnavn;
  }
}