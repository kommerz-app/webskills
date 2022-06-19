export const Breakpoints = {
  XSmall: '(max-width: 599.98px)',
  Small: '(min-width: 600px) and (max-width: 1023.98px)',
  Medium: '(min-width: 1024px) and (max-width: 1439.98px)',
  Large: '(min-width: 1440px) and (max-width: 1919.98px)',
  XLarge: '(min-width: 1920px)',

  Handset:
    '(max-width: 599.98px) and (orientation: portrait), ' +
    '(min-width: 480px) and (max-width: 959.98px) and (orientation: landscape)',
  Tablet:
    '(min-width: 600px) and (max-width: 959.98px) and (orientation: portrait), ' +
    '(min-width: 960px) and (max-width: 1439.98px) and (orientation: landscape)',
  Web:
    '(min-width: 960px) and (orientation: portrait), ' +
    '(min-width: 1440px) and (orientation: landscape)',

  HandsetPortrait: '(max-width: 599.98px) and (orientation: portrait)',
  TabletPortrait:
    '(min-width: 600px) and (max-width: 959.98px) and (orientation: portrait)',
  WebPortrait: '(min-width: 960px) and (orientation: portrait)',

  HandsetLandscape:
    '(min-width: 480px) and (max-width: 959.98px) and (orientation: landscape)',
  TabletLandscape:
    '(min-width: 960px) and (max-width: 1439.98px) and (orientation: landscape)',
  WebLandscape: '(min-width: 1440px) and (orientation: landscape)',
};
