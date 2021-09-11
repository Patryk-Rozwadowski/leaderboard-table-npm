import "./style.scss";
import { compareNumbers } from "./utils/compareNumbers";

interface LeaderboardConfig {
   rootContainer: HTMLElement;
   // TODO data types
   data: [
      {
         place: number;
         content: string;
      }
   ];
   options: {
      headerTags: string | HTMLElement;
      avatar: string;
   };
   headers: string[];
}

class Leaderboard {
   private readonly rootContainer;
   private readonly headers;
   private data;
   constructor({ rootContainer, data, headers }: LeaderboardConfig) {
      this.rootContainer = rootContainer;
      this.data = data;
      this.headers = headers;
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

   private rowOnClickHandler(e: Event) {
      console.log(e.target);
   }

   private createRow() {
      const rowContainer = document.createElement("div");
      const sortedDataByPlace = this.data.sort(
         (a: { place: number }, b: { place: number }) => compareNumbers(a.place, b.place)
      );
      rowContainer.classList.add("lb_row_wrapper");

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

   private mount(): void {
      const headerContainer = this.createHeaders(this.headers);

      const leaderboardWrapper = document.createElement("div");
      leaderboardWrapper.classList.add("lb");
      const rowContainer = this.createRow();

      leaderboardWrapper.appendChild(headerContainer);
      leaderboardWrapper.appendChild(rowContainer);

      this.rootContainer.appendChild(leaderboardWrapper);
   }

   // TODO change name
   private typeGuards() {
      if (
         typeof this.rootContainer === "undefined" ||
         !(this.rootContainer instanceof HTMLElement)
      ) {
         throw new Error(
            `Expected e to be an HTMLElement, was ${typeof this.rootContainer}.`
         );
      }
   }

   public init(): void {
      // FIRST PHASE
      this.typeGuards();

      // PARSE DATA

      // LAST PHASE
      this.mount();
   }
}

export default Leaderboard;
