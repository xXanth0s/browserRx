module.exports = {
  preset: 'ts-jest',
  testMatch: [
    '**/*.spec.ts'
  ],
  testPathIgnorePatterns: [
    'optionsPage',
    'popup'
  ],
  silent: false,
  restoreMocks: true,
  setupFilesAfterEnv: ['./jest/setup.jest.ts']
};
