import Logger from "../Logger/Logger";
import { LeaderboardData } from "../../leaderboard/Leaderboard";
import PhasesState from "../../phases/PhasesState";
import { ColumnProperties } from "../common.types";
import { ErrorMessage } from "../Logger/messages/error";

class ClientInputVerification extends PhasesState {
   constructor(
      private _root: HTMLElement,
      private _lbData: LeaderboardData[],
      private _logger?: Logger | null
   ) {
      super();
   }

   public execute(): void | HTMLElement | HTMLElement[] | ColumnProperties[] {
      this.isRootContainerValid();
   }

   public isRootContainerValid(): boolean {
      this._logger?.log(`User's input validation.`);
      const isRootUndefined = typeof this._root === "undefined";
      const isNotInstanceOfHtmlElement = !(this._root instanceof HTMLElement);
      if (isRootUndefined || isNotInstanceOfHtmlElement) {
         throw new Error(
            `${ErrorMessage.ROOT_CONTAINER_NOT_FOUND} ${typeof this._root}.`
         );
      }
      this._logger?.log("Root element is valid.");
      return true;
   }

   public isDataStructureValid(): boolean {
      if (!Array.isArray(this._lbData) || !this._lbData) {
         this._logger?.error("Data is not defined. Pass leaderboard information.");
         return false;
      }
      return true;
   }
}

export default ClientInputVerification;
