import ComponentFactory from "../ComponentFactory";
import TextContentController from "./TextContentController";
import Logger from "../../common/Logger/Logger";
import { Newable } from "../../common/common.types";
import ElementController from "../../controllers/ElementController";
import { SEMANTIC_TAGS } from "../../components/style/semanticTags/semanticContainerTags.enum";
import { TYPOGRAPHY_STYLE_CLASS } from "../../components/style/classes/typographyStyle.enum";

type TextElementToCreate = { tag: SEMANTIC_TAGS; text: string };

enum TextFactoryLogMsg {
   CREATING_HEADER_TEXT = "Creating header text.",
   CREATING_SUB_HEADER_TEXT = "Creating sub-header text.",
   CREATING_PRIMARY_TEXT = "Creating primary text.",
   CREATING_SECONDARY_TEXT = "Creating secondary text."
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
      this._setElementToProcess(textElementWithContent);
      this._textStylesAppendHandler(tag);
      return textElementWithContent;
   }

   private _textStylesAppendHandler(tag: SEMANTIC_TAGS): void {
      switch (tag) {
         case SEMANTIC_TAGS.HEADER_TEXT:
            this._appendStylesToHeaderText();
            break;

         case SEMANTIC_TAGS.SUB_HEADER_TEXT:
            this._appendStylesToSubHeaderText();
            break;

         case SEMANTIC_TAGS.PRIMARY_TEXT:
            this._appendStylesToPrimaryText();
            break;

         case SEMANTIC_TAGS.SECONDARY_TEXT:
            this._appendStylesToSecondaryText();
            break;
      }
   }

   private _appendStylesToHeaderText(): void {
      this._logger.log(TextFactoryLogMsg.CREATING_HEADER_TEXT);
      ElementController.appendStyles(
         this._getTextElement,
         TYPOGRAPHY_STYLE_CLASS.HEADER_PRIMARY
      );
   }

   private _appendStylesToSubHeaderText(): void {
      this._logger.log(TextFactoryLogMsg.CREATING_SUB_HEADER_TEXT);
      ElementController.appendStyles(
         this._getTextElement,
         TYPOGRAPHY_STYLE_CLASS.SUB_HEADER
      );
   }

   private _appendStylesToPrimaryText(): void {
      this._logger.log(TextFactoryLogMsg.CREATING_PRIMARY_TEXT);
      ElementController.appendStyles(
         this._getTextElement,
         TYPOGRAPHY_STYLE_CLASS.TEXT_PRIMARY
      );
   }

   private _appendStylesToSecondaryText(): void {
      this._logger.log(TextFactoryLogMsg.CREATING_SECONDARY_TEXT);
      ElementController.appendStyles(
         this._getTextElement,
         TYPOGRAPHY_STYLE_CLASS.TEXT_SECONDARY
      );
   }
}

export default TextFactory;
