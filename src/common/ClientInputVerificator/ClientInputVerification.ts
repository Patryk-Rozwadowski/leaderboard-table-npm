import Logger from "../Logger/Logger";
import { RowProperties } from "../../components/row/types";

class ClientInputVerification {
   constructor(private _logger: Logger) {}

   public isRootContainerValid(element: HTMLElement): boolean {
      if (typeof element === "undefined" || !(element instanceof HTMLElement)) {
         throw new Error(`Expected e to be an HTMLElement, was ${typeof element}.`);
      }
      this._logger.log("Root element is valid.");
      return true;
   }

   public isDataStructureValid(data: RowProperties[]): boolean {
      if (!Array.isArray(data) || !data) {
         this._logger.error("Data is not defined. Pass leaderboard information.");
         return false;
      }
      return true;
   }
}

export default ClientInputVerification;
