import { Effect, Layer } from "effect";
import { makeService } from "./device-states-service.live";

/**
 * Define the Device States Service.
 */
export class DeviceStatesService extends Effect.Tag("DeviceStatesService")<
  DeviceStatesService,
  Effect.Effect.Success<typeof makeService>
>() {
  // Initialise the factory method.
  static readonly Layer = Layer.effect(this, makeService);
  // Apply the factory method to the Live layer.
  static readonly Live = this.Layer;
}
