import { Effect, Layer } from "effect";
import { makeService } from "./device-mappings-service.live";

/**
 * Define the Device Mappings Service.
 */
export class DeviceMappingsService extends Effect.Tag("DeviceMappingsService")<
  DeviceMappingsService,
  Effect.Effect.Success<typeof makeService>
>() {
  // Initialise the factory method.
  static readonly Layer = Layer.effect(this, makeService);
  // Apply the factory method to the Live layer.
  static readonly Live = this.Layer;
}
