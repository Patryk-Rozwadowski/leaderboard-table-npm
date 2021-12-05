import DOMController from "../../controllers/DOMController";
import TypographyController from "./TypographyController";
import Logger from "../../common/Logger/Logger";
import { Newable } from "../../common/common.types";
import ComponentStyleController from "../../controllers/ComponentStyleController";
import { COMPONENT_TYPES } from "../../style/semanticTags/container.enum";

type TextElementToCreate = {
   tag: COMPONENT_TYPES.TYPOGRAPHY;
   text: string;
};

class TypographyFactory {
   private readonly _DOMController: DOMController;
   private _textContentController: TypographyController;
   private _componentStyleController: ComponentStyleController;
   private _logger: Logger;

   constructor() {
      this._DOMController = new DOMController();
      this._textContentController = new TypographyController();
      this._componentStyleController = new ComponentStyleController(this._DOMController);
      this._logger = new Logger(this as unknown as Newable, false);
   }

   create({ tag, text }: TextElementToCreate): HTMLElement {
      // TODO: logger for creating text element
      // this._logger.log(`Creating ${Object.entries(SEMANTIC_TAGS_.text)}`);
      const textElement: HTMLElement = this._DOMController.createDOMElementWithTag(tag);
      const textElementWithContent = this._textContentController.fillTextWithContent(
         textElement,
         text
      );
      this._DOMController.setElementToProcess(textElementWithContent);
      this._componentStyleController.appendStyles(tag);
      return textElementWithContent;
   }
}

export default TypographyFactory;
