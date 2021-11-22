import Logger from "../common/Logger/Logger";
import { Newable } from "../common/common.types";
import { PreParsedLeaderboardData } from "../index";

class PlaceSorter {
   private _logger: Logger;

   constructor(private dataToSort: PreParsedLeaderboardData[]) {
      this._logger = new Logger(this as unknown as Newable);
   }

   private static comparePlaces(
      data: PreParsedLeaderboardData[]
   ): PreParsedLeaderboardData[] {
      return data.sort((a, b) => {
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
         // @ts-ignore
         return a.place - b.place;
      });
   }

   public ascendant(): PreParsedLeaderboardData[] {
      this._logger.log("Sorting ascendant places.");
      return PlaceSorter.comparePlaces(this.dataToSort);
   }
}

export default PlaceSorter;
