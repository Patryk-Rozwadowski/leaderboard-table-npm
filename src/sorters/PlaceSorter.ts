import Logger from "../common/logger/Logger";
import { LeaderboardData } from "../leaderboard/Leaderboard";

class PlaceSorter {
   constructor(private dataToSort: LeaderboardData[], private _logger: Logger | null) {}

   public ascendant(): LeaderboardData[] {
      this._logger?.log("Sorting ascendant places.");
      return PlaceSorter.sortByPlacesAsc(this.dataToSort);
   }

   private static sortByPlacesAsc(data: LeaderboardData[]): LeaderboardData[] {
      const dataToSort = data.map((entity) => {
         return { ...entity };
      });
      return dataToSort.sort((a, b) => {
         // place property is controlled by sortByPlaces option
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
         // @ts-ignore
         return a.place - b.place;
      });
   }
}

export default PlaceSorter;
