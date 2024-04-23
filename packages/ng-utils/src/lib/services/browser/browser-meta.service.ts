import { Inject, Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { PageMeta } from './page-meta';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { isBlank, isEmptyArray, isUndefined } from '@webskills/ts-utils';
import { Config, CONFIG } from '../configuration/config';

@Injectable({ providedIn: 'root' })
export class BrowserMetaService {
  constructor(
    private router: Router,
    private meta: Meta,
    @Inject(CONFIG) private readonly config: Config<never>,
  ) {}

  init(): void {
    this.router.events.subscribe((event) => {
      if (
        event instanceof ActivationEnd &&
        isEmptyArray(event.snapshot.children)
      ) {
        this.setPageMetaData(
          event.snapshot.data?.['meta'],
          event.snapshot.title,
        );
      }
    });
  }

  public setPageMetaData(meta?: PageMeta, pageTitle?: string): void {
    if (isUndefined(meta)) {
      meta = {};
    }

    const frontendUrl = this.config.getProperty(
      'frontendUrl',
      'http://localhost',
    );
    const appImage = this.config.getProperty('appImage', 'assets/app.jpg');

    const socialUrl = frontendUrl + this.router.url;
    const socialTitle = meta.og_title ?? pageTitle;
    const socialDescription = meta.og_description ?? meta.description;
    const socialImage = frontendUrl + '/' + (meta.image ?? appImage);

    this.setOrRemoveTag('description', meta.description);
    this.setOrRemoveTag('keywords', meta.keywords);
    this.setOrRemoveTag('robots', meta.robots);
    this.setOrRemoveTag('image', socialImage);

    this.setOrRemoveTag('twitter:url', socialUrl);
    this.setOrRemoveTag('twitter:title', socialTitle);
    this.setOrRemoveTag('twitter:description', socialDescription);
    this.setOrRemoveTag('twitter:image', socialImage);
    this.setOrRemoveTag('twitter.card', meta.twitter_card ?? 'summary');

    this.setOrRemoveTag('og:url', socialUrl, 'property');
    this.setOrRemoveTag('og:title', socialTitle, 'property');
    this.setOrRemoveTag('og:description', socialDescription, 'property');
    this.setOrRemoveTag('og:image', socialImage, 'property');
    this.setOrRemoveTag('og:type', meta.og_type ?? 'website', 'property');
  }

  private setOrRemoveTag(
    attributeValue: string,
    content?: string,
    attributeName: 'name' | 'property' = 'name',
  ): void {
    if (isBlank(content)) {
      this.meta.removeTag(`${attributeName}='${attributeValue}'`);
    } else {
      const tag: MetaDefinition = {
        content,
      };
      tag[attributeName] = attributeValue;

      this.meta.updateTag(tag);
    }
  }
}
