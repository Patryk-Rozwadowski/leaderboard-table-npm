import { FactoryActions } from "../ElementCreator";
import { SEMANTIC_TAGS } from "../../style/semanticTags";
import DOMController from "../../controllers/DOMController";
import { CONTAINER_STYLE_CLASS } from "../../style/styleClasses/container.enum";

class ContainerFactory implements FactoryActions {
   constructor(public DOMController: DOMController) {}

   create(tag: SEMANTIC_TAGS, containerStyle: CONTAINER_STYLE_CLASS): HTMLElement {
      this.DOMController.createDOMElementWithTag(tag);
      const styledContainer = this.DOMController.appendStyles(containerStyle);
      return styledContainer;
   }
}

export default ContainerFactory;
