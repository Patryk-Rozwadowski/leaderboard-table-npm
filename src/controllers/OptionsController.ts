import Logger from "../common/Logger/Logger";
import { Newable } from "../common/common.types";

interface LeaderboardOptions {
   headerTags?: string | HTMLElement;
   logs?: boolean;
   contentForEmptyRows?: string;
   sortByPlaces?: boolean;
   sortByPoints?: boolean;
}

class OptionsController implements LeaderboardOptions {
   headerTags?: string | HTMLElement;
   logs?: boolean;
   contentForEmptyRows?: string;
   sortByPlaces?: boolean;
   sortByPoints?: boolean;
   _logger: Logger;

   constructor(private _userOptions: LeaderboardOptions) {
      const { sortByPlaces, contentForEmptyRows, sortByPoints, headerTags, logs } =
         _userOptions;

      this.headerTags = headerTags;
      this.contentForEmptyRows = contentForEmptyRows;
      this.sortByPlaces = sortByPlaces;
      this.sortByPoints = sortByPoints;
      this.logs = logs;
      this._logger = new Logger(this as unknown as Newable);

      this._logOptions();
   }

   private _logOptions() {
      if (!this.logs) return;
      const optionsStringArray: string[] = Object.entries(this._userOptions).map(
         (el) => "" + "\n" + el.join(" : ")
      );
      this._logger.log("Options: " + optionsStringArray);
   }
}

export { LeaderboardOptions };
export default OptionsController;
