import {
   ColumnProperties,
   Newable,
   RootElementConnector
} from "../../common/common.types";
import ComponentCreator from "../../factories/Component/ComponentCreator";
import Logger from "../../common/Logger/Logger";
import Column from "../../components/column/Column";

/**
 * Type used for defining column component which is ready to mount.
 * @type ColumnDomElement
 */
export type ColumnDomElement = {
   container: HTMLElement;
   rows: HTMLElement[];
   header: HTMLElement;
};

class ColumnCreator implements RootElementConnector {
   root: HTMLElement;
   _elementCreator: ComponentCreator;
   private readonly _logger: Logger;

   constructor(root: HTMLElement, private _lbData: ColumnProperties[]) {
      this.root = root;
      this._elementCreator = new ComponentCreator();
      this._logger = new Logger(this as unknown as Newable);
   }

   public render(): HTMLElement[] {
      return this._prepareColumns() as HTMLElement[];
   }

   private _prepareColumns() {
      return this._generateColumnsElements(this._lbData);
   }

   /**
    * Generating DOM elements based on parsed data.
    * @param columnsData   Parsed and prepared data
    * @private
    */
   private _generateColumnsElements(columnsData: ColumnProperties[]) {
      return columnsData.map((column: ColumnProperties): HTMLElement | HTMLElement[] =>
         this._generateColumn(column)
      );
   }

   /**
    * Generate single Column component
    * @param columnData    - Data for single Column
    * @private
    * @return HTMLElement
    */
   private _generateColumn(columnData: ColumnProperties): HTMLElement | HTMLElement[] {
      return new Column(this.root, columnData).render();
   }
}

export default ColumnCreator;
