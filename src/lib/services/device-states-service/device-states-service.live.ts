import { Effect } from "effect";
import { DeviceStates } from "./device-states";
import { STATE_FILE } from "./device-states-service.const";

/**
 * Factory function for the device states.
 */
export const makeService = Effect.gen(function* () {
  return new DeviceStates(STATE_FILE);
});
