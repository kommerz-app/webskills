import { UserRegistrationData } from './user.service';
import { Observable } from 'rxjs';
import { LocalUserAccount } from './local-user-account';

export abstract class UserAdapter {
  abstract registerUser(
    registerData: UserRegistrationData,
  ): Observable<LocalUserAccount>;

  abstract changeEmailAddress(
    newEmailAddress: string,
    password: string,
  ): Observable<void>;

  abstract confirmEmail(token: string): Observable<boolean>;

  abstract confirmDeleteAccount(token: string): Observable<boolean>;

  abstract changePassword(
    currentPassword: string,
    newPassword: string,
  ): Observable<void>;

  abstract requestPasswordReset(email: string): Observable<void>;

  abstract confirmPasswordReset(
    token: string,
    newPassword: string,
  ): Observable<void>;

  /**
   * Get the user account. Return error if account could not be retrieved
   */
  abstract getUser(sessionId?: string): Observable<LocalUserAccount>;

  abstract deleteAccount(password: string): Observable<void>;
}
