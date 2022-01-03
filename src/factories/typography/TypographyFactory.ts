import DOMController from "../../controllers/DOMController";
import Logger from "../../common/Logger/Logger";
import ComponentStyleController from "../../controllers/ComponentStyleController";
import { TYPOGRAPHY_STYLE_CLASS } from "../../style/styleClasses/typography.enum";
import { lbLogger } from "../../common/Logger/lbLogger";
import {
   SEMANTIC_TYPOGRAPHY_TAGS,
   SEMANTIC_TYPOGRAPHY_TYPES,
   SemanticHeaderTags,
   SemanticTextTags
} from "../../style/semanticTags/typography.enum";

class TypographyFactory {
   private _componentStyleController: ComponentStyleController;
   private _logger: Logger;

   constructor(public DOMController: DOMController) {
      this._componentStyleController = new ComponentStyleController(this.DOMController);
      this._logger = lbLogger;
   }

   createText(
      tag: SemanticTextTags,
      text: string,
      type: SEMANTIC_TYPOGRAPHY_TYPES
   ): HTMLElement {
      const textElement = this._createTextDomElement(tag);
      const textElementWithContent = this._fillTextWithContent(textElement, text);
      switch (type) {
         case SEMANTIC_TYPOGRAPHY_TYPES.PRIMARY: {
            this._componentStyleController.appendStyles(
               TYPOGRAPHY_STYLE_CLASS.TEXT_PRIMARY
            );
            break;
         }
         case SEMANTIC_TYPOGRAPHY_TYPES.SECONDARY: {
            this._componentStyleController.appendStyles(
               TYPOGRAPHY_STYLE_CLASS.TEXT_SECONDARY
            );
            break;
         }
      }
      return textElementWithContent;
   }

   creatHeaderHeader(tag: SemanticHeaderTags, text: string): HTMLElement {
      const textElement = this._createTextDomElement(tag);
      const textElementWithContent = this._fillTextWithContent(textElement, text);
      switch (tag as SEMANTIC_TYPOGRAPHY_TAGS) {
         case SEMANTIC_TYPOGRAPHY_TAGS.HEADER_PRIMARY_TEXT: {
            this._componentStyleController.appendStyles(
               TYPOGRAPHY_STYLE_CLASS.HEADER_PRIMARY
            );
            break;
         }
         case SEMANTIC_TYPOGRAPHY_TAGS.SUB_HEADER_TEXT: {
            this._componentStyleController.appendStyles(
               TYPOGRAPHY_STYLE_CLASS.SUB_HEADER
            );
            break;
         }
      }
      return textElementWithContent;
   }

   private _createTextDomElement(tag: SemanticTextTags | SemanticHeaderTags) {
      return this.DOMController.createDOMElementWithTag(tag);
   }

   private _fillTextWithContent(textElement: HTMLElement, text: string): HTMLElement {
      const textElementToFill = textElement;
      textElementToFill.textContent = `${text}`;
      return textElementToFill;
   }
}

export default TypographyFactory;
