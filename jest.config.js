module.exports = {
  preset: "ts-jest",
  globalSetup: "./jest-global-setup.js",
  testEnvironment: "node",
  watchPathIgnorePatterns: ['node_modules'],
};
