import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  moduleNameMapper: {
    '@webskills/(.*)': '<rootDir>/../$1/src/public-api.ts',
  },
  // The Angular locale data shipped by @angular/common is untranspiled ESM, so it has to be
  // transformed. jest-preset-angular carves it out of transformIgnorePatterns, but its pattern
  // expects `node_modules/@angular/common/...` - under pnpm the real path is
  // `node_modules/.pnpm/@angular+common@<version>/node_modules/@angular/common/...`, which the
  // carve-out misses. The extra `(.*/)?` tolerates that store prefix.
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|(.*/)?@angular/common/locales/.*\\.js$))',
  ],
};

export default config;
