import ElementController from "../../controllers/ElementController";
import { ColumnDomElement } from "./ColumnCreator";

class ColumnAppender {
   public static appendHeaderToColumnContainer(
      columnContainer: HTMLElement,
      columnHeaderElement: HTMLElement
   ): void {
      ElementController.appendElementsToContainer(columnContainer, columnHeaderElement);
   }

   public static appendRowsToColumnContainer(
      columnContainer: HTMLElement,
      columnsRows: HTMLElement[]
   ): void {
      columnsRows.forEach((rowElement: HTMLElement) =>
         ElementController.appendElementsToContainer(columnContainer, rowElement)
      );
   }

   /**
    * Method which append header and rows to column container. Returning column
    * component ready to mount.
    * @param columnDOMElement {ColumnDomElement}
    * @private
    */
   public static appendHeaderAndRowToColumnContainer(
      columnDOMElement: ColumnDomElement
   ): void {
      const { container, rows, header } = columnDOMElement;
      ColumnAppender.appendHeaderToColumnContainer(container, header);
      ColumnAppender.appendRowsToColumnContainer(container, rows);
   }
}

export default ColumnAppender;
