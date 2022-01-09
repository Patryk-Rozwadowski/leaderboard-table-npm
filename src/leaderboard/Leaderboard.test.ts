import Leaderboard from "./Leaderboard";
import { lbDefaultData } from "../config/__mocks__/lbData";

describe("Leaderboard", () => {
   let root: HTMLElement;

   beforeEach(() => {
      root = document.createElement("div");
      root.classList.add(".leaderboard-root");
   });

   describe("Leaderboard options:", () => {
      it("Leaderboard should init with default options", () => {
         const leaderboard = new Leaderboard(root, lbDefaultData, {});
         leaderboard.init();
         expect(root).toMatchSnapshot();
      });

      it("Leaderboard should init without any given options", () => {
         const leaderboard = new Leaderboard(root, lbDefaultData);
         leaderboard.init();
         expect(root).toMatchSnapshot();
      });
   });

   describe("Leaderboard init:", () => {
      it("Should init with correct inputs", () => {
         const leaderboard = new Leaderboard(root, lbDefaultData);
         leaderboard.init();
         expect(root).toMatchSnapshot();
      });

      it("Leaderboard shouldn't init without any inputs", () => {
         const leaderboard = new Leaderboard("" as unknown as HTMLElement, []);
         expect(() => leaderboard.init()).toThrowError(
            "Expected root element to be an HTMLElement, was string."
         );
      });
   });
});
