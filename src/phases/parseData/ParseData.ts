import PhasesState from "../PhasesState";
import Logger from "../../common/Logger/Logger";
import { Newable } from "../../common/common.types";
import { LeaderboardOptions } from "../../index";
import { RowProperties } from "../../components/row/types";
import PlaceSorter from "../../sorters/PlaceSorter";
import ClientInputVerification from "../../common/ClientInputVerificator/ClientInputVerification";

class ParseData extends PhasesState {
   private _logger: Logger;
   private _data: RowProperties[];
   private _userOptions: LeaderboardOptions;
   private _rootContainer: HTMLElement;
   private _sorter: PlaceSorter;
   private _clientInputVerification: ClientInputVerification;

   constructor(
      rootContainer: HTMLElement,
      data: RowProperties[],
      userOptions: LeaderboardOptions
   ) {
      super();
      this._sorter = new PlaceSorter(data);
      this._logger = new Logger(this as unknown as Newable);
      this._clientInputVerification = new ClientInputVerification(this._logger);
      this._rootContainer = rootContainer;
      this._data = data;
      this._userOptions = userOptions;
   }

   public execute(): RowProperties[] {
      this._parseData();
      this._logger.groupEnd();
      return this._data;
   }

   public getOptions(): LeaderboardOptions {
      return this._userOptions;
   }

   private _userInputValidation() {
      this._logger.log(`User's input validation.`);
      if (this._clientInputVerification.isRootContainerValid(this._rootContainer)) {
         this._checkData();
      }
   }

   private _sort() {
      if (this._userOptions) this._data = this._sorter.ascendant();
   }

   private _checkData() {
      this._logger.log("Checking data types.");
      if (!this._clientInputVerification.isDataStructureValid(this._data)) return;
      this._logger.log(`Data is valid.`);
   }

   private _parseData(): RowProperties[] {
      this._logger.log(`Started parsing data.`);
      this._userInputValidation();
      this._sort();
      return this._data;
   }
}

export default ParseData;
