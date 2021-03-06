import PhasesState from "../PhasesState";
import Logger from "../../common/logger/Logger";
import ColumnsCreator from "../../factories/creators/ColumnsCreator";
import { lbLogger } from "../../common/logger/lbLogger";
import { ColumnProperties } from "../../common/common.types";

class Creation extends PhasesState {
   private _columnsToCreate: HTMLElement[] = [];
   private _allColumns: ColumnsCreator;
   private _logger: Logger;

   constructor(
      private readonly _rootContainer: HTMLElement,
      private _columnsData: ColumnProperties[]
   ) {
      super();
      this._logger = lbLogger;
      this._allColumns = new ColumnsCreator(this._rootContainer, this._columnsData);
   }

   public execute(): void {
      this._createAndMountAllColumns();
      this._mountAllElementsToRoot();
   }

   private _mountAllElementsToRoot(): void {
      this._columnsToCreate.forEach((component) => this._mountComponentToRoot(component));
      this._logger?.log(`${this._columnsToCreate.length} columns mounted.`);
   }

   private _mountComponentToRoot(component: HTMLElement): void {
      this._rootContainer.appendChild(component);
   }

   private _createAndMountAllColumns(): void {
      const leaderboardColumns: HTMLElement[] = this._allColumns.render();
      this._addComponentsToMountQueue(leaderboardColumns);
   }

   private _addComponentsToMountQueue(components: HTMLElement[]) {
      components.forEach((component: HTMLElement): void =>
         this._addComponentToMountQueue(component)
      );
   }

   private _addComponentToMountQueue(component: HTMLElement): void {
      this._columnsToCreate.push(component);
      this._logger?.log(`Add ${component.nodeName} to mount queue.`);
   }
}

export default Creation;
