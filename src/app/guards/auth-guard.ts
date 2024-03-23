import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { CanActivateFn } from "@angular/router";

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorageToken = localStorage.getItem("token");

  if (localStorageToken) {
    return true;
  } else {
    router.navigate(["/login"]);
    return false;
  }
};
