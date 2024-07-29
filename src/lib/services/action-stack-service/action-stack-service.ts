import { Effect, Layer } from "effect";
import { makeService } from "./action-stack-service.live";

/**
 * Define the Action Stack Service.
 */
export class ActionStackService extends Effect.Tag("ActionStackService")<
  ActionStackService,
  Effect.Effect.Success<typeof makeService>
>() {
  // Initialise the factory method.
  static readonly Layer = Layer.effect(this, makeService);
  // Apply the factory method to the Live layer.
  static readonly Live = this.Layer;
}
