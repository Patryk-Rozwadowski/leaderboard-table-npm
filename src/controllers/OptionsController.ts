import Logger from "../common/Logger/Logger";
import PhasesState from "../phases/PhasesState";
import { lbLogger } from "../common/Logger/lbLogger";

interface LeaderboardOptions {
   headerTags: string;
   logs: boolean;
   contentForEmptyCells: string;
   sortByPlaces: boolean;
   sortByPoints: boolean;
}

const OptionsDefaults = {
   HEADERS_TAGS: "h5",
   CONTENT_FOR_EMPTY_CELLS: "",
   LOGS: false,
   SORT_BY_PLACES: true,
   SORT_BY_POINTS: false
};

class OptionsController extends PhasesState implements LeaderboardOptions {
   contentForEmptyCells: string;
   headerTags: string;
   logs: boolean;
   sortByPlaces: boolean;
   sortByPoints: boolean;
   private _logger: Logger;
   private _options: LeaderboardOptions;

   constructor() {
      super();
      this._logger = lbLogger;
   }

   public setOptions(options: LeaderboardOptions): void {
      const { sortByPlaces, contentForEmptyCells, sortByPoints, headerTags, logs } =
         options;

      this.headerTags = headerTags || OptionsDefaults.HEADERS_TAGS;
      this.contentForEmptyCells =
         contentForEmptyCells || OptionsDefaults.CONTENT_FOR_EMPTY_CELLS;
      this.sortByPlaces = sortByPlaces || OptionsDefaults.SORT_BY_PLACES;
      this.sortByPoints = sortByPoints || OptionsDefaults.SORT_BY_POINTS;
      this.logs = logs || OptionsDefaults.LOGS;
   }

   public getOptions(): LeaderboardOptions {
      return {
         headerTags: this.headerTags,
         contentForEmptyCells: this.contentForEmptyCells,
         sortByPlaces: this.sortByPlaces,
         sortByPoints: this.sortByPoints,
         logs: this.logs
      };
   }

   public execute(): void {
      this._logOptions();
   }

   private static _logOption(option: string[]) {
      return "" + "\n" + option.join(" : ");
   }

   private _logOptions() {
      const optionsStringArray: string[] = Object.entries(this._options).map(
         OptionsController._logOption
      );
      this._logger.log("Options: " + optionsStringArray);
   }
}

export { LeaderboardOptions };
export default OptionsController;
