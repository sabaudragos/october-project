import {Project} from "./project";
import {User} from "./user";

export class Feature {
  id: number;
  title: string;
  description: string;
  project: Project;
  user: User;
}


