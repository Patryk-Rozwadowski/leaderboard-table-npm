import PhasesState from "../PhasesState";
import Logger from "../../common/Logger/Logger";
import { Newable } from "../../common/common.types";
import ColumnCreator from "../../components/column/ColumnCreator";

class Mount extends PhasesState {
   private _logger: Logger;
   private _columnsToMount: HTMLElement[] = [];
   private _column: ColumnCreator;

   constructor(private readonly _rootContainer: HTMLElement, private _data: any) {
      super();
      this._logger = new Logger(this as unknown as Newable);
      this._column = new ColumnCreator(this._rootContainer, this._data);
   }

   public execute(): void {
      this._addAllComponentsToQueue();
      this._mountAllElementsToRoot();
   }

   private _mountAllElementsToRoot() {
      this._columnsToMount.forEach((component) => {
         this._rootContainer.appendChild(component);
      });
      this._logger.log(`${this._columnsToMount.length} columns mounted.`);
   }

   private _addAllComponentsToQueue() {
      // TODO: move it to director
      this._addComponentToMount(this._column.render());
   }

   private _addComponentToMount(component: HTMLElement[]) {
      if (Array.isArray(component)) {
         component.forEach((el) => {
            this._columnsToMount.push(el);

            // TODO nice to have better logger with better component's name instead of nodeName
            this._logger.log(`Add ${el.nodeName} to mount queue.`);
         });
         return;
      }
   }
}

export default Mount;
