import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  isDevMode,
  makeStateKey,
  OnChanges,
  Output,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  TransferState,
  ViewChild,
} from '@angular/core';
import {
  CommonModule,
  isPlatformBrowser,
  NgOptimizedImage,
} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isBlank, isNotBlank } from '@webskills/ts-utils';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { decorateLinks } from '@webskills/ng-utils';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'wsk-html-content',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './html-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HtmlContentComponent implements OnChanges {
  @ViewChild('ngImg', { static: true }) ngImg!: TemplateRef<any>;

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
    private readonly appRef: ApplicationRef,
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
        setTimeout(() => this.replaceImgElements());
        this.cd.markForCheck();
      },
      error: (err) => this.loadingError.emit(err),
    });
  }

  private replaceImgElements() {
    const res: Element[] = Array.from(
      this.elementRef.nativeElement.querySelectorAll('img'),
    );

    for (const element of res) {
      const img = element;

      if (img.hasAttribute('data-md')) {
        continue;
      }

      const ngSrc = img.getAttribute('ngSrc');

      if (isBlank(ngSrc)) {
        if (isDevMode()) {
          console.warn('detected img in content without ngSrc');
        }
        continue;
      }

      const ngImgRef = this.ngImg.createEmbeddedView({
        ngSrc: ngSrc,
        width: img.getAttribute('width') ?? undefined,
        height: img.getAttribute('height') ?? undefined,
        sizes: img.getAttribute('sizes') ?? '',
        alt: img.getAttribute('alt') ?? '',
        clazz: img.getAttribute('class') ?? '',
      });

      this.appRef.attachView(ngImgRef);
      const ngImg = ngImgRef.rootNodes[0];

      this.renderer.insertBefore(img.parentElement, ngImg, img);
      this.renderer.removeChild(this.elementRef.nativeElement, img);
    }
  }
}
