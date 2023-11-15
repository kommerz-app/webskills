import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject, timer } from 'rxjs';
import { Credentials } from './credentials';
import { catchError, map, takeUntil, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { AuthenticationAdapter } from './authentication.adapter';
import { UserAdapter } from '../user/user.adapter';
import { LocalUserAccount } from '../user/local-user-account';
import { AuthStore } from './auth.store';
import { Logger } from '@webskills/logging';
import { isNotBlank, isUndefined } from '@webskills/ts-utils';
import { TrackingService } from '../tracking/tracking.service';
import { Config, CONFIG } from '../configuration/config';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnDestroy {
  private logger = new Logger('AuthenticationService');
  private destroyed$ = new Subject<void>();

  constructor(
    private userService: UserService,
    @Inject(CONFIG) private readonly config: Config<never>,
    private router: Router,
    private authAdapter: AuthenticationAdapter,
    private userAdapter: UserAdapter,
    private authStore: AuthStore,
    private trackingService: TrackingService,
  ) {
    this.startSessionCheck();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Test the current session against the backend.
   */
  private testSessionValid(): Observable<boolean> {
    return this.authAdapter.testSessionValid();
  }

  /**
   * Use the existing session id to check against the backend whether the session is still active.
   *
   * E.g. during app (after a reload etc.) the previous login state must be restored.
   */
  recoverSession(): Observable<boolean> {
    const sessionId = localStorage.getItem('sessionId') ?? undefined;

    if (isUndefined(sessionId)) {
      return of(false);
    }

    return this.userAdapter.getUser(sessionId).pipe(
      map((result) => {
        // -- check was successful; we store the retrieved user object and the sessionId in the store
        this.insertSessionInformationIntoStore(result, <string>sessionId);

        this.logger.debug('#recoverSession: found existing session');
        return true;
      }),
      catchError(() => {
        // -- check failed; we do nothing
        this.logger.debug('#recoverSession: no session');
        return of(false);
      }),
    );
  }

  private insertSessionInformationIntoStore(
    user: LocalUserAccount,
    sessionId: string,
  ): void {
    // store session data
    this.authStore.update({
      isLoggedIn: true,
      sessionId: sessionId,
    });

    // store user data
    this.userService.setUserAccount({
      email: user.email,
      name: user.name,
      id: user.id,
      avatarFileId: user.avatarFileId,
      avatarUrl: user.avatarUrl,
      gravatarEmail: user.gravatarEmail,
      roles: user.roles,
    });
  }

  /**
   * Perform a login against the backend and store the session and user information in the frontend.
   *
   * @param credentials
   */
  login(credentials: Credentials): Observable<void> {
    return this.authAdapter.login(credentials).pipe(
      tap(({ sessionId, user }) => {
        this.insertSessionInformationIntoStore(user, sessionId);
        localStorage.setItem('sessionId', sessionId);
      }),
      map(({ sessionId }) => {
        if (isNotBlank(sessionId)) {
          return void 0;
        } else {
          throw new Error('could not login');
        }
      }),
    );
  }

  /**
   * Perform a logout against the backend and remove locally stored session and user information.
   */
  logout(): Observable<void> {
    this.logger.debug('logout');

    return this.authAdapter.logout(this.getSessionId()).pipe(
      // no matter whether the request was successful, we want to clear all session information on client side
      catchError(() => of(void 0)),
      tap(() => this.resetAuthStatus()),
    );
  }

  public isLoggedIn(): Observable<boolean> {
    return this.authStore.value$.pipe(map((result) => result.isLoggedIn));
  }

  /**
   * Reset the auth state in the app.
   */
  private resetAuthStatus(): void {
    this.logger.debug('#resetAuthStatus');

    // remove session form local storage
    localStorage.removeItem('sessionId');

    // reset information in store
    this.authStore.update({
      isLoggedIn: false,
      sessionId: '',
    });
  }

  getSessionId(): string {
    return this.authStore.getInstant().sessionId;
  }

  public isLoggedInInstant(): boolean {
    return this.authStore.getInstant().isLoggedIn;
  }

  /**
   * Start a timer that continuously checks the session.
   */
  private startSessionCheck(): void {
    const interval = this.config.getProperty(
      'authentication.sessionCheck.timerIntervalSeconds',
      60,
    );

    timer(20 * 1000, interval * 1000)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.validateSession());
  }

  validateSession(): void {
    if (!this.isLoggedInInstant()) {
      return;
    }

    this.testSessionValid().subscribe((result) => {
      if (!result) {
        this.logger.debug('#startSessionCheck: clear session');
        this.appLogout();
      }
    });
  }

  /**
   * Perform a logout that is triggered by the app
   */
  appLogout(): void {
    this.trackingService.trackInfo({ name: 'appLogout' });
    this.resetAuthStatus();
    this.router.navigate(['/logout']);
  }
}
