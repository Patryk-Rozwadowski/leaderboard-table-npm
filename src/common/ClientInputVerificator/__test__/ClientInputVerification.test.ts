import ClientInputVerification from "../ClientInputVerification";
import { LeaderboardData } from "../../../Leaderboard";

describe("ClientInputVerification", () => {
   let clientVerification: ClientInputVerification;
   beforeEach(() => {
      clientVerification = new ClientInputVerification();
   });

   describe("isRootContainerValid", () => {
      it("Should fail", () => {
         const wrongData = "" as unknown as HTMLElement;
         expect(() => clientVerification.isRootContainerValid(wrongData)).toThrow(
            "Expected root element to be an HTMLElement, was string."
         );
      });

      it("Should work", () => {
         const div = document.createElement("div");
         expect(clientVerification.isRootContainerValid(div)).toBe(true);
      });
   });

   describe("isDataStructureValid", () => {
      it("Should fail - data not array", () => {
         const failData = {} as unknown as LeaderboardData[];
         expect(clientVerification.isDataStructureValid(failData)).toBe(false);
      });

      it("Should fail - data not provided", () => {
         const dataUndefined = undefined as unknown as LeaderboardData[];
         expect(clientVerification.isDataStructureValid(dataUndefined)).toBe(false);
      });

      it("Should work - correct data structure", () => {
         const correctData = [
            {
               name: "Bob",
               points: 20
            }
         ] as unknown as LeaderboardData[];
         expect(clientVerification.isDataStructureValid(correctData)).toBe(true);
      });
   });
});
