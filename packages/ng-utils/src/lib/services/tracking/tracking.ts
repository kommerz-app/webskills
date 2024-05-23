export interface UserAgent {
  /**
   * session id
   */
  sId?: string;

  ua?: string;

  /**
   * This value is used to detect the visitor's country if GeoIP is not enabled.
   */
  lng?: string;

  /**
   * The resolution of the device the visitor is using
   */
  res?: string;

  /**
   * Timezone
   */
  tz?: string;

  /**
   * cookies supported
   */
  c?: boolean;

  /**
   * user id
   */
  uId?: string;
}

export interface Interaction {
  url?: string;

  /**
   * session id
   */
  sId?: string;

  /**
   * event
   */
  e: string;

  /**
   * data
   */
  d?: any;

  /**
   * component
   */
  c: string;

  /**
   * user id
   */
  uId?: string;
}

export interface Visit {
  url?: string;

  /**
   * session id
   */
  sId?: string;

  /**
   * component view
   */
  c?: string;

  /**
   * user id
   */
  uId?: string;
}

export interface Info {
  url?: string;

  /**
   * session id
   */
  sId?: string;

  /**
   * name
   */
  n: string;

  /**
   * data
   */
  d?: any;

  /**
   * user id
   */
  uId?: string;
}

export interface LogMessage {
  name: string;
  level: string;
  messages: string[];
  sId?: string;
  uId?: string;
}

export interface Session {
  browserId?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  sId?: string;
  uId?: string;
}
