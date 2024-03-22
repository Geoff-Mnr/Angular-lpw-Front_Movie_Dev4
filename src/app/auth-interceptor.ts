import { inject } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { HttpInterceptorFn } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { HttpHandlerFn } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpEvent } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  // Injection de AuthService via le constructeur
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    let headers = req.headers;
    headers = headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    return next(req.clone({ headers: headers }));
  } else {
    return next(req);
  }
};
