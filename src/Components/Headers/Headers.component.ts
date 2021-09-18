import PhasesState from "../../PhasesState";

class Headers extends PhasesState {
   logger: Logger;

   constructor(private root: HTMLElement, private headersText?: string[] | undefined) {
      super();
      this.logger = new Logger(Headers);
      this.createHeaders();
   }

   private createHeaders() {
      console.log(`Headers exists: ${!!this.headersText}`);

      this.logger.info(`Headers exists: ${!!this.headersText}`);
      if (!this.headersText) {
         return;
      }

      const headerContainer = document.createElement("div");
      headerContainer.classList.add("lb_headers");

      this.headersText?.map((headerText) => {
         // TODO createElement: dynamic tag defined by user
         const headerTag = document.createElement("h5");
         headerTag.textContent = headerText;
         headerTag.classList.add("lb_headers_text", "lb_col");
         headerContainer.appendChild(headerTag);
      });

      this.root.appendChild(headerContainer);
   }
}

export default Headers;
