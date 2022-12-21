/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@module/(.*)': '<rootDir>/src/module/$1',
    '@core/(.*)': '<rootDir>/src/core/$1',
  },
};
