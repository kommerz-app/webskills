import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  isDevMode,
  OnChanges,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  TemplateRef,
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

@Component({
  selector: 'wsk-html-content',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './html-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HtmlContentComponent implements OnChanges {
  @ViewChild('ngImg', { static: true }) ngImg!: TemplateRef<any>;

  @Input() url?: string | null;
  @Input() saveHtml = false;

  content?: string | SafeHtml;
  private readonly isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private elementRef: ElementRef,
    private router: Router,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef,
    private domSanitizer: DomSanitizer,
    private appRef: ApplicationRef,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['url']) {
      if (isNotBlank(this.url)) {
        this.insertContent();
      }
    }
  }

  private insertContent() {
    this.http
      .get(this.url!, {
        responseType: 'text',
      })
      .subscribe({
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
        error: () => this.router.navigate(['/404'], { replaceUrl: true }),
      });
  }

  private replaceImgElements() {
    const res: Element[] = Array.from(
      this.elementRef.nativeElement.querySelectorAll('img'),
    );

    for (let i = 0; i < res.length; i++) {
      const img = res[i];

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
