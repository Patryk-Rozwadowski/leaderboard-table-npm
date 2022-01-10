import Cell from "./Cell";

describe("Cell component", () => {
   const cellData = "name";
   let root: HTMLElement;
   let cell: Cell;
   beforeEach(() => {
      root = document.createElement("div");
      root.classList.add(".leaderboard-root");
      cell = new Cell(root, cellData);
   });

   it("should be created and appended to it's container", () => {
      expect(cell.create()).toMatchSnapshot();
   });

   it("container should be created", () => {
      expect(cell["_createCellContainer"]()).toMatchSnapshot();
   });

   it("text content element should be created", () => {
      expect(cell["_cellContentText"]()).toMatchSnapshot();
   });

   it("content container should be created", () => {
      expect(cell["_createCellContainer"]()).toMatchSnapshot();
   });
});
