import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Company} from "../model/company";

@Injectable()
export class CompanyService {
  constructor(private httpClient: HttpClient) {
  }

  create(company: Company): Observable<Company> {
    return this.httpClient.post<Company>("/api/company", company);
  }

  update(company: Company): Observable<Company> {
    return this.httpClient.put<Company>("/api/company", company);
  }

  getAll(): Observable<Company[]> {
    return this.httpClient.get<Company[]>("/api/company/all");
  }

  getById(id: string): Observable<Company> {
    return this.httpClient.get<Company>("/api/company/" + id);
  }
}
