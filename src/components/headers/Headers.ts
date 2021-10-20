import ElementCreator from "../../factories/ElementCreator";
import Logger from "../../common/Logger/Logger";
import { COMMON_STYLE_CLASS, SEMANTIC_TAGS } from "../style/common.enum";
import { Creator, Newable } from "../../common/common.types";
import ElementController from "../../common/ElementController";

enum HEADERS_LOGGER_MESSAGES {
   INIT = "Creating headers.",
   SINGLE_HEADER = "Creating single header.",
   MULTIPLE_HEADERS = "Creating multiple headers."
}

class Headers implements Creator {
   _logger: Logger;
   _elementCreator: ElementCreator;
   private _headersContainer: HTMLElement;

   constructor(private root: HTMLElement, private headersText: string | string[]) {
      this._logger = new Logger(this as unknown as Newable);
      this._elementCreator = new ElementCreator();
   }

   public render(): HTMLElement {
      this._handler();
      return this._headersContainer;
   }

   private _handler() {
      this._logger.log(HEADERS_LOGGER_MESSAGES.INIT);
      this._createHeadersContainer();
      if (Array.isArray(this.headersText)) {
         this._multipleHeadersHandler();
         return;
      }
      this._singleHeaderHandler();
   }

   private _singleHeaderHandler() {
      this._logger.log(HEADERS_LOGGER_MESSAGES.SINGLE_HEADER);
      this._createHeaderElement(this.headersText as string);
   }

   private _multipleHeadersHandler() {
      this._logger.log(HEADERS_LOGGER_MESSAGES.MULTIPLE_HEADERS);
      this._createHeadersContainer();
      const headers = this.headersText as string[];
      headers.forEach((headerText) => {
         this._createHeaderElement(headerText);
      });
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

export default Headers;
