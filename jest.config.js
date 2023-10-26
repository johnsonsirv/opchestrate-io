module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  coverageDirectory: './coverage/',
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testMatch: ['**/tests/**/?(*.)+(spec|test).[jt]s'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true,
};
