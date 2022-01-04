import TypographyFactory from "../typography/TypographyFactory";
import DOMController from "../../controllers/DOMController";
import ContainerFactory from "../container/ContainerFactory";
import { CONTAINER_STYLE_CLASS } from "../../style/styleClasses/container.enum";
import { SEMANTIC_CONTAINER_TAGS } from "../../style/semanticTags/container.enum";

/**
 * @class ElementCreator is facade and it's used whenever is need to create
 * native DOM elements.
 */
class ElementCreator {
   DOMController: DOMController;
   containerFactory: ContainerFactory;
   typographyFactory: TypographyFactory;

   constructor() {
      this.DOMController = new DOMController();
      this.typographyFactory = new TypographyFactory(this.DOMController);
      this.containerFactory = new ContainerFactory(this.DOMController);
   }

   createContainer(
      tag: SEMANTIC_CONTAINER_TAGS,
      containerStyle: CONTAINER_STYLE_CLASS
   ): HTMLElement {
      return this.containerFactory.createContainer(tag, containerStyle);
   }

   createTextPrimary(text: string): HTMLElement {
      return this.typographyFactory.createTextPrimary(text);
   }

   createTextSecondary(text: string): HTMLElement {
      return this.typographyFactory.createTextSecondary(text);
   }

   createHeaderPrimary(text: string): HTMLElement {
      return this.typographyFactory.creatHeaderPrimary(text);
   }

   createHeaderSub(text: string): HTMLElement {
      return this.typographyFactory.creatHeaderSub(text);
   }
}

export default ElementCreator;
