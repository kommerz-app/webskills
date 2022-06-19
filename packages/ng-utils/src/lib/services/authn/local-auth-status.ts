/**
 * Auth status that is managed by Apollo locally.
 */
export interface LocalAuthStatus {
  isLoggedIn: boolean;
  sessionId: string;
}
