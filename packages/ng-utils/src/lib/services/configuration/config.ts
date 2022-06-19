import { InjectionToken } from '@angular/core';
import { isDefined } from '@webskills/ts-utils';

export interface EnvironmentConfig extends Record<string, unknown> {
  production: boolean;
  apiBasePath: string;
}

export class Config {
  constructor(private config: EnvironmentConfig) {}

  /**
   * Get the value for a specified config option or fallback to the specified default value.
   *
   * @param name of the config option
   * @param defaultValue value that is used when config option is not specified elsewhere
   */
  public getProperty<T>(name: string, defaultValue: T): T {
    if (isDefined(this.config[name])) {
      return <T>this.config[name];
    }

    return defaultValue;
  }
}

export const CONFIG = new InjectionToken<Config>('Config');
