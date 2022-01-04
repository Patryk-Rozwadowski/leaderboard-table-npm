import DOMController from "../../controllers/DOMController";
import Logger from "../../common/Logger/Logger";
import ComponentStyleController from "../../controllers/ComponentStyleController";
import { TYPOGRAPHY_STYLE_CLASS } from "../../style/styleClasses/typography.enum";
import { lbLogger } from "../../common/Logger/lbLogger";
import {
   SemanticHeaderTags,
   SemanticTextTags
} from "../../style/semanticTags/typography.enum";
import { lbOptions } from "../../common/options/lbOptions";

class TypographyFactory {
   private _componentStyleController: ComponentStyleController;
   private _logger: Logger;

   constructor(private _domController: DOMController) {
      this._componentStyleController = new ComponentStyleController(this._domController);
      this._logger = lbLogger;
   }

   createTextPrimary(text: string): HTMLElement {
      const textElement = this._createTextDomElement(
         lbOptions.getOptions().TEXT_PRIMARY_TAG
      );
      const textElementWithContent = this._fillTextWithContent(textElement, text);
      this._componentStyleController.appendStyles(TYPOGRAPHY_STYLE_CLASS.TEXT_PRIMARY);

      return textElementWithContent;
   }

   createTextSecondary(text: string): HTMLElement {
      const textElement = this._createTextDomElement(
         lbOptions.getOptions().TEXT_SECONDARY_TAG
      );
      const textElementWithContent = this._fillTextWithContent(textElement, text);
      this._componentStyleController.appendStyles(TYPOGRAPHY_STYLE_CLASS.TEXT_SECONDARY);

      return textElementWithContent;
   }

   creatHeaderPrimary(text: string): HTMLElement {
      const textElement = this._createTextDomElement(
         lbOptions.getOptions().HEADER_PRIMARY_TAG
      );
      const textElementWithContent = this._fillTextWithContent(textElement, text);
      this._componentStyleController.appendStyles(TYPOGRAPHY_STYLE_CLASS.HEADER_PRIMARY);
      return textElementWithContent;
   }

   creatHeaderSub(text: string): HTMLElement {
      const textElement = this._createTextDomElement(
         lbOptions.getOptions().HEADER_SUB_TAG
      );
      const textElementWithContent = this._fillTextWithContent(textElement, text);
      this._componentStyleController.appendStyles(TYPOGRAPHY_STYLE_CLASS.SUB_HEADER);
      return textElementWithContent;
   }

   private _createTextDomElement(tag: SemanticTextTags | SemanticHeaderTags) {
      return this._domController.createDOMElementWithTag(tag as unknown as string);
   }

   private _fillTextWithContent(textElement: HTMLElement, text: string): HTMLElement {
      const textElementToFill = textElement;
      textElementToFill.textContent = `${text}`;
      return textElementToFill;
   }
}

export default TypographyFactory;
