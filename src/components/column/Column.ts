import { Creator, Newable, RootElementConnector } from "../../common/common.types";
import LeaderboardHeader from "../headers/Header";
import Header from "../headers/Header";
import ElementCreator from "../../factories/ElementCreator";
import Row from "../row/Row";
import Logger from "../../common/Logger/Logger";
import ElementController from "../../common/ElementController";
import { SEMANTIC_TAGS } from "../style/common.enum";
import { PreParsedLeaderboardData } from "../../index";

/**
 * @type ColumnProperties type for column data which is after whole
 * data parsing process and ready to use.
 */
interface ColumnProperties {
   header: string;
   rows: SingleRowProperties[];
}

export type SingleRowProperties = { [key: string]: string | number };

interface ValuesToSaveOrAppend {
   headersAccumulator: ColumnProperties[];
   header: string;
   singleRowValuesForHeader: SingleRowProperties;
}

class Column implements RootElementConnector, Creator {
   root: HTMLElement;
   _elementCreator: ElementCreator;
   private _logger: Logger;

   constructor(root: HTMLElement, private _lbData: Partial<PreParsedLeaderboardData>[]) {
      this.root = root;
      this._elementCreator = new ElementCreator();
      this._logger = new Logger(this as unknown as Newable);
   }

   public render(): HTMLElement[] {
      return this._createColumns();
   }

   private _createColumns() {
      const columnsData = this._lbData.reduce(
         (
            headersAccumulator: ColumnProperties[],
            preParsedElement: Partial<PreParsedLeaderboardData>
         ): ColumnProperties[] => {
            const preParsedHeaders = Object.keys(preParsedElement);
            preParsedHeaders.forEach((header: string): void => {
               const singleRowValuesForHeader = preParsedElement[
                  header
               ] as unknown as SingleRowProperties;

               const isHeaderAlreadyExistsInAcc: boolean = headersAccumulator.some(
                  (currentIteratedElement: { header: string }) =>
                     currentIteratedElement.header === header
               );

               const valuesToSaveOrAppend: ValuesToSaveOrAppend = {
                  headersAccumulator,
                  header,
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
      return this._generateColumns(columnsData);
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
         (el: { [x: string]: any }) => {
            return el.header === header;
         }
      );
      const existingHeaderInAcc = headersAccumulator[headerIndexInAcc];
      return existingHeaderInAcc.rows.push(singleRowValuesForHeader);
   }

   private _generateColumns(columnsData: ColumnProperties[]) {
      return columnsData.map(({ rows, header }: ColumnProperties): HTMLElement => {
         const columnContainer = this._elementCreator.container().getElement;
         const columnHeaderElement = this._generateColumnHeader(header);
         const columnsRows = rows.map((rowData: any): HTMLElement => {
            return this._generateRowElement(rowData);
         });

         this._appendHeaderToColumnContainer(columnContainer, columnHeaderElement);
         this._appendElementsToColumnContainer(columnsRows, columnContainer);
         return columnContainer;
      });
   }

   private _appendElementsToColumnContainer(
      columnsRows: HTMLElement[],
      columnContainer: HTMLElement
   ): void {
      columnsRows.forEach((rowElement: HTMLElement) =>
         ElementController.appendElementsToContainer(columnContainer, rowElement)
      );
   }

   private _generateColumnHeader(headerText: string) {
      return this._elementCreator.createText(SEMANTIC_TAGS.PRIMARY_TEXT, headerText)
         .getElement;
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
