import "./style.scss";
interface LeaderboardConfig {
   rootContainer: HTMLElement;
   // TODO data types
   data: any;
   options: {
      headerTags: string | HTMLElement;
   };
}

const Leaderboard = function ({ rootContainer, data, options }: LeaderboardConfig): void {
   // TODO implement event system
   const events = [];
   const { headerTags } = options;
   let root: HTMLElement;
   let header: HTMLElement | string;

   function mount() {
      const wrapper = document.createElement("div");
      wrapper.classList.add("leaderboard");

      const headersText = ["Header First", "Header Second"];
      root = rootContainer;

      const headersContainer = document.createElement("div");
      headersContainer.classList.add("leaderboard__headers");

      const frag = document.createDocumentFragment();
      if (headerTags instanceof HTMLElement) return;
      headersText.map((header) => {
         const tag = document.createElement(headerTags);
         tag.textContent = header;
         tag.classList.add("leaderboard__headers__text", "leaderboard__col");
         frag.appendChild(tag);
      });

      headersContainer.appendChild(frag);
      wrapper.appendChild(headersContainer);

      root.appendChild(wrapper);
   }

   function typeGuards() {
      if (
         typeof rootContainer === "undefined" ||
         !(rootContainer instanceof HTMLElement)
      ) {
         throw new Error(`Expected e to be an HTMLElement, was ${typeof rootContainer}.`);
      }
   }

   function init(): void {
      typeGuards();
      mount();
   }

   init();
};

export default Leaderboard;
