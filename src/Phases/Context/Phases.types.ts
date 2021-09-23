import { ContextActions } from "../types";

type PhaseContextActions = {
   mount(): void;
   parseData(): void;
} & ContextActions;

export { PhaseContextActions };
