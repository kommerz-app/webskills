export interface ToastMessage {
  ttlSeconds?: number;

  /**
   * default is true
   */
  autoHide?: boolean;

  messageTitle: string;
  subtitle?: string;
  avatar?: string;
  type: 'error' | 'warn' | 'success' | 'notification';
  notificationType?: NotificationType;
  timestamp?: string;
}

export enum NotificationType {
  Leave = 'Leave Request',
  Invoice = 'Invoice',
  Other = 'Other',
}
