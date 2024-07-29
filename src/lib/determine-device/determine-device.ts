import { Effect } from "effect";
import { DeviceMappingsService } from "../services/device-mappings-service/device-mappings-service";

/**
 * Determine what device is assigned to a given slot.
 *
 * @param {number} slotId
 * @returns Effect with the assigned device.
 */
export function determineDevice(slotId: number) {
  return Effect.gen(function* (_) {
    // Get the device mappings by dependency injection.
    const deviceMappings = yield* DeviceMappingsService;
    return deviceMappings.get(slotId);
  });
}
