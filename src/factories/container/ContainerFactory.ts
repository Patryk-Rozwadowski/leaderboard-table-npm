import DOMController from "../../controllers/DOMController";
import { CONTAINER_STYLE_CLASS } from "../../style/styleClasses/container.enum";
import { SEMANTIC_CONTAINER_TAGS } from "../../style/semanticTags/container.enum";

class ContainerFactory implements ContainerFactory {
   constructor(public DOMController: DOMController) {}

   createContainer(
      tag: SEMANTIC_CONTAINER_TAGS,
      containerStyle: CONTAINER_STYLE_CLASS
   ): HTMLElement {
      this.DOMController.createDOMElementWithTag(tag);
      return this.DOMController.appendStyles(containerStyle);
   }
}

export default ContainerFactory;
