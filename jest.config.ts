module.exports = {
   preset: "ts-jest",
   roots: ["./src"],
   testMatch: ["**/__test__/*.test.ts"],
   transform: {
      "^.+\\.ts$": "ts-jest"
   },
   testEnvironment: "jsdom"
};
