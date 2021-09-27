import { ContextActions } from "../types";

type PhaseContextActions = {
   execute(): void;
} & ContextActions;

export { PhaseContextActions };
