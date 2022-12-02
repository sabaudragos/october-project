import {Project} from "./project";
import {User} from "./user";
import {Status} from "./status";

export class Feature {
  id: number;
  title: string;
  description: string;
  project: Project;
  user: User;
  status: Status;
}


