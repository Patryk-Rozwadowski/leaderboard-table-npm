import DOMController from "../../controllers/DOMController";
import TypographyController from "./TypographyController";
import Logger from "../../common/Logger/Logger";
import { Newable } from "../../common/common.types";
import { SEMANTIC_TAGS } from "../../style/semanticTags/semanticContainerTags.enum";
import { TYPOGRAPHY_STYLE_CLASS } from "../../style/classes/typographyStyle.enum";
import ComponentStyleController from "../../controllers/ComponentStyleController";
import { SEMANTIC_TEXT_TAGS } from "../../style/semanticTags/semanticTextTags.enum";

type TextElementToCreate = { tag: SEMANTIC_TAGS<SEMANTIC_TEXT_TAGS>; text: string };

enum TypographyFactoryLogMsg {
   CREATING_HEADER_TEXT = "Creating header text.",
   CREATING_SUB_HEADER_TEXT = "Creating sub-header text.",
   CREATING_PRIMARY_TEXT = "Creating primary text.",
   CREATING_SECONDARY_TEXT = "Creating secondary text."
}

class TypographyFactory {
   private _DOMController: DOMController;
   private _textContentController: TypographyController;
   private _componentStyleController: ComponentStyleController;
   private _logger: Logger;

   constructor() {
      this._DOMController = new DOMController();
      this._textContentController = new TypographyController();
      this._componentStyleController = new ComponentStyleController();
      this._logger = new Logger(this as unknown as Newable, false);
   }

   create({ tag, text }: TextElementToCreate): HTMLElement {
      const textElement: HTMLElement = this._DOMController.createDOMElementWithTag(tag);
      const textElementWithContent = this._textContentController.fillTextWithContent(
         textElement,
         text
      );
      this._DOMController.setElementToProcess(textElementWithContent);
      this._appendStyles(tag);
      return textElementWithContent;
   }

   private _appendStyles(semanticTag: SEMANTIC_TAGS): void {
      switch (semanticTag) {
         case SEMANTIC_TEXT_TAGS.HEADER_TEXT:
            this._logger.log(TypographyFactoryLogMsg.CREATING_HEADER_TEXT);
            this._DOMController.appendStyles(TYPOGRAPHY_STYLE_CLASS.HEADER_PRIMARY);
            break;

         case SEMANTIC_TEXT_TAGS.SUB_HEADER_TEXT:
            this._logger.log(TypographyFactoryLogMsg.CREATING_SUB_HEADER_TEXT);
            this._DOMController.appendStyles(TYPOGRAPHY_STYLE_CLASS.SUB_HEADER);
            break;

         case SEMANTIC_TEXT_TAGS.PRIMARY_TEXT:
            this._logger.log(TypographyFactoryLogMsg.CREATING_PRIMARY_TEXT);
            this._DOMController.appendStyles(TYPOGRAPHY_STYLE_CLASS.TEXT_PRIMARY);
            break;

         case SEMANTIC_TEXT_TAGS.SECONDARY_TEXT:
            this._logger.log(TypographyFactoryLogMsg.CREATING_SECONDARY_TEXT);
            this._DOMController.appendStyles(TYPOGRAPHY_STYLE_CLASS.TEXT_SECONDARY);
            break;
      }
   }
}

export default TypographyFactory;
