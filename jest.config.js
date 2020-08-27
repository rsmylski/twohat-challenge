module.exports = async () => ({
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/?(*.)+(spec|test).js?(x)'],
  rootDir: './',
});
