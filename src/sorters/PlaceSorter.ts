import { SortableProperties } from "../components/row/types";
import Logger from "../common/Logger/Logger";
import { Newable } from "../common/common.types";

class PlaceSorter {
   private _logger: Logger;

   constructor(private dataToSort: SortableProperties[]) {
      this._logger = new Logger(this as unknown as Newable);
   }

   private static comparePlaces(data: SortableProperties[]) {
      return data.sort((a, b) => {
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
         // @ts-ignore
         return a.place - b.place;
      });
   }

   public ascendant(): SortableProperties[] {
      this._logger.log("Sorting ascendant places.");
      return PlaceSorter.comparePlaces(this.dataToSort);
   }
}

export default PlaceSorter;
