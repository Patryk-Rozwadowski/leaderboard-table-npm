import TypographyFactory from "../typography/TypographyFactory";
import DOMController from "../../controllers/DOMController";
import { SEMANTIC_TAGS } from "../../style/semanticTags";
import ContainerFactory from "../container/ContainerFactory";
import { CONTAINER_STYLE_CLASS } from "../../style/styleClasses/container.enum";
import { COMPONENT_STYLES } from "../../style/styleClasses";
import {
   SEMANTIC_TYPOGRAPHY_TYPES,
   SemanticTextTags
} from "../../style/semanticTags/typography.enum";

interface ElementCreatorActions {
   DOMController: DOMController;
   typographyFactory: TypographyFactory;
   containerFactory: ContainerFactory;
   createContainer(
      tag: SEMANTIC_TAGS,
      containerStyle: CONTAINER_STYLE_CLASS
   ): HTMLElement;
   createTextPrimary(
      tag: SemanticTextTags,
      text: string,
      type: SEMANTIC_TYPOGRAPHY_TYPES
   ): HTMLElement;
}

type ComponentFactory<T> = {
   DOMController: DOMController;
   create(tag: any, ...options: any): HTMLElement;
} & T;

/**
 * @class ElementCreator is facade and it's used whenever is need to create
 * native DOM elements.
 */
class ElementCreator implements ElementCreatorActions {
   DOMController: DOMController;
   containerFactory: ComponentFactory<ContainerFactory>;
   typographyFactory: TypographyFactory;

   constructor() {
      this.DOMController = new DOMController();
      this.typographyFactory = new TypographyFactory(this.DOMController);
      this.containerFactory = new ContainerFactory(this.DOMController);
   }

   createContainer(tag: SEMANTIC_TAGS, containerStyle: COMPONENT_STYLES): HTMLElement {
      return this.containerFactory.create(tag, containerStyle);
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

export { ComponentFactory };
export default ElementCreator;
