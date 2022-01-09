import ClientInputVerification from "./ClientInputVerification";
import { LeaderboardData } from "../../leaderboard/Leaderboard";
import { lbDefaultData } from "../../config/__mocks__/lbData";

describe("ClientInputVerification", () => {
   let root: HTMLElement;
   let clientVerification: ClientInputVerification;
   beforeEach(() => {
      root = document.createElement("div");
   });

   describe("isRootContainerValid", () => {
      it("Should fail - root element is wrong element type.", () => {
         const wrongData = "" as unknown as HTMLElement;
         clientVerification = new ClientInputVerification(wrongData, lbDefaultData);

         expect(() => clientVerification.isRootContainerValid()).toThrow(
            "Expected root element to be an HTMLElement, was string."
         );
      });

      it("Should work", () => {
         clientVerification = new ClientInputVerification(root, lbDefaultData);
         expect(clientVerification.isRootContainerValid()).toBe(true);
      });
   });

   describe("isDataStructureValid", () => {
      it("Should fail - data not array", () => {
         const failData = {} as unknown as LeaderboardData[];
         clientVerification = new ClientInputVerification(root, failData);
         expect(clientVerification.isDataStructureValid()).toBe(false);
      });

      it("Should fail - data not provided", () => {
         expect(clientVerification.isDataStructureValid()).toBe(false);
      });

      it("Should work - correct data structure", () => {
         const correctData = [
            {
               name: "Bob",
               points: 20
            }
         ] as unknown as LeaderboardData[];
         clientVerification = new ClientInputVerification(root, correctData);
         expect(clientVerification.isDataStructureValid()).toBe(true);
      });
   });
});
