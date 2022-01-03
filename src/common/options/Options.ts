import Logger from "../Logger/Logger";
import { lbLogger } from "../Logger/lbLogger";
import { SemanticHeaderTags } from "../../style/semanticTags/typography.enum";
import { SEMANTIC_TAGS } from "../../style/semanticTags";

interface LeaderboardOptions {
   headerTags: SemanticHeaderTags;
   logs: boolean;
   contentForEmptyCells: string;
   sortByPlaces: boolean;
   sortByPoints: boolean;
}

const OptionsDefaults = {
   HEADERS_TAGS: SEMANTIC_TAGS.HEADER_PRIMARY_TEXT as unknown as SemanticHeaderTags,
   CONTENT_FOR_EMPTY_CELLS: "",
   LOGS: false,
   SORT_BY_PLACES: true,
   SORT_BY_POINTS: false
};

class Options {
   private _options: LeaderboardOptions = {
      headerTags: OptionsDefaults.HEADERS_TAGS,
      contentForEmptyCells: OptionsDefaults.CONTENT_FOR_EMPTY_CELLS,
      sortByPlaces: OptionsDefaults.SORT_BY_PLACES,
      sortByPoints: OptionsDefaults.SORT_BY_POINTS,
      logs: OptionsDefaults.LOGS
   };
   private _logger: Logger;

   constructor() {
      this._logger = lbLogger;
   }

   public setOptions(options: LeaderboardOptions): void {
      if (!options) return;
      const { sortByPlaces, contentForEmptyCells, sortByPoints, headerTags, logs } =
         options;

      this._options = {
         headerTags: headerTags || OptionsDefaults.HEADERS_TAGS,
         contentForEmptyCells:
            contentForEmptyCells || OptionsDefaults.CONTENT_FOR_EMPTY_CELLS,
         sortByPlaces: sortByPlaces || OptionsDefaults.SORT_BY_PLACES,
         sortByPoints: sortByPoints || OptionsDefaults.SORT_BY_POINTS,
         logs: logs || OptionsDefaults.LOGS
      };

      if (this._options.logs) this._logOptions();
   }

   public getOptions(): LeaderboardOptions {
      return this._options;
   }

   private _logOption(option: string[]) {
      console.log("Option: " + option.join(" : "));
   }

   private _logOptions() {
      console.log(Object.entries(this._options).join("\n"));
      Object.entries(this._options).map(this._logOption);
   }
}

export { LeaderboardOptions };
export default Options;
