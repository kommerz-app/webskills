import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
};

export default config;
