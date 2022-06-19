import { InjectionToken } from '@angular/core';
import { DecimalSeparator } from '@webskills/ts-utils';

export const DECIMAL_SEPARATOR = new InjectionToken<DecimalSeparator>(
  'DecimalSeparator'
);
