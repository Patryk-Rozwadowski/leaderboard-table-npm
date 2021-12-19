import DOMController from "../../controllers/DOMController";
import TypographyController from "./TypographyController";
import Logger from "../../common/Logger/Logger";
import { Newable } from "../../common/common.types";
import ComponentStyleController from "../../controllers/ComponentStyleController";
import { TYPOGRAPHY_STYLE_CLASS } from "../../style/styleClasses/typography.enum";
import { ComponentFactory } from "../ElementCreator";
import { SEMANTIC_TAGS } from "../../style/semanticTags";

class TypographyFactory implements ComponentFactory<TypographyFactory> {
   private _textContentController: TypographyController;
   private _componentStyleController: ComponentStyleController;
   private _logger: Logger;

   constructor(public DOMController: DOMController) {
      this._textContentController = new TypographyController();
      this._componentStyleController = new ComponentStyleController(this.DOMController);
      this._logger = new Logger(this as unknown as Newable, false);
   }

   create(tag: SEMANTIC_TAGS, text: string): HTMLElement {
      const textElement: HTMLElement = this.DOMController.createDOMElementWithTag(tag);
      const textElementWithContent = this._textContentController.fillTextWithContent(
         textElement,
         text
      );

      // TODO: extract to method
      this._componentStyleController.appendStyles(TYPOGRAPHY_STYLE_CLASS.HEADER_PRIMARY);
      return textElementWithContent;
   }
}

export default TypographyFactory;
