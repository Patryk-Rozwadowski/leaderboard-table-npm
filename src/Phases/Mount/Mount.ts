import { compareNumbers } from "../../sorters/compareNumbers";
import PhasesState from "../../PhasesState";
import ParseData from "../ParseData/ParseData";
import Headers from "../../components/Headers/Headers.component";

class Mount extends PhasesState {
   [x: string]: any;

   constructor(
      private rootContainer: HTMLElement,
      private data: any,
      private headers: string[]
   ) {
      super();
      this.rootContainer = rootContainer;
   }

   public mount(): void {
      const leaderboardWrapper = document.createElement("div");
      leaderboardWrapper.classList.add("lb");
      const rowContainer = this.createRow();

      leaderboardWrapper.appendChild(rowContainer);
      this.context.transitionTo(new Headers(this.rootContainer, this.headers));
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
}

export default Mount;
