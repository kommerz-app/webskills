import { Observable } from 'rxjs';
import { Credentials } from './credentials';
import { LocalUserAccount } from '../user/local-user-account';

export abstract class AuthenticationAdapter {
  abstract testSessionValid(): Observable<boolean>;

  abstract logout(sessionId: string): Observable<void>;

  abstract login(credentials: Credentials): Observable<{
    sessionId: string;
    user: LocalUserAccount;
  }>;
}
