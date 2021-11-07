import { Component, Newable, RootElementConnector } from "../../common/common.types";
import LeaderboardHeader from "../header/Header";
import Header from "../header/Header";
import ElementCreator from "../../factories/ElementCreator";
import Row from "../row/Row";
import Logger from "../../common/Logger/Logger";
import ElementController from "../../common/ElementController";
import { PreParsedLeaderboardData } from "../../index";
import { COMMON_STYLE_CLASS } from "../style/common.enum";

/**
 * @type ColumnProperties type for column data which is after whole
 * data parsing process and ready to use.
 */
interface ColumnProperties {
   header: string;
   rows: SingleRowProperties[] | [];
}

export type SingleRowProperties = { [key: string]: string | number };

interface ValuesToSaveOrAppend {
   headersAccumulator: ColumnProperties[];
   header: string;
   singleRowValuesForHeader: SingleRowProperties;
}

class Column implements RootElementConnector, Component {
   root: HTMLElement;
   _elementCreator: ElementCreator;
   private _logger: Logger;

   constructor(root: HTMLElement, private _lbData: Partial<PreParsedLeaderboardData>[]) {
      this.root = root;
      this._elementCreator = new ElementCreator();
      this._logger = new Logger(this as unknown as Newable);
   }

   public render(): HTMLElement[] {
      return this._prepareColumns();
   }

   private _prepareColumns() {
      const columnsData = this._lbData.reduce(
         (
            headersAccumulator: ColumnProperties[],
            preParsedElement: Partial<PreParsedLeaderboardData>
         ): ColumnProperties[] => {
            const clientHeaders: string[] = Object.keys(preParsedElement);
            clientHeaders.forEach((clientHeader: string): void => {
               console.log({ clientHeader });
               const singleRowValuesForHeader = preParsedElement[
                  clientHeader
               ] as unknown as SingleRowProperties;

               const isHeaderAlreadyExistsInAcc: boolean = headersAccumulator.some(
                  (currentIteratedElement: { header: string }) =>
                     currentIteratedElement.header === clientHeader
               );

               let newKey: ColumnProperties;
               let isAdditionalKey = false;

               if (isHeaderAlreadyExistsInAcc) {
                  let index;
                  const accHeaders: string[] = headersAccumulator.map((el) => el.header);

                  /**
                   * Holding boolean value if there is another new header in column which already has been added.
                   * @let isAdditionalKey
                   * @type boolean
                   */
                  isAdditionalKey =
                     accHeaders.length === clientHeaders.length &&
                     accHeaders.every(function (value, index) {
                        return value === clientHeaders[index];
                     });
               }

               const valuesToSaveOrAppend: ValuesToSaveOrAppend = {
                  headersAccumulator,
                  header: clientHeader,
                  singleRowValuesForHeader
               };

               if (isHeaderAlreadyExistsInAcc) {
                  this._appendNewRowToExistingHeader(valuesToSaveOrAppend);
               } else {
                  this._appendNewHeaderAndRowToAcc(valuesToSaveOrAppend);
               }
            });

            return headersAccumulator;
         },
         []
      );

      console.log({ columnsData });

      return this._generateColumnsElements(columnsData);
   }

   private _findElementWithMostKeys(headersArray: any): ColumnProperties {
      const headersArrayLength = headersArray.map((el: {}) => Object.keys(el).length);
      const longestArrayIndex = headersArrayLength.indexOf(
         Math.max(...headersArrayLength)
      );
      return headersArray[longestArrayIndex];
   }

   private _generateColumnsElements(columnsData: ColumnProperties[]) {
      return columnsData.map(({ rows, header }: ColumnProperties): HTMLElement => {
         const columnContainer = this._elementCreator
            .container()
            .appendStyles(COMMON_STYLE_CLASS.COLUMN_CONTAINER).getElement;

         const columnsRows = rows.map(
            (rowData: SingleRowProperties): HTMLElement =>
               this._generateRowElement(rowData)
         );

         const headerElement = this._instantiateHeader(header).render();

         this._appendHeaderToColumnContainer(columnContainer, headerElement);
         this._appendElementsToColumnContainer(columnsRows, columnContainer);
         return columnContainer;
      });
   }

   private _appendNewHeaderAndRowToAcc({
      headersAccumulator,
      header,
      singleRowValuesForHeader
   }: ValuesToSaveOrAppend) {
      headersAccumulator.push({ header, rows: [singleRowValuesForHeader] });
   }

   private _appendHeaderToColumnContainer(
      columnContainer: HTMLElement,
      columnHeaderElement: HTMLElement
   ): void {
      ElementController.appendElementsToContainer(columnContainer, columnHeaderElement);
   }

   private _appendNewRowToExistingHeader({
      headersAccumulator,
      header,
      singleRowValuesForHeader
   }: ValuesToSaveOrAppend) {
      const headerIndexInAcc = headersAccumulator.findIndex(
         (element: { header: string }) => {
            return element.header === header;
         }
      );
      const existingHeaderInAcc = headersAccumulator[headerIndexInAcc];
      // @ts-ignore
      return existingHeaderInAcc.rows.push(singleRowValuesForHeader);
   }

   private _appendElementsToColumnContainer(
      columnsRows: HTMLElement[],
      columnContainer: HTMLElement
   ): void {
      columnsRows.forEach((rowElement: HTMLElement) =>
         ElementController.appendElementsToContainer(columnContainer, rowElement)
      );
   }

   private _generateRowElement(rowData: SingleRowProperties): HTMLElement {
      const instanceOfRow = new Row(this.root, rowData);
      return instanceOfRow.render();
   }

   private _instantiateHeader(txt: string): Header {
      return new LeaderboardHeader(this.root, txt);
   }
}

export default Column;
