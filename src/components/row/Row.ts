import ElementCreator from "../../factories/ElementCreator";
import { SEMANTIC_TAGS } from "../style/common.enum";
import { compareNumbers } from "../../sorters/compareNumbers";
import { Creator } from "../../common/common.types";

enum ROW_CLASS_STYLE {
   CONTAINER_ROW_LIST = "lb_row_wrapper",
   ROW = "lb_row",
   PLACE = "lb_row_place",
   CONTENT = "lb_row_content"
}

class Rows implements Creator {
   _elementCreator: ElementCreator;

   constructor(private _rootContainer: HTMLElement, private _rowData: string[]) {
      this._elementCreator = new ElementCreator();
   }

   public render(): HTMLElement {
      const rowContainer = this._elementCreator
         .container(SEMANTIC_TAGS.CONTAINER_ROW)
         .appendStyles(ROW_CLASS_STYLE.CONTAINER_ROW_LIST).getElement;

      const sortedDataByPlace = this._rowData.sort(
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
         // @ts-ignore
         (a: { place: number }, b: { place: number }) => compareNumbers(a.place, b.place)
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Object.entries(sortedDataByPlace).map(([_, { place, content }]) => {
         const wrapper = this._elementCreator
            .container(SEMANTIC_TAGS.CONTAINER_ROW)
            .appendStyles(ROW_CLASS_STYLE.ROW).getElement;

         const placeNode = this._elementCreator
            .createText(SEMANTIC_TAGS.PRIMARY_TEXT, place)
            .appendStyles(ROW_CLASS_STYLE.PLACE).getElement;

         const contentNode = this._elementCreator
            .createText(SEMANTIC_TAGS.PRIMARY_TEXT, content)
            .appendStyles(ROW_CLASS_STYLE.CONTENT).getElement;

         wrapper.appendChild(placeNode);
         wrapper.appendChild(contentNode);
         wrapper.addEventListener("click", this.rowOnClickHandler);
         rowContainer.appendChild(wrapper);
      });
      return rowContainer;
   }

   private rowOnClickHandler(e: Event) {
      console.log(e.target);
   }
}
export { ROW_CLASS_STYLE };
export default Rows;
