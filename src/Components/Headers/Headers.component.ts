import Logger from "../../common/Logger/Logger";
import { COMMON_STYLE_CLASS, SEMANTIC_TAGS } from "../style/common.enum";
import { Newable } from "../../common/common.types";

enum HEADERS_STYLE_CLASS {
   CONTAINER = "lb_headers"
}

class Headers {
   _logger: Logger;

   constructor(private root: HTMLElement, private headersText?: string[] | undefined) {
      this._logger = new Logger(this as unknown as Newable);
   }

   public render(): HTMLElement {
      const headerContainer = document.createElement(SEMANTIC_TAGS.CONTAINER_PRIMARY);
      headerContainer.classList.add(HEADERS_STYLE_CLASS.CONTAINER);

      this.headersText?.map((headerText) => {
         // TODO createElement: dynamic tag defined by user
         const headerTag = document.createElement("h5");
         headerTag.textContent = headerText;
         headerTag.classList.add(
            COMMON_STYLE_CLASS.TEXT_PRIMARY,
            COMMON_STYLE_CLASS.COLUMN
         );
         headerContainer.appendChild(headerTag);
      });

      return headerContainer;
   }
}

export default Headers;
