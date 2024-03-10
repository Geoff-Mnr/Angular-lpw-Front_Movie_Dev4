import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { ListMoviesComponent } from "./components/list-movies/list-movies.component";
import { AddEditFormComponent } from "./components/add-edit-form/add-edit-form.component";

export const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "movies", component: ListMoviesComponent },
  { path: "add", component: AddEditFormComponent },
];
