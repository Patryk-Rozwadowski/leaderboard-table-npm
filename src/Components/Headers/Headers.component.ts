import PhasesState from "../../PhasesState";
import Logger from "../../common/Logger";
import { COMMON_STYLE_CLASS, SEMANTIC_TAGS } from "../style/common.enum";

enum HEADERS_STYLE_CLASS {
   CONTAINER = "lb_headers"
}

class Headers extends PhasesState {
   logger: Logger;

   constructor(private root: HTMLElement, private headersText?: string[] | undefined) {
      super();
      this.logger = new Logger(Headers);
      this.createHeaders();
   }

   private createHeaders() {
      this.logger.info(`Headers exists: ${!!this.headersText}`);
      if (!this.headersText) {
         return;
      }

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

      this.root.appendChild(headerContainer);
   }
}

export default Headers;
