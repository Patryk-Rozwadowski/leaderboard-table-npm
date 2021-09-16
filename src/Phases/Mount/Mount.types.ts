import { StateActions } from "../types";

type PhaseStateAction = StateActions & {
   mount(): void;
};

export { PhaseStateAction };
