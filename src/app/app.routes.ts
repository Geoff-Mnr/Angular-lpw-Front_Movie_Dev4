import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard } from "./guards/auth-guard";
import { LoginGuard } from "./guards/login-guard";
import { RegisterComponent } from "./components/register/register.component";
import { ListDirectorsComponent } from "./components/list-directors/list-directors.component";
import { ListMoviesComponent } from "./components/list-movies/list-movies.component";
import { AdminComponent } from "./components/admin/admin.component";

export const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  { path: "movies", component: ListMoviesComponent, canActivate: [AuthGuard] },
  { path: "directors", component: ListDirectorsComponent, canActivate: [AuthGuard] },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "admin", component: AdminComponent, canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/home" },
];
