import { Effect } from "effect";
import { DeviceAction, DeviceState, RemoteControllerEvent } from "../app.types";
import { determineDevice } from "../determine-device";
import {
  NoActionRequiredError,
  UnknownDeviceError,
} from "../errors/errors.types";
import { ActionStackService } from "../services/action-stack-service";
import { DeviceStatesService } from "../services/device-states-service";

/**
 * Determine the device action from a remote controller event.
 *
 * @param {RemoteControllerEvent} event
 * @returns {DeviceAction} Action for the device or short circuit with an error.
 */
export function determineDeviceAction({
  slotId,
  state = DeviceState.Off,
}: RemoteControllerEvent) {
  return Effect.gen(function* (_) {
    const device = yield* determineDevice(slotId);

    if (!device) {
      // Short circuit the effect with an unknown device error.
      return yield* Effect.fail(
        new UnknownDeviceError({
          message: `No device mapping for slot '${slotId}'.`,
        })
      );
    }

    return yield* device === "undo"
      ? getLastAction()
      : getNewAction(device, state);
  });
}

/**
 * Get the last action for any device in the action stack.
 *
 * @returns {DeviceAction} Opposite action for the last device or short circuit with an error.
 */
function getLastAction() {
  return Effect.gen(function* (_) {
    // Get the action stack through dependency injection.
    const actionStack = yield* ActionStackService;
    const lastAction = actionStack.remove();

    if (!lastAction) {
      // Short circuit the effect with a no action required error.
      return yield* Effect.fail(
        new NoActionRequiredError({ message: "No action required." })
      );
    }

    return {
      device: lastAction.device,
      state:
        lastAction.state === DeviceState.On ? DeviceState.Off : DeviceState.On,
      isReversal: true,
    } as DeviceAction;
  });
}

/**
 * Get a new device action for a device.
 *
 * @param {string} device
 * @param {DeviceState} state
 * @returns {DeviceAction} Action for the device or short circuit with an error.
 */
function getNewAction(device: string, state: DeviceState) {
  return Effect.gen(function* (_) {
    // Get the device states through dependency injection.
    const deviceStates = yield* DeviceStatesService;
    const currentState = deviceStates.get(device);

    // Test if the old state is the same as the new state.
    if (currentState === state) {
      // Short circuit the effect with a no action required error.
      return yield* Effect.fail(
        new NoActionRequiredError({ message: "No action required." })
      );
    }

    return {
      device,
      state,
    } as DeviceAction;
  });
}
