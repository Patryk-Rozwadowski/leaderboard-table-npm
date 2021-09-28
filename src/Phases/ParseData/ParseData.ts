import PhasesState from "../../PhasesState";
import Logger from "../../common/Logger/Logger";
import { Newable } from "../../common/common.types";

class ParseData extends PhasesState {
   private _logger: Logger;

   constructor() {
      super();

      this._logger = new Logger(this as unknown as Newable);
   }

   public execute(): void {
      this._logger.log(`Started parsing data.`);
   }

   private sortRows() {}
}

export default ParseData;
