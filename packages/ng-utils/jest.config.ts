import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  moduleNameMapper: {
    '@webskills/(.*)': '<rootDir>/../$1/src/public-api.ts',
  },
};

export default config;
