/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/*.test.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**']
};
