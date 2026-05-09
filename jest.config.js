module.exports = {
  preset: "ts-jest",
  globalSetup: "./jest-global-setup.js",
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/dist/"],
  watchPathIgnorePatterns: ['node_modules'],
};
