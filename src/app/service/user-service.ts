import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {
  }

  create(user: User): Observable<User> {
    return this.httpClient.post<User>("/api/user", user);
  }

  update(user: User): Observable<User> {
    return this.httpClient.put<User>("/api/user", user);
  }

  getAllForCompanyId(companyId: number): Observable<User[]> {
    return this.httpClient.get<User[]>("/api/user/company/" + companyId);
  }

  getById(id: string): Observable<User> {
    return this.httpClient.get<User>("/api/user/" + id);
  }

  deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>("/api/user/" + id);
  }
}
