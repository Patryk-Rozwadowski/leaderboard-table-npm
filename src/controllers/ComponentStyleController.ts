import DOMController from "./DOMController";
import { TYPOGRAPHY_STYLE_CLASS } from "../common/styleClasses/typography.enum";

class ComponentStyleController {
   constructor(private _DOMController: DOMController) {}

   appendStyles(semanticType: TYPOGRAPHY_STYLE_CLASS): void {
      this._DOMController.appendStyles(semanticType);
   }
}

export default ComponentStyleController;
