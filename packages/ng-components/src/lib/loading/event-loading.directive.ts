import {
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { LoadingComponent } from './loading.component';
import { Observable, take } from 'rxjs';

@Directive({
  selector: '[wskEventLoading]',
  exportAs: 'wskEventLoading',
})
export class EventLoadingDirective implements OnChanges, OnDestroy {
  /**
   * 1st param is the name of the event (e.g. "click")
   * 2nd param is the function that shall be called (with optional argument)
   * 3rd param is the optional argument that is passed to the function
   */
  @Input() wskEventLoading?: [string, (arg?: any) => Observable<any>, any?];
  @Input() wskEventLoadingDisplay = 'inline-block';

  private component: ComponentRef<LoadingComponent>;

  constructor(
    templateRef: TemplateRef<unknown>,
    private viewContainerRef: ViewContainerRef,
  ) {
    this.component = this.viewContainerRef.createComponent(LoadingComponent);
    this.component.instance.template = templateRef;
    this.component.instance.disable = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wskEventLoading']) {
      this.component.instance.unregisterEventCallback();

      if (this.wskEventLoading) {
        this.component.instance.registerEventCallback(
          this.wskEventLoading[0],
          (event) => this.handleEvent(event),
        );
      }
    }
    if (changes['wskEventLoadingDisplay']) {
      this.component.instance.display = this.wskEventLoadingDisplay;
    }
  }

  public startLoading() {
    this.component.instance.loading = true;
  }

  public stopLoading() {
    this.component.instance.loading = false;
  }

  private handleEvent(event: any): void {
    event.stopPropagation();

    this.component.instance.loading = true;

    this.wskEventLoading![1].call(this, this.wskEventLoading![2])
      .pipe(take(1))
      .subscribe({
        next: () => this.completeLoadingState(event),
        error: () => this.completeLoadingState(event),
        complete: () => this.completeLoadingState(event),
      });
  }

  private completeLoadingState(event: any) {
    this.component.instance.loading = false;
    this.component.instance.dispatchEvent(event);
  }

  ngOnDestroy(): void {
    this.component.instance.unregisterEventCallback();
    this.viewContainerRef.clear();
  }
}
