import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';
import { isNotBlank, isUndefined } from '@webskills/ts-utils';

@Injectable()
export class JwtAuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = this.authService.getSessionId();

    if (isNotBlank(idToken) && isUndefined(req.headers.get('Authorization'))) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken),
      });

      return next.handle(cloned).pipe(this.interceptHttp401Error());
    } else {
      return next.handle(req).pipe(this.interceptHttp401Error());
    }
  }

  private interceptHttp401Error(): MonoTypeOperatorFunction<HttpEvent<any>> {
    return tap({
      error: (err: HttpErrorResponse) => {
        if (err?.status === 401) {
          this.authService.validateSession();
        }
      },
    });
  }
}
