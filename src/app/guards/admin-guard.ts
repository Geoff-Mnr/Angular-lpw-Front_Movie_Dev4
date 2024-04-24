import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const session = JSON.parse(localStorage.getItem("session") || "{}");
    const user = session.user;

    if (user && user.role_name === "Admin") {
      return true;
    } else {
      this.router.navigate(["/movies"]);
      return false;
    }
  }
}
