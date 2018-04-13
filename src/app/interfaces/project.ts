import { Creator } from "./creator";

export interface Project {
  _id: string,
  name: string,
  creator: Array<Creator>
	codeProject: boolean,
	timesAdded: number,
	timesViewed: number
}
