import Logger from "../Logger/Logger";
import { RowProperties } from "../../components/row/types";

class ClientInputVerification {
   constructor(private _logger: Logger) {}

   public verifyRootElement(element: HTMLElement): void {
      if (typeof element === "undefined" || !(element instanceof HTMLElement)) {
         throw new Error(`Expected e to be an HTMLElement, was ${typeof element}.`);
      }
      this._logger.log("Root element is valid.");
   }

   public verifyDataStructure(data: RowProperties[]): void {
      if (!Array.isArray(data) || !data) {
         this._logger.error("Data is not defined. Pass leaderboard information.");
         return;
      }
   }
}

export default ClientInputVerification;
