import Logger from "../common/Logger/Logger";
import { LeaderboardData, SortableByProps } from "../leaderboard/Leaderboard";

class PlaceSorter {
   constructor(private dataToSort: LeaderboardData[], private _logger: Logger | null) {}

   public ascendant(): LeaderboardData[] {
      this._logger?.log("Sorting ascendant places.");
      return PlaceSorter.sortByPlacesAsc(this.dataToSort);
   }

   private static sortByPlacesAsc(data: SortableByProps[]): LeaderboardData[] {
      const dataToSort = data;
      return dataToSort.sort((a, b) => {
         return a.place - b.place;
      });
   }
}

export default PlaceSorter;
