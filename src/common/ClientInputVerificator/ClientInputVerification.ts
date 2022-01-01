import Logger from "../Logger/Logger";
import { PreParsedLeaderboardData } from "../../index";

class ClientInputVerification {
   constructor(private _logger?: Logger | null) {}

   public isRootContainerValid(element: HTMLElement): boolean {
      const isRootUndefined = typeof element === "undefined";
      const isNotInstanceOfHtmlElement = !(element instanceof HTMLElement);
      if (isRootUndefined || isNotInstanceOfHtmlElement) {
         throw new Error(
            `Expected root element to be an HTMLElement, was ${typeof element}.`
         );
      }
      this._logger?.log("Root element is valid.");
      return true;
   }

   public isDataStructureValid(data: PreParsedLeaderboardData[]): boolean {
      if (!Array.isArray(data) || !data) {
         this._logger?.error("Data is not defined. Pass leaderboard information.");
         return false;
      }
      return true;
   }
}

export default ClientInputVerification;
