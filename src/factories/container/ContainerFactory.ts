import DOMController from "../../controllers/DOMController";
import { CONTAINER_STYLE_CLASS } from "../../style/styleClasses/container.enum";
import { SEMANTIC_CONTAINER_TAGS } from "../../style/semanticTags/container.enum";

class ContainerFactory {
   constructor(private _domController: DOMController) {}

   createContainer(
      tag: SEMANTIC_CONTAINER_TAGS,
      containerStyle: CONTAINER_STYLE_CLASS
   ): HTMLElement {
      this._domController.createDOMElementWithTag(tag);
      return this._domController.appendStyles(containerStyle);
   }
}

export default ContainerFactory;
