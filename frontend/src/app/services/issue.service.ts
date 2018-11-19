import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Issue} from "../models/issue";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class IssueService {
  private uri = 'http://localhost:8080/issues';

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {
  }

  getIssues(): Observable<Issue[]> {
    return this.http.get(this.uri) as Observable<Issue[]>;
  }

  getIssue(id: string): Observable<Issue> {
    return this.http.get(`${this.uri}/${id}`) as Observable<Issue>;
  }

  updateIssue(issue: Issue): Observable<any> {
    return this.http.put(`${this.uri}/${issue._id}`, issue) as Observable<any>;
  }

  deleteIssue(id: string): Observable<any> {
    return this.http.delete(`${this.uri}/${id}`) as Observable<any>;
  }
}
