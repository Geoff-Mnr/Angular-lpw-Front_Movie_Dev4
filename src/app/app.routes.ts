import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { ListMoviesComponent } from "./components/list-movies/list-movies.component";
import { AuthGuard } from "./guards/auth-guard";
import { LoginGuard } from "./guards/login-guard";
import { RegisterComponent } from "./components/register/register.component";
import { AddEditFormComponent } from "./components/add-edit-form/add-edit-form.component";

export const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] },
  { path: "movies", component: ListMoviesComponent, canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent },

  { path: "", redirectTo: "/movies", pathMatch: "full" },
];
