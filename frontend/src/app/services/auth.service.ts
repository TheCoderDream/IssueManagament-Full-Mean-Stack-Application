import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class AuthService {

  private uri = 'http://localhost:8080/auth';
  public token;

  constructor(
    private http: HttpClient,

  ) {}

  signUp(body: {email: string, name: string, password}): Observable<any> {
    return this.http.put(`${this.uri}/signup`,body );
  }

  login( body: {email: string, password: string}): void{
    this.http.post(`${this.uri}\\login`, body)
      .subscribe(res => {
        console.log(res);
      })
  }

}
