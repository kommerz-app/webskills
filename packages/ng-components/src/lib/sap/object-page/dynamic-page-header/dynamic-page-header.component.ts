import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'wsk-dynamic-page-header',
  templateUrl: './dynamic-page-header.component.html',
  styleUrls: ['./dynamic-page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPageHeaderComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  private resizeObserver!: ResizeObserver;

  @ViewChild('contentWrapper', { static: true })
  private contentWrapper!: ElementRef<HTMLDivElement>;

  @ViewChild('headerContent', { static: true })
  private headerContent!: ElementRef<HTMLDivElement>;

  minified = false;
  showExpansion = true;

  constructor(
    private renderer: Renderer2,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.resizeObserver = new ResizeObserver((entries) => {
      const contentHeight = entries[0].contentRect.height;
      this.renderer.setStyle(
        this.contentWrapper.nativeElement,
        '--max-height.px',
        contentHeight,
      );

      this.updateInternalConfig();
    });

    this.resizeObserver.observe(this.headerContent.nativeElement);
  }

  ngAfterViewInit(): void {
    this.updateInternalConfig();
  }

  private updateInternalConfig() {
    if (this.headerContent.nativeElement.childNodes.length == 0) {
      this.minified = true;
      this.showExpansion = false;
    } else {
      if (!this.showExpansion) {
        this.minified = false;
      }
      this.showExpansion = true;
    }
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  onClick(): void {
    this.minified = !this.minified;
  }
}
