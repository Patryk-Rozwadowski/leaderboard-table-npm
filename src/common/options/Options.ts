import Logger from "../logger/Logger";
import { lbLogger } from "../logger/lbLogger";
import { SEMANTIC_TYPOGRAPHY_TAGS } from "../semanticTags/typography.enum";
import { LeaderboardData } from "../../leaderboard/Leaderboard";

interface LeaderboardOptions {
   logs: boolean;
   contentForEmptyCells: string;
   sortByPlaces: boolean;
   sortByPoints: boolean;

   headerPrimaryTag: string;
   headerSubTag: string;
   textPrimaryTag: string;
   textSecondaryTag: string;
}

const OptionsDefaults = {
   CONTENT_FOR_EMPTY_CELLS: "",
   LOGS: false,

   SORT_BY_PLACES: false,
   SORT_BY_POINTS: false,

   headerPrimaryTag: SEMANTIC_TYPOGRAPHY_TAGS.HEADER_PRIMARY_TEXT,
   headerSubTag: SEMANTIC_TYPOGRAPHY_TAGS.SUB_HEADER_TEXT,
   textPrimaryTag: SEMANTIC_TYPOGRAPHY_TAGS.PRIMARY_TEXT,
   textSecondaryTag: SEMANTIC_TYPOGRAPHY_TAGS.SECONDARY_TEXT
};

class Options {
   private _options: LeaderboardOptions = {
      contentForEmptyCells: OptionsDefaults.CONTENT_FOR_EMPTY_CELLS,
      sortByPlaces: OptionsDefaults.SORT_BY_PLACES,
      sortByPoints: OptionsDefaults.SORT_BY_POINTS,
      logs: OptionsDefaults.LOGS,

      headerPrimaryTag: OptionsDefaults.headerPrimaryTag,
      headerSubTag: OptionsDefaults.headerSubTag,
      textPrimaryTag: OptionsDefaults.textPrimaryTag,
      textSecondaryTag: OptionsDefaults.textSecondaryTag
   };
   private _logger: Logger;

   constructor() {
      this._logger = lbLogger;
   }

   public setOptions(
      data: LeaderboardData[],
      options?: Partial<LeaderboardOptions>
   ): void {
      if (!options) {
         return;
      }

      if (options.sortByPlaces) this._setSortableOptions(data);

      for (const [key, value] of Object.entries(options)) {
         if (!value) {
            this._setOption(key, this._options[key as keyof LeaderboardOptions]);
            return;
         }
         this._setOption(key, value);
      }

      if (this._options.logs) this._logOptions();
   }

   public getOptions(): LeaderboardOptions {
      return this._options;
   }

   private _setOption(option: string, value: string | boolean) {
      // Typescript issue
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this._options[option] = value;
   }

   private _setSortableOptions(data: LeaderboardData[]) {
      const isPlaceProp = data.every((entity) => !!entity.place);
      if (isPlaceProp) {
         this._setOption("sortByPlace", true);
      } else this._logger.warning("Place properties have not been found!");
   }

   private _logOption(option: string[]) {
      console.log("Option: " + option.join(" : "));
   }

   private _logOptions() {
      Object.entries(this._options).map(this._logOption);
   }
}

export { LeaderboardOptions };
export default Options;
