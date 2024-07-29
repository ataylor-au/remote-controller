import { Effect } from "effect";
import { createActionProcessor } from "../action-processors";
import { DeviceAction } from "../app.types";
import {
  ProcessingError,
  ProcessorNotImplementedError,
} from "../errors/errors.types";
import { DeviceStatesService } from "../services";
import { ActionStackService } from "../services/action-stack-service";

/**
 * Process an action for a device.
 *
 * @param {DeviceAction} deviceAction
 */
export function processAction({ device, state, isReversal }: DeviceAction) {
  return Effect.gen(function* (_) {
    // Use factory function to get the action processor.
    const processor = createActionProcessor(device);

    if (!processor) {
      return yield* Effect.fail(
        new ProcessorNotImplementedError({
          message: `No processor found for device: ${device}.`,
        })
      );
    }

    // Try processing the action.
    yield* Effect.tryPromise({
      try: () => processor.process(state),
      catch: (e) =>
        new ProcessingError({ message: `Error during processing: ${e}` }),
    });

    // Get the device states service through dependency injection.
    const deviceStates = yield* DeviceStatesService;
    // Set the device state;
    deviceStates.set(device, state);

    // Add the action to the stack if it's not an "undo" action.
    if (!isReversal) {
      // Get the action stack through dependency injection.
      const actionStack = yield* ActionStackService;
      actionStack.add({ device, state });
    }
  });
}
