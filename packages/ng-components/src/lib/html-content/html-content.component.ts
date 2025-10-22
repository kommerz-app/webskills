import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  makeStateKey,
  OnChanges,
  Output,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  TransferState,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isBlank, isNotBlank } from '@webskills/ts-utils';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { decorateLinks } from '@webskills/ng-utils';
import { of, tap } from 'rxjs';

@Component({
  selector: 'wsk-html-content',
  imports: [],
  templateUrl: './html-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HtmlContentComponent implements OnChanges {
  @Input() url?: string | null;
  @Input() saveHtml = false;
  @Output() loadingError = new EventEmitter<any>();

  content?: string | SafeHtml;
  private readonly isBrowser: boolean;
  private readonly prefix: string;

  constructor(
    private readonly http: HttpClient,
    private readonly elementRef: ElementRef,
    private readonly router: Router,
    private readonly renderer: Renderer2,
    private readonly cd: ChangeDetectorRef,
    private readonly domSanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) platformId: object,
    private readonly transferState: TransferState,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.prefix = this.isBrowser ? '' : '/';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['url']) {
      if (isNotBlank(this.url)) {
        this.insertContent();
      }
    }
  }

  private insertContent() {
    const urlStateKey = makeStateKey<string>(this.url!);

    const state = this.transferState.get(urlStateKey, undefined);

    const req$ = isBlank(state)
      ? this.http
          .get(this.prefix + this.url!, { responseType: 'text' })
          .pipe(tap((html) => this.transferState.set(urlStateKey, html)))
      : of(state);

    req$.subscribe({
      next: (html) => {
        if (this.saveHtml) {
          this.content = this.domSanitizer.bypassSecurityTrustHtml(html);
        } else {
          this.content = html;
        }
        if (this.isBrowser) {
          setTimeout(() =>
            decorateLinks(
              this.elementRef.nativeElement,
              this.renderer,
              this.router,
              undefined,
              undefined,
              (href, elem) => {
                if (href.startsWith('http')) {
                  elem.setAttribute('target', '_blank');
                }
              },
            ),
          );
        }
        this.cd.markForCheck();
      },
      error: (err) => this.loadingError.emit(err),
    });
  }
}
