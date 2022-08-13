import {
  ChangeDetectionStrategy,
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
export class DynamicPageHeaderComponent implements OnInit, OnDestroy {
  private resizeObserver!: ResizeObserver;

  @ViewChild('contentWrapper', { static: true })
  private contentWrapper!: ElementRef<HTMLDivElement>;

  @ViewChild('headerContent', { static: true })
  private headerContent!: ElementRef<HTMLDivElement>;

  minified!: boolean;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.resizeObserver = new ResizeObserver((entries) => {
      const contentHeight = entries[0].contentRect.height;
      this.renderer.setStyle(
        this.contentWrapper.nativeElement,
        '--max-height.px',
        contentHeight
      );
    });

    this.resizeObserver.observe(this.headerContent.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  onClick(): void {
    this.minified = !this.minified;
  }
}
