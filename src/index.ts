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

   function mount(): void {
      const headersTextMOCK = ["Header First", "Header Second"];
      const leaderboardWrapper = document.createElement("div");
      leaderboardWrapper.classList.add("lb");
      root = rootContainer;

      const headerContainer = document.createElement("div");
      headerContainer.classList.add("lb_headers");

      const rowContainer = document.createElement("div");
      rowContainer.classList.add("lb_row_wrapper");

      headersTextMOCK.map((headerText) => {
         const headerTag = document.createElement("h5");
         headerTag.textContent = headerText;
         headerTag.classList.add("lb_headers_text", "lb_col");
         headerContainer.appendChild(headerTag);
      });

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
         rowContainer.appendChild(wrapper);
      });

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
