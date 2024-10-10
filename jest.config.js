module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./setupJest.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
