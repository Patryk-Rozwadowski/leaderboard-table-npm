import TypographyFactory from "./typography/TypographyFactory";
import DOMController from "../controllers/DOMController";
import { SEMANTIC_TAGS } from "../style/semanticTags";
import ContainerFactory from "./container/ContainerFactory";
import { CONTAINER_STYLE_CLASS } from "../style/styleClasses/container.enum";
import { COMPONENT_STYLES } from "../style/styleClasses";

interface ElementCreatorActions {
   DOMController: DOMController;
   typographyFactory: TypographyFactory;
   containerFactory: ContainerFactory;
   createContainer(
      tag: SEMANTIC_TAGS,
      containerStyle: CONTAINER_STYLE_CLASS
   ): HTMLElement;
   createText(tag: SEMANTIC_TAGS, text: string): HTMLElement;
}

type ComponentFactory<T> = {
   DOMController: DOMController;
   create(tag: SEMANTIC_TAGS, ...options: any): HTMLElement;
} & T;

/**
 * @class ElementCreator is facade and it's used whenever is need to create
 * native DOM elements.
 */
class ElementCreator implements ElementCreatorActions {
   DOMController: DOMController;
   containerFactory: ComponentFactory<ContainerFactory>;
   typographyFactory: ComponentFactory<TypographyFactory>;
   private _element: HTMLElement;

   constructor() {
      this.DOMController = new DOMController();
      this.typographyFactory = new TypographyFactory(this.DOMController);
      this.containerFactory = new ContainerFactory(this.DOMController);
   }

   get getElement(): HTMLElement {
      return this._element;
   }

   createContainer(tag: SEMANTIC_TAGS, containerStyle: COMPONENT_STYLES): HTMLElement {
      return this.containerFactory.create(tag, containerStyle);
   }

   createText(tag: SEMANTIC_TAGS, text: string): HTMLElement {
      return this.typographyFactory.create(tag, text);
   }
}

export { ComponentFactory };
export default ElementCreator;
