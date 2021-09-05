interface LeaderboardConfig {
    rootContainer: HTMLElement;

    // TODO data types
    data: any;
}

const Leaderboard = function ({rootContainer, data}: LeaderboardConfig): void {
    // TODO implement event system
    const events = [];
    let root: HTMLElement;

    function mount() {

        root = rootContainer;
        const frag = document.createDocumentFragment();

        const headerTag = "h1";
        const headers = ["Header First", "Header Second"];

        headers.map(header => {
            let tag = document.createElement(headerTag);
            tag.textContent = header;
            frag.appendChild(tag);
        })
        root.appendChild(frag);
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
}

export default Leaderboard

