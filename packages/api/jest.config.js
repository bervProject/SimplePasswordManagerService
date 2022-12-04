module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["**/src/*.{ts,tsx}"],
  coverageDirectory: "./coverage/",
  moduleNameMapper: { "^uuid$": "uuid" },
};
