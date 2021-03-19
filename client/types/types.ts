export interface Resume {
  id: number;
  name: string;
  resumeFileUrl: string;
  dateSubmitted: string;
  winCount: number;
  lossCount: number;
}

export interface Mash {
  firstResume: Resume;
  secondResume: Resume;
}

export interface Result {
  id: number;
  winner: Resume;
  loser: Resume;
  dateSubmitted: string;
}
