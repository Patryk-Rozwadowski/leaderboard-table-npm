import PhasesState from "../../PhasesState";

class Headers extends PhasesState {
   constructor(private root: HTMLElement, private headersText: string[]) {
      super();
      this.createHeaders();
   }

   private createHeaders() {
      if (!this.isHeaderExists()) {
         return;
      }

      const headerContainer = document.createElement("div");
      headerContainer.classList.add("lb_headers");

      this.headersText.map((headerText) => {
         // TODO createElement: dynamic tag defined by user
         const headerTag = document.createElement("h5");
         headerTag.textContent = headerText;
         headerTag.classList.add("lb_headers_text", "lb_col");
         headerContainer.appendChild(headerTag);
      });
      this.root.appendChild(headerContainer);
   }

   private isHeaderExists() {
      console.log(`Headers exists: ${!!this.headersText}`);
      return !!this.headersText;
   }
}

export default Headers;
