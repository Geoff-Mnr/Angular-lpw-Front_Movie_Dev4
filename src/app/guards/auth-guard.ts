import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { CanActivateFn } from "@angular/router";

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorageToken = localStorage.getItem("token");
  const tokenReceivedAtString = localStorage.getItem("tokenReceivedAt");
  const currentTime = new Date();

  // regarde si le token est expiré
  let isTokenExpired = true;

  // Si le token a été reçu, on vérifie s'il est expiré
  if (tokenReceivedAtString) {
    const tokenReceivedAt = new Date(tokenReceivedAtString);
    const differenceInHours = (currentTime.getTime() - tokenReceivedAt.getTime()) / (1000 * 60 * 60);
    isTokenExpired = differenceInHours > 12;
  }
  // Si le token est présent et n'est pas expiré, on laisse l'utilisateur passer
  if (localStorageToken !== null && !isTokenExpired) {
    return true;
    // Sinon, on redirige l'utilisateur vers la page de connexion
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenReceivedAt");
    router.navigate(["/login"]);
    return false;
  }
};
