import { Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PreviousRouteService } from '../routing/previous-route.service';
import { isBlank } from '@webskills/ts-utils';

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private previousRouteService: PreviousRouteService
  ) {}

  private checkLoggedOut(): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn().pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          return true;
        }

        if (isBlank(this.previousRouteService.getPreviousUrl())) {
          return this.router.createUrlTree(['/']);
        } else {
          return false;
        }
      })
    );
  }

  canLoad(): Observable<boolean> {
    return this.authService.isLoggedIn();
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.checkLoggedOut();
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.checkLoggedOut();
  }
}
