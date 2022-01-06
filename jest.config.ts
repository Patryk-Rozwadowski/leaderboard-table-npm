module.exports = {
   preset: "ts-jest",
   testPathIgnorePatterns: ["./node_modules", "./dist"],
   roots: ["./src"],
   testMatch: ["**/*.test.ts"],
   transform: {
      "^.+\\.ts$": "ts-jest",
      "^.+\\.scss$": "jest-scss-transform"
   },
   testEnvironment: "jsdom",
   setupFilesAfterEnv: ["./setupTests.ts"]
};
