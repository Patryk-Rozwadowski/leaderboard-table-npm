import { Creator, RootElementConnector } from "../../common/common.types";
import LeaderboardHeader from "../headers/Header";
import Header from "../headers/Header";
import ElementCreator from "../../factories/ElementCreator";
import ElementController from "../../common/ElementController";
import Row from "../row/Row";
import { SEMANTIC_TAGS } from "../style/common.enum";

export interface LeaderboardData {
   place: number;
   header: string;
   content: string | string[];
}

class Column implements RootElementConnector, Creator {
   root: HTMLElement;
   _elementCreator: ElementCreator;

   constructor(root: HTMLElement, private _lbData: any) {
      this.root = root;
      this._elementCreator = new ElementCreator();
   }

   public render(): HTMLElement[] {
      return this._createColumn();
   }

   private _createColumn(): HTMLElement[] {
      const columnContainer = this._elementCreator.container().getElement;
      return this._lbData.map((data: LeaderboardData) => {
         const { content, place, header } = data;
         const columnHeader = this._createColumnHeader(header);
         const row = new Row(this.root, { content, place } as any);
         ElementController.appendElementsToContainer(
            columnContainer,
            columnHeader,
            row.render()
         );
         return columnContainer;
      });
   }

   private _createColumnContent(content: string) {
      return this._elementCreator.createText(
         SEMANTIC_TAGS.PRIMARY_TEXT,
         content as string
      ).getElement;
   }

   private _createColumnHeader(txt: string) {
      const header = this._instantiateHeader(txt);
      return header.render();
   }

   private _createColumnRow() {
      const row = this._instantiateRow();
      return row;
   }

   private _instantiateHeader(txt: string): Header {
      return new LeaderboardHeader(this.root, txt);
   }

   private _instantiateRow(): Row {
      return new Row(this.root, this._lbData);
   }
}

export default Column;
