import { StateActions } from "../types";

type PhaseStateAction = StateActions & {
   execute(): void;
};

export { PhaseStateAction };
