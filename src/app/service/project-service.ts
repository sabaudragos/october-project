import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../model/project";

@Injectable()
export class ProjectService {
  constructor(private httpClient: HttpClient) {
  }

  create(project: Project): Observable<Project> {
    return this.httpClient.post<Project>("/api/project", project);
  }

  update(project: Project): Observable<Project> {
    return this.httpClient.put<Project>("/api/project", project);
  }

  getAllForCompanyId(companyId: number): Observable<Project[]> {
    return this.httpClient.get<Project[]>("/api/project/company/" + companyId);
  }

  getById(id: string): Observable<Project> {
    return this.httpClient.get<Project>("/api/project/" + id);
  }

  deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>("/api/project/" + id);
  }
}
