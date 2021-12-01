import { SEMANTIC_TAGS } from "../../components/style/common.enum";
import ComponentFactory from "../ComponentFactory";
import TextContentController from "./TextContentController";
import Logger from "../../common/Logger/Logger";
import { Newable } from "../../common/common.types";
import ElementController from "../../common/ElementController";

type TextElementToCreate = { tag: SEMANTIC_TAGS; text: string };

enum TextFactoryLogMsg {
   CREATING_HEADER_TEXT = "Creating header text.",
   CREATING_PRIMARY_TEXT = "Creating primary text.",
   CREATING_SECONDARY_TEXT = "Creating secondary text."
}

enum TEXT_STYLE_CLASS {
   HEADER_PRIMARY = "lb_header_text_primary",
   HEADER_SECONDARY = "lb_header_text_secondary",

   TEXT_PRIMARY = "lb_text_primary",
   TEXT_SECONDARY = "lb_text_secondary"
}

class TextFactory extends ComponentFactory {
   private _textContentController: TextContentController;
   private _logger: Logger;

   constructor() {
      super();
      this._textContentController = new TextContentController();
      this._logger = new Logger(this as unknown as Newable, false);
   }

   createText({ tag, text }: TextElementToCreate): HTMLElement {
      const textElement: HTMLElement = this._createElement(tag);
      const textElementWithContent = this._textContentController.fillTextWithContent(
         textElement,
         text
      );
      this._setElementToCreate(textElementWithContent);
      this._textStylesAppendHandler(tag);
      return textElementWithContent;
   }

   private _textStylesAppendHandler(tag: SEMANTIC_TAGS): void {
      switch (tag) {
         case SEMANTIC_TAGS.HEADER_TEXT:
            this._appendStylesToPrimaryText();
            break;

         case SEMANTIC_TAGS.SECONDARY_TEXT:
            this._appendStylesToSecondaryText();
            break;
      }
   }

   private _appendStylesToPrimaryText(): void {
      this._logger.log(TextFactoryLogMsg.CREATING_PRIMARY_TEXT);
      ElementController.appendStyles(this._getTextElement, TEXT_STYLE_CLASS.TEXT_PRIMARY);
   }

   private _appendStylesToSecondaryText(): void {
      this._logger.log(TextFactoryLogMsg.CREATING_SECONDARY_TEXT);
      ElementController.appendStyles(
         this._getTextElement,
         TEXT_STYLE_CLASS.HEADER_SECONDARY
      );
   }
}

export { TEXT_STYLE_CLASS };
export default TextFactory;
