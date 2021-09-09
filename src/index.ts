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
      leaderboardWrapper.classList.add("leaderboard");
      root = rootContainer;

      const headerContainer = document.createElement("div");
      headerContainer.classList.add("leaderboard__headers");

      const rowContainer = document.createElement("div");
      rowContainer.classList.add("wrapper__row");

      headersTextMOCK.map((headerText) => {
         const headerTag = document.createElement("h5");
         headerTag.textContent = headerText;
         headerTag.classList.add("leaderboard__headers__text", "leaderboard__col");
         headerContainer.appendChild(headerTag);
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).map(([_, { content, place }]) => {
         const wrapper = document.createElement("div");
         wrapper.classList.add("leaderboard__row");

         const placeText = document.createElement("p");
         placeText.textContent = `${place}`;

         const contentText = document.createElement("p");
         contentText.textContent = content;

         wrapper.appendChild(contentText);
         wrapper.appendChild(placeText);
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
