import {Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {IssueListComponent} from "./components/issue-list/issue-list.component";
import {AuthGuard} from "./guard/auth-guard.service";
import {IssueCreateComponent} from "./components/issue-create/issue-create.component";
import {DefaultLayoutComponent} from "./layouts/default-layout/default-layout.component";

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {
    path: 'issue', canActivate: [AuthGuard],
    children: [
      {path: '', component: IssueListComponent},
      {path: 'create', component: IssueCreateComponent},
    ]
  },
  { path: '**', component: PageNotFoundComponent }
]
