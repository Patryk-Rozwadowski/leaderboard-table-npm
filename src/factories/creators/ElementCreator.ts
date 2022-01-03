import TypographyFactory from "../typography/TypographyFactory";
import DOMController from "../../controllers/DOMController";
import { SEMANTIC_TAGS } from "../../style/semanticTags";
import ContainerFactory from "../container/ContainerFactory";
import { CONTAINER_STYLE_CLASS } from "../../style/styleClasses/container.enum";
import { COMPONENT_STYLES } from "../../style/styleClasses";
import {
   SEMANTIC_TYPOGRAPHY_TYPES,
   SemanticHeaderTags,
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
   createText(
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

   createText(
      tag: SemanticTextTags,
      text: string,
      type: SEMANTIC_TYPOGRAPHY_TYPES
   ): HTMLElement {
      return this.typographyFactory.createText(tag, text, type);
   }

   createHeader(tag: SemanticHeaderTags, text: string): HTMLElement {
      return this.typographyFactory.creatHeaderHeader(tag, text);
   }
}

export { ComponentFactory };
export default ElementCreator;
