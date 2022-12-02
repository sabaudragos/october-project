import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Status} from "../model/status";

@Injectable()
export class StatusService {
  constructor(private httpClient: HttpClient) {
  }

  create(status: Status): Observable<Status> {
    return this.httpClient.post<Status>("/api/status", status);
  }

  update(status: Status): Observable<Status> {
    return this.httpClient.put<Status>("/api/status", status);
  }

  getAllByProjectId(projectId: number): Observable<Status[]> {
    return this.httpClient.get<Status[]>("/api/status/project/" + projectId);
  }

  getById(id: string): Observable<Status> {
    return this.httpClient.get<Status>("/api/status/" + id);
  }

  deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>("/api/status/" + id);
  }
}
