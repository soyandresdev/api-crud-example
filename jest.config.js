module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/'],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/src/test/config.js'],
};
