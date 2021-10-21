import { Creator, RootElementConnector } from "../../common/common.types";
import Headers from "../headers/Headers";
import ElementCreator from "../../factories/ElementCreator";
import ElementController from "../../common/ElementController";

class Column implements RootElementConnector, Creator {
   root: HTMLElement;
   _elementCreator: ElementCreator;
   private _header: Headers;

   constructor(root: HTMLElement, clientHeaders: string | string[]) {
      this.root = root;
      this._header = new Headers(root, clientHeaders);
      this._elementCreator = new ElementCreator();
      this._createColumn();
   }

   private _createColumn() {
      const columnContainer = this._elementCreator.container().getElement;
      const header = this._header.render();
      ElementController.appendElementsToContainer(columnContainer, header);
   }
}

export default Column;
