module.exports = {
   roots: ["./src"],
   testMatch: ["**/__test__/*.test.ts"],
   transform: {
      "^.+\\.ts$": "ts-jest"
   },
   testEnvironment: "jsdom"
};
