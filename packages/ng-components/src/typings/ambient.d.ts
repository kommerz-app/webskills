declare module 'fast-json-patch/index.mjs' {
  export interface Operation {
    op: string;
    path: string;
    from?: string;
    value?: any;
  }
}

declare const $localize: any;
