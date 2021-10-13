import { Row } from "../components/row/types";
import Logger from "../common/Logger/Logger";
import { Newable } from "../common/common.types";

class PlaceSorter {
   private _logger: Logger;

   constructor(private dataToSort: Row[]) {
      this._logger = new Logger(this as unknown as Newable);
   }

   public ascendant(): Row[] {
      this._logger.log("Sorting ascendant places.");
      return PlaceSorter.comparePlaces(this.dataToSort);
   }

   private static comparePlaces(data: Row[]) {
      return data.sort((a, b) => {
         return a.place - b.place;
      });
   }
}

export default PlaceSorter;
