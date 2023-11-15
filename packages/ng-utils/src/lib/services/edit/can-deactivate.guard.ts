import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlTree } from '@angular/router';

export interface CanDeactivateComponent {
  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree;
}

@Injectable({ providedIn: 'root' })
export class CanDeactivateGuard {
  canDeactivate(
    component: CanDeactivateComponent,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
