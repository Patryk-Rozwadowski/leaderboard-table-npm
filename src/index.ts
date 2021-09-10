import "./style.scss";

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
}

const Leaderboard = function ({ rootContainer, data }: LeaderboardConfig): void {
   // TODO implement event system
   const events = [];
   let root: HTMLElement;

   function createHeaders(headersTextMOCK: string[]) {
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

   function rowOnClickHandler(e: Event) {
      console.log(e.target);
   }

   function createRow() {
      const rowContainer = document.createElement("div");
      rowContainer.classList.add("lb_row_wrapper");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).map(([_, { place, content }]) => {
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
         wrapper.addEventListener("click", rowOnClickHandler);
         rowContainer.appendChild(wrapper);
      });

      return rowContainer;
   }

   function mount(): void {
      const headersTextMOCK = ["Header First", "Header Second"];
      const headerContainer = createHeaders(headersTextMOCK);

      const leaderboardWrapper = document.createElement("div");
      leaderboardWrapper.classList.add("lb");
      root = rootContainer;

      const rowContainer = createRow();
      leaderboardWrapper.appendChild(headerContainer);
      leaderboardWrapper.appendChild(rowContainer);

      root.appendChild(leaderboardWrapper);
   }

   // TODO change name
   function typeGuards() {
      if (
         typeof rootContainer === "undefined" ||
         !(rootContainer instanceof HTMLElement)
      ) {
         throw new Error(`Expected e to be an HTMLElement, was ${typeof rootContainer}.`);
      }
   }

   function init(): void {
      console.log({ data });

      // FIRST PHASE
      typeGuards();

      // PARSE DATA

      // LAST PHASE
      mount();
   }

   init();
};

export default Leaderboard;
