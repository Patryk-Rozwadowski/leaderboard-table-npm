import DOMController from "../../controllers/DOMController";
import Logger from "../../common/Logger/Logger";
import ComponentStyleController from "../../controllers/ComponentStyleController";
import { TYPOGRAPHY_STYLE_CLASS } from "../../style/styleClasses/typography.enum";
import { lbLogger } from "../../common/Logger/lbLogger";
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
         lbOptions.getOptions().textPrimaryTag
      );
      const textElementWithContent = this._fillTextWithContent(textElement, text);
      this._componentStyleController.appendStyles(TYPOGRAPHY_STYLE_CLASS.TEXT_PRIMARY);

      return textElementWithContent;
   }

   createTextSecondary(text: string): HTMLElement {
      const textElement = this._createTextDomElement(
         lbOptions.getOptions().textSecondaryTag
      );
      const textElementWithContent = this._fillTextWithContent(textElement, text);
      this._componentStyleController.appendStyles(TYPOGRAPHY_STYLE_CLASS.TEXT_SECONDARY);

      return textElementWithContent;
   }

   creatHeaderPrimary(text: string): HTMLElement {
      const textElement = this._createTextDomElement(
         lbOptions.getOptions().headerPrimaryTag
      );
      const textElementWithContent = this._fillTextWithContent(textElement, text);
      this._componentStyleController.appendStyles(TYPOGRAPHY_STYLE_CLASS.HEADER_PRIMARY);
      return textElementWithContent;
   }

   creatHeaderSub(text: string): HTMLElement {
      const textElement = this._createTextDomElement(lbOptions.getOptions().headerSubTag);
      const textElementWithContent = this._fillTextWithContent(textElement, text);
      this._componentStyleController.appendStyles(TYPOGRAPHY_STYLE_CLASS.SUB_HEADER);
      return textElementWithContent;
   }

   private _createTextDomElement(tag: string) {
      return this._domController.createDOMElementWithTag(tag);
   }

   private _fillTextWithContent(textElement: HTMLElement, text: string): HTMLElement {
      const textElementToFill = textElement;
      textElementToFill.textContent = `${text}`;
      return textElementToFill;
   }
}

export default TypographyFactory;
