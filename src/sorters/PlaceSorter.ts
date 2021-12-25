import Logger from "../common/Logger/Logger";
import { PreParsedLeaderboardData } from "../index";

class PlaceSorter {
   constructor(
      private dataToSort: PreParsedLeaderboardData[],
      private _logger: Logger | null
   ) {}

   private static sortByPlacesAsc(
      data: PreParsedLeaderboardData[]
   ): PreParsedLeaderboardData[] {
      return data.sort((a, b) => {
         return a.place - b.place;
      });
   }

   public ascendant(): PreParsedLeaderboardData[] {
      this._logger?.log("Sorting ascendant places.");
      return PlaceSorter.sortByPlacesAsc(this.dataToSort);
   }
}

export default PlaceSorter;
