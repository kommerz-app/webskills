import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Breakpoints } from '@webskills/ng-utils';
import { isNotBlank } from '@webskills/ts-utils';

/**
 * {'div span': 'cli cli2'}
 * {'div span': {'cli cli2': true}}
 */
interface SelectorClasses {
  [selector: string]: string | ConditionalClasses;
}

/**
 * {'div span': {'cli cli2': true}}
 */
interface ConditionalClasses {
  [classNames: string]: boolean;
}

/**
 * 'cl1 cl2'
 * {'cl1 cli2': true}
 * {'div span': 'cli cli2'}
 * {'div span': {'cli cli2': true}}
 */
type BreakpointClasses = string | ConditionalClasses | SelectorClasses;

/**
 *
 * [clazz]="{'div p':'cl1 cl2'}"
 * smClass="cl1 cl2"
 * [smClass]="['cl1 cl2', true]"
 * [smClass]="{'div p':'cl1 cl2'}"
 * [smClass]="{'div p':'cl1 cl2', 'div span': ''}"
 *
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[clazz]',
})
export class ClazzDirective implements AfterViewInit, OnChanges {
  private matchingBreakpoints: { [key: string]: boolean } = {};

  @Input() clazz!: SelectorClasses;
  @Input() xsClazz?: BreakpointClasses;
  @Input() smClazz?: BreakpointClasses;
  @Input() mdClazz?: BreakpointClasses;
  @Input() lgClazz?: BreakpointClasses;
  @Input() xlClazz?: BreakpointClasses;

  constructor(
    private renderer2: Renderer2,
    private el: ElementRef,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((v) => {
        this.matchingBreakpoints = v.breakpoints;
        this.update();
      });
  }

  ngAfterViewInit(): void {
    this.update();
  }

  ngOnChanges(): void {
    this.update();
  }

  private update(): void {
    // -- remove all classes
    this.clearClasses(this.clazz);
    this.clearClasses(this.xsClazz);
    this.clearClasses(this.smClazz);
    this.clearClasses(this.mdClazz);
    this.clearClasses(this.lgClazz);
    this.clearClasses(this.xlClazz);

    // -- add clazz classes
    this.addClasses(this.clazz);

    // -- add all classes for matching breakpoints
    if (this.matchingBreakpoints[Breakpoints.XSmall]) {
      this.addClasses(this.xsClazz);
    }
    if (this.matchingBreakpoints[Breakpoints.Small]) {
      this.addClasses(this.smClazz);
    }
    if (this.matchingBreakpoints[Breakpoints.Medium]) {
      this.addClasses(this.mdClazz);
    }
    if (this.matchingBreakpoints[Breakpoints.Large]) {
      this.addClasses(this.lgClazz);
    }
    if (this.matchingBreakpoints[Breakpoints.XLarge]) {
      this.addClasses(this.xlClazz);
    }
  }

  private clearClasses(clazz?: BreakpointClasses): void {
    this.handleClasses(
      clazz,
      (element, clazz1) => this.renderer2.removeClass(element, clazz1),
      true
    );
  }

  private addClasses(clazz?: BreakpointClasses): void {
    this.handleClasses(clazz, (element, clazz1) =>
      this.renderer2.addClass(element, clazz1)
    );
  }

  private handleClasses(
    clazz: BreakpointClasses | undefined,
    fn: (element: Element, clazz: string) => void,
    skipConditionTest = false
  ): void {
    if (clazz instanceof Object) {
      for (const clazzKey in clazz) {
        if (Object.prototype.hasOwnProperty.call(clazz, clazzKey)) {
          if (typeof clazz[clazzKey] === 'boolean') {
            this.handleConditionalClasses(
              this.el.nativeElement,
              clazz as ConditionalClasses,
              fn,
              skipConditionTest
            );
          } else if (
            typeof clazz[clazzKey] === 'string' ||
            clazz[clazzKey] instanceof Object
          ) {
            this.handleSelectorClasses(
              clazz as SelectorClasses,
              fn,
              skipConditionTest
            );
          }
        }
      }

      return;
    }

    if (isNotBlank(clazz)) {
      clazz?.split(' ').forEach((c) => fn(this.el.nativeElement, c));
    }
  }

  private handleConditionalClasses(
    elem: Element,
    clazz: ConditionalClasses,
    fn: (element: Element, clazz: string) => void,
    skipConditionTest = false
  ): void {
    for (const clazzKey in clazz) {
      if (Object.prototype.hasOwnProperty.call(clazz, clazzKey)) {
        if (clazz[clazzKey] === true || skipConditionTest) {
          clazzKey.split(' ').forEach((c) => fn(elem, c));
        }
      }
    }
  }

  private handleSelectorClasses(
    clazz: SelectorClasses,
    fn: (element: Element, clazz: string) => void,
    skipConditionTest = false
  ): void {
    for (const clazzKey in clazz) {
      if (Object.prototype.hasOwnProperty.call(clazz, clazzKey)) {
        const founds = (this.el.nativeElement as Element).querySelectorAll(
          clazzKey
        );

        if (typeof clazz[clazzKey] === 'string') {
          (clazz[clazzKey] as string)
            .split(' ')
            .forEach((c) => founds.forEach((found) => fn(found, c)));
        } else if (clazz[clazzKey] instanceof Object) {
          founds.forEach((found) =>
            this.handleConditionalClasses(
              found,
              clazz[clazzKey] as ConditionalClasses,
              fn,
              skipConditionTest
            )
          );
        }
      } // if has ownProperty
    } // for
  }
}
