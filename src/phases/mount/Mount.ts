import PhasesState from "../PhasesState";
import Logger from "../../common/Logger/Logger";
import ColumnCreator from "../../factories/column/ColumnCreator";

class Mount extends PhasesState {
   private _columnsToMount: HTMLElement[] = [];
   private _column: ColumnCreator;

   constructor(
      private readonly _rootContainer: HTMLElement,
      private _data: any,
      private _logger: Logger
   ) {
      super();
      this._column = new ColumnCreator(this._rootContainer, this._data);
   }

   public execute(): void {
      this._addAllComponentsToQueue();
      this._mountAllElementsToRoot();
   }

   private _mountAllElementsToRoot(): void {
      this._columnsToMount.forEach((component) => this._mountComponentToRoot(component));
      this._logger?.log(`${this._columnsToMount.length} columns mounted.`);
   }

   private _mountComponentToRoot(component: HTMLElement): void {
      this._rootContainer.appendChild(component);
   }

   private _addAllComponentsToQueue(): void {
      // TODO: move it to components director
      this._addComponentsToMountQueue(this._column.render());
   }

   private _addComponentsToMountQueue(components: HTMLElement[]) {
      components.forEach((component: HTMLElement): void =>
         this._addComponentToMountQueue(component)
      );
   }

   private _addComponentToMountQueue(component: HTMLElement): void {
      this._columnsToMount.push(component);

      // TODO nice to have better logger with better component's name instead of nodeName
      this._logger?.log(`Add ${component.nodeName} to mount queue.`);
   }
}

export default Mount;
