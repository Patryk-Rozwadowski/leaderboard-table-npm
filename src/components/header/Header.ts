import ElementCreator from "../../creators/ElementCreator";
import { COMMON_STYLE_CLASS, SEMANTIC_TAGS } from "../style/common.enum";
import { Component, Newable } from "../../common/common.types";
import ElementController from "../../common/ElementController";
import Logger from "../../common/Logger/Logger";

enum HEADERS_LOGGER_MESSAGES {
   INIT = "Creating headers.",
   SINGLE_HEADER = "Creating single header.",
   MULTIPLE_HEADERS = "Creating multiple headers."
}

class Header implements Component {
   _elementCreator: ElementCreator;
   private _logger: Logger;
   private _headersContainer: HTMLElement;

   constructor(private root: HTMLElement, private clientHeaders: string) {
      this._logger = new Logger(this as unknown as Newable);
      this._elementCreator = new ElementCreator();
   }

   public render(): HTMLElement {
      this._handler();
      return this._headersContainer;
   }

   private _handler() {
      this._createHeadersContainer();
      this._singleHeaderHandler();
   }

   private _singleHeaderHandler() {
      this._createHeaderElement(this.clientHeaders);
   }

   private _createHeaderElement(text: string) {
      const headerTag = this._elementCreator
         .createText(SEMANTIC_TAGS.HEADER_TEXT, text)
         .appendStyles(COMMON_STYLE_CLASS.HEADER_PRIMARY).getElement;
      ElementController.appendElementsToContainer(this._headersContainer, headerTag);
   }

   private _createHeadersContainer() {
      this._headersContainer = this._elementCreator
         .container()
         .appendStyles(COMMON_STYLE_CLASS.HEADERS_CONTAINER).getElement;
   }
}

export default Header;
