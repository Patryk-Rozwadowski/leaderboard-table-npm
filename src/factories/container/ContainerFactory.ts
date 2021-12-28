import { ComponentFactory } from "../creators/ElementCreator";
import { SEMANTIC_TAGS } from "../../style/semanticTags";
import DOMController from "../../controllers/DOMController";
import { CONTAINER_STYLE_CLASS } from "../../style/styleClasses/container.enum";

class ContainerFactory implements ComponentFactory<ContainerFactory> {
   constructor(public DOMController: DOMController) {}

   create(tag: SEMANTIC_TAGS, containerStyle: CONTAINER_STYLE_CLASS): HTMLElement {
      this.DOMController.createDOMElementWithTag(tag);
      return this.DOMController.appendStyles(containerStyle);
   }
}

export default ContainerFactory;
