import { compareNumbers } from "../../sorters/compareNumbers";
import PhasesState from "../../PhasesState";
import ParseData from "../ParseData/ParseData";

class Mount extends PhasesState {
   [x: string]: any;

   rootContainer: HTMLElement;

   constructor(rootContainer: HTMLElement, data: any) {
      super();
      this.rootContainer = rootContainer;
      this.data = data;
   }

   public mount(): void {
      console.log(this.context);
      const headersTextMOCK = ["Header First", "Header Second"];

      const headerContainer = this.createHeaders(headersTextMOCK);

      const leaderboardWrapper = document.createElement("div");
      leaderboardWrapper.classList.add("lb");
      const rowContainer = this.createRow();

      leaderboardWrapper.appendChild(headerContainer);
      leaderboardWrapper.appendChild(rowContainer);

      this.rootContainer.appendChild(leaderboardWrapper);
      this.context.transitionTo(new ParseData());
   }

   private createRow() {
      const rowContainer = document.createElement("div");
      const sortedDataByPlace = this.data.sort(
         (a: { place: number }, b: { place: number }) => compareNumbers(a.place, b.place)
      );
      rowContainer.classList.add("lb_row_wrapper");

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Object.entries(sortedDataByPlace).map(([_, { place, content }]) => {
         const wrapper = document.createElement("div");
         wrapper.classList.add("lb_row");

         const placeNode = document.createElement("p");
         placeNode.classList.add("lb_row_place");
         placeNode.textContent = `${place}`;

         const contentNode = document.createElement("p");
         contentNode.classList.add("lb_row_content");
         contentNode.textContent = content;

         wrapper.appendChild(placeNode);
         wrapper.appendChild(contentNode);
         wrapper.addEventListener("click", this.rowOnClickHandler);
         rowContainer.appendChild(wrapper);
      });

      return rowContainer;
   }

   private createHeaders(headersTextMOCK: string[]) {
      const headerContainer = document.createElement("div");
      headerContainer.classList.add("lb_headers");

      headersTextMOCK.map((headerText) => {
         const headerTag = document.createElement("h5");
         headerTag.textContent = headerText;
         headerTag.classList.add("lb_headers_text", "lb_col");
         headerContainer.appendChild(headerTag);
      });
      return headerContainer;
   }
}

export default Mount;
