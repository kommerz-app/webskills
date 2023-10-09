import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import embed, { Result, VisualizationSpec } from 'vega-embed';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { formatLocale, timeFormatLocale } from './locale/de-DE';
import { isDefined, isUndefined } from '@webskills/ts-utils';
import { Changeset } from 'vega';

export type VegaChangeSet = { [key: string]: any }[];

export type VegaFilterFunctions = (dataEntry: {
  [key: string]: any;
}) => boolean;

@Component({
  selector: 'wsk-vega',
  template:
    '<div #vega style="width: 100%; height: 100%; overflow: hidden"></div>',
  styles: [':host { display: inline-block}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VegaComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('vega', { static: true }) vega!: ElementRef;

  @Input() spec!: VisualizationSpec;
  @Input() showActions = false;
  @Input() renderer: 'canvas' | 'svg' | 'none' = 'svg';

  /**
   * stream of data that will be displayed
   */
  @Input() data$?: Observable<VegaChangeSet>;

  /**
   * functions used to filter existing data when new data arrives
   */
  @Input() filterFns?: VegaFilterFunctions;

  @Input() dataMode: 'append' | 'replace' = 'append';

  private embeddedInstance?: Result;
  private destroyed$ = new Subject<void>();
  private dataSubscription?: Subscription;

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  async ngOnInit(): Promise<void> {
    let options: any = {};

    if (this.locale === 'de') {
      options = {
        formatLocale: formatLocale,
        timeFormatLocale: timeFormatLocale,
      };
    }

    this.embeddedInstance = await embed(this.vega.nativeElement, this.spec, {
      ...options,
      actions: this.showActions,
      renderer: this.renderer,
    });

    this.updateSubscription();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isDefined(changes['data$'])) {
      this.clear();
      this.updateSubscription();
    }
  }

  private updateSubscription(): void {
    if (isDefined(this.dataSubscription)) {
      this.dataSubscription.unsubscribe();
    }

    if (isDefined(this.data$)) {
      this.dataSubscription = this.data$
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => this.updateGraph(data));
    }
  }

  private updateGraph(data: VegaChangeSet): void {
    if (isUndefined(this.embeddedInstance)) {
      return;
    }

    let cs: Changeset;

    if (this.dataMode === 'append') {
      cs = this.embeddedInstance.view.changeset().insert(data);
    } else if (this.dataMode === 'replace') {
      cs = this.embeddedInstance.view
        .changeset()
        .remove(() => true)
        .insert(data);
    } else {
      throw Error('dataMode is not configured correctly');
    }

    if (isDefined(this.filterFns)) {
      cs = cs.remove(this.filterFns);
    }

    this.embeddedInstance.view.change((this.spec.data as any).name, cs).run();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();

    if (this.embeddedInstance) {
      this.embeddedInstance.finalize();
    }
  }

  private clear(): void {
    if (!this.embeddedInstance) {
      return;
    }
    const cs = this.embeddedInstance.view.changeset().remove(() => true);
    this.embeddedInstance.view.change((this.spec.data as any).name, cs).run();
  }
}
