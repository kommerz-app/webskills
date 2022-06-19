import { AbstractStore } from '../store/abstract-store';
import { LocalAuthStatus } from './local-auth-status';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthStore extends AbstractStore<LocalAuthStatus> {
  constructor() {
    super({
      isLoggedIn: false,
      sessionId: '',
    });
  }
}
