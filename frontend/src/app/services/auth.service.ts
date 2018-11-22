import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';
import {Router} from "@angular/router";
const helper = new JwtHelperService();

@Injectable({providedIn: "root"})
export class AuthService {

  private uri = 'http://localhost:8080/auth';
  public token;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  signUp(body: {email: string, name: string, password}): Observable<any> {
    return this.http.put(`${this.uri}/signup`,body );
  }

  login( body: {email: string, password: string}): void{
    this.http.post(`${this.uri}\\login`, body)
      .subscribe((res: {token: string, userId: string}) => {
        if(res.token) {
          const t = res.token;
          localStorage.setItem('issueToken',JSON.stringify(t));
          console.log(this.isAuthenticated());
          this.router.navigate(['/issue']);
        }
      })
  }
  logout() {
    localStorage.removeItem('issueToken');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('issueToken');

    return !helper.isTokenExpired(token);
  }

  getToken() {
    return JSON.parse(localStorage.getItem('issueToken'));
  }

}
