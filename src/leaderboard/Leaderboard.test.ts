import Leaderboard from "./Leaderboard";

describe("Leaderboard", () => {
   let root: HTMLElement;
   const mockedData = [
      {
         name: "Peter",
         points: 50
      },
      {
         name: "Bob",
         points: 10
      }
   ];

   beforeEach(() => {
      root = document.createElement("div");
      root.classList.add(".leaderboard-root");
   });

   it("Should initialized with default options", () => {
      const leaderboard = new Leaderboard(root, mockedData, {});
      leaderboard.init();
      expect(root).toMatchSnapshot();
   });
});
