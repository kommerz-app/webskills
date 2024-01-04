import {
  Info,
  Interaction,
  LogMessage,
  Session,
  UserAgent,
  Visit,
} from './tracking';

export abstract class TrackingAdapter {
  abstract trackUserAgent(ua: UserAgent): void;

  abstract trackInteraction(interaction: Interaction): void;

  abstract trackInfo(info: Info): void;

  abstract trackVisit(visit: Visit): void;

  abstract trackLog(log: LogMessage): void;

  abstract trackSession(session: Session): void;
}
