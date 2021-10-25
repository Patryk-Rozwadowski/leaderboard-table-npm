import Row from "../../components/row/Row";
import PhasesState from "../PhasesState";
import Logger from "../../common/Logger/Logger";
import { Newable } from "../../common/common.types";
import Column from "../../components/column/Column";

class Mount extends PhasesState {
   private _rows: Row;
   private _logger: Logger;
   private _componentToMount: HTMLElement[] = [];
   private _column: Column;

   constructor(private readonly _rootContainer: HTMLElement, private _data: any) {
      super();
      this._logger = new Logger(this as unknown as Newable);
      this._column = new Column(this._rootContainer, this._data);
   }

   public execute(): void {
      this._handleColumnsLeaderboard();
      this._mountAllElementsToRoot();
   }

   private _mountAllElementsToRoot() {
      this._componentToMount.forEach((component) => {
         this._rootContainer.appendChild(component);
      });
      this._logger.log(`${this._componentToMount.length} components mounted.`);
   }

   private _handleColumnsLeaderboard() {
      this._addComponentToMount(this._column.render());
   }

   private _handleRows() {
      this._addComponentToMount(this._rows.render());
   }

   private _addComponentToMount(component: HTMLElement | HTMLElement[]) {
      if (Array.isArray(component)) {
         component.forEach((el) => {
            this._componentToMount.push(el);
            this._logger.log(`Add ${el.nodeName} to mount queue.`);
         });
         return;
      }
      // TODO nice to have better logger with better component's name instead of nodeName
      // this._logger.log(`Add ${component.nodeName} to mount queue.`);
      // this._componentToMount.push(component);
   }
}

export default Mount;
