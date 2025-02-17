/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }]
  },
  testMatch: ['**/*.spec.ts'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^webextension-polyfill$': '<rootDir>/src/__mocks__/webextension-polyfill.ts'
  }
}; 