import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Config, CONFIG } from '../configuration/config';

@Injectable({
  providedIn: 'root',
})
export class TimeAdapter {
  constructor(
    private http: HttpClient,
    @Inject(CONFIG) private readonly config: Config<never>
  ) {}

  public getServerTime(): Observable<string> {
    const serverUrl = `${this.getBaseUrl()}/v1/system/`;

    return this.http
      .get<{ currentTime: string }>(serverUrl)
      .pipe(map((result) => result.currentTime));
  }

  private getBaseUrl(): string {
    return this.config.getProperty('baseUrl', 'localhost');
  }
}
