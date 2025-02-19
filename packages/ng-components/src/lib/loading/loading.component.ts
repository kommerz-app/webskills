import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { isDefined, isUndefined } from '@webskills/ts-utils';
import { isPlatformBrowser } from '@angular/common';

@Component({
  template: `
    <div style="position: relative;" [ngStyle]="{ display }">
      <ng-container #ngViewContainer></ng-container>

      <div
        #spinnerWrapper
        style="display: none; position: absolute; align-items: center; justify-content: center; z-index: 101"
      >
        @if (loading) {
          <mat-spinner [diameter]="diameter"></mat-spinner>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class LoadingComponent implements OnInit, OnDestroy {
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private eventCb?: [string, (event: any) => boolean | void];

  @ViewChild('spinnerWrapper', { static: true })
  private spinnerWrapper?: ElementRef;

  @ViewChild('ngViewContainer', { read: ViewContainerRef, static: true })
  private ngViewContainer!: ViewContainerRef;

  private _loading = false;
  private resizeObserver?: ResizeObserver;
  private containerElement?: Element;

  diameter = 20;

  public template!: TemplateRef<any>;
  public disable = false;
  public display = 'flex';

  private diameterMaxSize = 75;
  private unlistenCb?: () => void;

  constructor(
    private ref: ElementRef,
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: NonNullable<unknown>,
  ) {}

  ngOnInit(): void {
    const embeddedViewRef = this.ngViewContainer.createEmbeddedView(
      this.template,
    );

    this.containerElement = embeddedViewRef.rootNodes[0];

    if (this.isBrowser) {
      this.resizeObserver = new ResizeObserver(([entry]) =>
        this.onContainerElementHasResized(entry),
      );
      this.resizeObserver.observe(this.containerElement!);
    }

    if (isDefined(this.eventCb)) {
      this.registerEventCallback(this.eventCb[0], this.eventCb[1]);
    }
  }

  ngOnDestroy(): void {
    this.unregisterEventCallback();
    this.resizeObserver?.disconnect();
  }

  public registerEventCallback(
    event: string,
    cb: (event: any) => boolean | void,
  ) {
    if (isUndefined(this.containerElement)) {
      this.eventCb = [event, cb];
    } else {
      this.unlistenCb = this.renderer.listen(this.containerElement, event, cb);
      this.eventCb = undefined;
    }
  }

  unregisterEventCallback() {
    this.unlistenCb?.();
  }

  public set loading(value: boolean) {
    this._loading = value;

    this.renderer.setStyle(
      this.spinnerWrapper?.nativeElement,
      'display',
      value ? 'flex' : 'none',
    );

    if (this.disable) {
      this.setDisabled(value);
    }

    this.cdRef.markForCheck();
  }

  private setDisabled(disable: boolean) {
    if (isUndefined(this.containerElement)) {
      return;
    }

    this.renderer.setProperty(this.containerElement, 'disabled', disable);

    if (disable) {
      this.renderer.addClass(this.containerElement, 'mat-button-disabled');
    } else {
      this.renderer.removeClass(this.containerElement, 'mat-button-disabled');
    }
  }

  get loading(): boolean {
    return this._loading;
  }

  dispatchEvent(event: any) {
    this.ref.nativeElement.dispatchEvent(event);
  }

  private onContainerElementHasResized(entry: ResizeObserverEntry): void {
    const r = entry.contentRect;

    this.renderer.setStyle(
      this.spinnerWrapper?.nativeElement,
      'top',
      r.top + 'px',
    );
    this.renderer.setStyle(
      this.spinnerWrapper?.nativeElement,
      'left',
      r.left + 'px',
    );
    this.renderer.setStyle(
      this.spinnerWrapper?.nativeElement,
      'width',
      r.width + 'px',
    );
    this.renderer.setStyle(
      this.spinnerWrapper?.nativeElement,
      'height',
      r.height + 'px',
    );

    this.diameter = Math.min(
      this.diameterMaxSize,
      Math.abs(r.height * 0.75),
      Math.abs(r.width * 0.75),
    );

    this.cdRef.detectChanges();
  }
}
