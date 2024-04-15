import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard } from "./guards/auth-guard";
import { LoginGuard } from "./guards/login-guard";
import { RegisterComponent } from "./components/register/register.component";
import { ListDirectorsComponent } from "./components/list-directors/list-directors.component";
import { ListMoviesComponent } from "./components/list-movies/list-movies.component";

import { ListUsersComponent } from "./components/list-users/ListUsersComponent";
import { MainLayoutComponent } from "./components/main-layout/main-layout.component";
import { ListAllMoviesComponent } from "./components/list-all-movies/list-all-movies.component";

export const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  { path: "register", component: RegisterComponent },
  { path: "**", redirectTo: "home" },
  {
    path: "",
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: HomeComponent },
      { path: "movies", component: ListMoviesComponent },
      { path: "directors", component: ListDirectorsComponent },
      { path: "all-movies", component: ListAllMoviesComponent },
      { path: "users", component: ListUsersComponent },
    ],
  },
];
