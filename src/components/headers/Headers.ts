import ElementCreator from "../../factories/ElementCreator";
import Logger from "../../common/Logger/Logger";
import { COMMON_STYLE_CLASS, SEMANTIC_TAGS } from "../style/common.enum";
import { Creator, Newable } from "../../common/common.types";

class Headers implements Creator {
   _logger: Logger;
   _elementCreator: ElementCreator;

   constructor(private root: HTMLElement, private headersText: string[]) {
      this._logger = new Logger(this as unknown as Newable);
      this._elementCreator = new ElementCreator();
   }

   public render(): HTMLElement {
      this._logger.log(`Creating headers.`);
      const headerContainer = this._elementCreator
         .container()
         .appendStyles(COMMON_STYLE_CLASS.HEADERS_CONTAINER).getElement;

      this.headersText.map((headerText) => {
         const headerTag = this._elementCreator
            .createText(SEMANTIC_TAGS.HEADER_TEXT, headerText)
            .appendStyles(COMMON_STYLE_CLASS.HEADER_PRIMARY).getElement;

         headerContainer.appendChild(headerTag);
      });

      return headerContainer;
   }
}

export default Headers;
