import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Feature} from "../model/feature";

@Injectable()
export class FeatureService {
  constructor(private httpClient: HttpClient) {
  }

  create(feature: Feature): Observable<Feature> {
    return this.httpClient.post<Feature>("/api/feature", feature);
  }

  update(feature: Feature): Observable<Feature> {
    return this.httpClient.put<Feature>("/api/feature", feature);
  }

  getAllByProjectId(projectId: number): Observable<Feature[]> {
    return this.httpClient.get<Feature[]>("/api/feature/project/" + projectId);
  }

  getById(id: string): Observable<Feature> {
    return this.httpClient.get<Feature>("/api/feature/" + id);
  }

  deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>("/api/feature/" + id);
  }
}
