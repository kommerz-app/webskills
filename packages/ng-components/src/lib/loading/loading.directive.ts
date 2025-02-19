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

@Directive({
  selector: '[wskLoading]',
  exportAs: 'wskLoading',
})
export class LoadingDirective implements OnDestroy, OnChanges {
  @Input() wskLoading: boolean | null = false;
  @Input() wskLoadingDisable = false;
  @Input() wskLoadingDisplay = 'inline-block';

  private component: ComponentRef<LoadingComponent>;

  constructor(
    templateRef: TemplateRef<unknown>,
    private viewContainerRef: ViewContainerRef,
  ) {
    this.component = this.viewContainerRef.createComponent(LoadingComponent);
    this.component.instance.template = templateRef;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wskLoading']) {
      this.component.instance.loading = this.wskLoading ?? false;
    }
    if (changes['wskLoadingDisable']) {
      this.component.instance.disable = this.wskLoadingDisable;
    }
    if (changes['wskLoadingDisplay']) {
      this.component.instance.display = this.wskLoadingDisplay;
    }
  }

  ngOnDestroy(): void {
    this.viewContainerRef.clear();
  }
}
