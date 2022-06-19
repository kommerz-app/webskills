import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalUserAccount } from './local-user-account';
import { UserAdapter } from './user.adapter';

export interface UserRegistrationData {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userAccount$ = new BehaviorSubject<LocalUserAccount | null>(null);
  public userAccount$ = this._userAccount$.asObservable();

  constructor(private userAdapter: UserAdapter) {}

  registerUser(
    registerData: UserRegistrationData
  ): Observable<LocalUserAccount> {
    return this.userAdapter.registerUser(registerData);
  }

  setUserAccount(user: LocalUserAccount): void {
    this._userAccount$.next(user);
  }

  getUserAccount(): LocalUserAccount | null {
    return this._userAccount$.getValue();
  }

  changePassword(
    currentPassword: string,
    newPassword: string
  ): Observable<void> {
    return this.userAdapter.changePassword(currentPassword, newPassword);
  }

  requestPasswordReset(email: string): Observable<void> {
    return this.userAdapter.requestPasswordReset(email);
  }

  confirmPasswordReset(token: string, newPassword: string): Observable<void> {
    return this.userAdapter.confirmPasswordReset(token, newPassword);
  }

  changeEmailAddress(
    newEmailAddress: string,
    password: string
  ): Observable<void> {
    return this.userAdapter.changeEmailAddress(newEmailAddress, password);
  }

  confirmEmail(token: string): Observable<boolean> {
    return this.userAdapter.confirmEmail(token);
  }

  confirmDeleteAccount(token: string): Observable<boolean> {
    return this.userAdapter.confirmDeleteAccount(token);
  }

  deleteAccount(password: string): Observable<void> {
    return this.userAdapter.deleteAccount(password);
  }
}
