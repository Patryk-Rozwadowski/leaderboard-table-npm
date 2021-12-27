import Logger from "../common/Logger/Logger";
import { PreParsedLeaderboardData } from "../index";

class PlaceSorter {
   constructor(
      private dataToSort: PreParsedLeaderboardData[],
      private _logger: Logger | null
   ) {}

   public ascendant(): PreParsedLeaderboardData[] {
      this._logger?.log("Sorting ascendant places.");
      return PlaceSorter.sortByPlacesAsc(this.dataToSort);
   }

   private static sortByPlacesAsc(
      data: PreParsedLeaderboardData[]
   ): PreParsedLeaderboardData[] {
      const dataToSort = data;
      return dataToSort.sort((a, b) => {
         return a.place - b.place;
      });
   }
}

export default PlaceSorter;
