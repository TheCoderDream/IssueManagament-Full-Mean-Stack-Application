import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate, CanActivateChild{

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    if(this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate((['/login']));
    return false;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    return this.canActivate(route, state);
  }

}
