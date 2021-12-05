import { ColumnDomElement } from "./ColumnCreator";
import DOMController from "../../controllers/DOMController";

class ColumnController {
   private _DOMController: DOMController;

   constructor() {
      this._DOMController = new DOMController();
   }

   /**
    * Method which append header and rows to column container. Returning column
    * component ready to mount.
    * @param columnDOMElement {ColumnDomElement}
    * @private
    */
   appendHeaderAndRowToColumnContainer(columnDOMElement: ColumnDomElement): HTMLElement {
      const { container, rows, header } = columnDOMElement;
      const columnContainer: HTMLElement = container;
      const rowsArray: HTMLElement[] = rows;
      this._DOMController.setElementToProcess(columnContainer);

      // Typescript wrong error about spread operator in method appendChildrenToContainer
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this._DOMController.appendChildrenToContainer(columnContainer, header, rowsArray);
      return columnContainer;
   }
}

export default ColumnController;
