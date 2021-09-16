import { ContextActions } from "../types";

type PhaseContextActions = {
   mount(): void;
} & ContextActions;

export { PhaseContextActions };
