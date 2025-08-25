/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jest-environment-jsdom",

  // Настройки для алиасов из tsconfig.json
  moduleNameMapper: {
    "^@pages(.*)$": "<rootDir>/src/pages$1",
    "^@components(.*)$": "<rootDir>/src/components$1",
    "^@ui(.*)$": "<rootDir>/src/components/ui$1",
    "^@ui-pages(.*)$": "<rootDir>/src/components/ui/pages$1",
    "^@utils-types(.*)$": "<rootDir>/src/utils/types$1",
    "^@api(.*)$": "<rootDir>/src/utils/burger-api.ts$1",
    "^@slices(.*)$": "<rootDir>/src/services/slices$1",
    "^@selectors(.*)$": "<rootDir>/src/services/selectors$1",
  },

  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
};

export default config;
