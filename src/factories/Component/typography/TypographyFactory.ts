import DOMController from "../../../controllers/DOMController";
import TypographyContentController from "./TypographyContentController";
import Logger from "../../../common/Logger/Logger";
import { Newable } from "../../../common/common.types";
import { SEMANTIC_TAGS } from "../../../components/style/semanticTags/semanticContainerTags.enum";
import { TYPOGRAPHY_STYLE_CLASS } from "../../../components/style/classes/typographyStyle.enum";

type TextElementToCreate = { tag: SEMANTIC_TAGS; text: string };

enum TypographyFactoryLogMsg {
   CREATING_HEADER_TEXT = "Creating header text.",
   CREATING_SUB_HEADER_TEXT = "Creating sub-header text.",
   CREATING_PRIMARY_TEXT = "Creating primary text.",
   CREATING_SECONDARY_TEXT = "Creating secondary text."
}

class TypographyFactory extends DOMController {
   private _textContentController: TypographyContentController;
   private _logger: Logger;

   constructor() {
      super();
      this._textContentController = new TypographyContentController();
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

   private _textStylesAppendHandler(semanticTag: SEMANTIC_TAGS): void {
      switch (semanticTag) {
         case SEMANTIC_TAGS.HEADER_TEXT:
            this._logger.log(TypographyFactoryLogMsg.CREATING_HEADER_TEXT);
            this._appendStyles(TYPOGRAPHY_STYLE_CLASS.HEADER_PRIMARY);
            break;

         case SEMANTIC_TAGS.SUB_HEADER_TEXT:
            this._logger.log(TypographyFactoryLogMsg.CREATING_SUB_HEADER_TEXT);
            this._appendStyles(TYPOGRAPHY_STYLE_CLASS.SUB_HEADER);

            break;

         case SEMANTIC_TAGS.PRIMARY_TEXT:
            this._logger.log(TypographyFactoryLogMsg.CREATING_PRIMARY_TEXT);
            this._appendStyles(TYPOGRAPHY_STYLE_CLASS.TEXT_PRIMARY);

            break;

         case SEMANTIC_TAGS.SECONDARY_TEXT:
            this._logger.log(TypographyFactoryLogMsg.CREATING_SECONDARY_TEXT);
            this._appendStyles(TYPOGRAPHY_STYLE_CLASS.TEXT_SECONDARY);
            break;
      }
   }
}

export default TypographyFactory;
