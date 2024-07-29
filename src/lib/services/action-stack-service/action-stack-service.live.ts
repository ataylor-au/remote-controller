import { Effect } from "effect";
import { ActionStack } from "./action-stack";
import { STATE_FILE } from "./action-stack-service.const";

/**
 * Factory function for the action stack.
 */
export const makeService = Effect.gen(function* () {
  return new ActionStack(STATE_FILE);
});
