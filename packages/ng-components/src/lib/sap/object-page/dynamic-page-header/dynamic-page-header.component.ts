import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
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

  @ViewChild('headerContent', { static: true })
  private headerContent!: ElementRef<HTMLDivElement>;

  minified!: boolean;
  contentHeight!: number;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.resizeObserver = new ResizeObserver((entries) => {
      this.contentHeight = entries[0].contentRect.height;
      this.cd.markForCheck();
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
