import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { CanActivateFn } from "@angular/router";

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorageToken = localStorage.getItem("token");
  if (localStorageToken !== null) {
    return true;
  } else {
    router.navigate(["/login"]);
    return false;
  }
};
