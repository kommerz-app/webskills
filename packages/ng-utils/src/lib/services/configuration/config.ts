import { InjectionToken } from '@angular/core';
import { isDefined } from '@webskills/ts-utils';

export interface EnvironmentConfig extends Record<string, unknown> {
  production: boolean;
  apiBasePath: string;
}

export class Config<T extends EnvironmentConfig> {
  constructor(public values: T) {}

  get production(): boolean {
    return this.values.production;
  }

  get apiBasePath(): string {
    return this.values.apiBasePath;
  }

  /**
   * Get the value for a specified config option or fallback to the specified default value.
   *
   * @param name of the config option
   * @param defaultValue value that is used when config option is not specified elsewhere
   */
  public getProperty<V>(name: string, defaultValue: V): V {
    if (isDefined(this.values[name])) {
      return <V>this.values[name];
    }

    return defaultValue;
  }
}

export const CONFIG = new InjectionToken<Config<never>>('Config');
