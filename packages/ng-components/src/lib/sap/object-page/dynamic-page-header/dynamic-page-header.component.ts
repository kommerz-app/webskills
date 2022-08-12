import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'wsk-dynamic-page-header',
  templateUrl: './dynamic-page-header.component.html',
  styleUrls: ['./dynamic-page-header.component.scss'],
})
export class DynamicPageHeaderComponent implements OnInit, OnDestroy {
  @ViewChild('headerContent', { static: true })
  headerContent!: ElementRef<HTMLDivElement>;

  minified!: boolean;
  contentHeight!: number;
  resizeObserver!: ResizeObserver;

  onClick(): void {
    this.minified = !this.minified;
  }

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    this.resizeObserver = new ResizeObserver((entries) => {
      this.zone.run(() => {
        this.contentHeight = entries[0].contentRect.height;
      });
    });

    this.resizeObserver.observe(this.headerContent.nativeElement);
  }

  ngOnDestroy() {
    this.resizeObserver.disconnect();
  }
}
