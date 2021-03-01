export interface Resume {
  id: number;
  name: string;
  resumeFileUrl: string;
  dateSubmitted: string;
}

export interface Mash {
  firstResume: Resume;
  secondResume: Resume;
}
