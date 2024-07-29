import { Layer, ManagedRuntime } from "effect";
import { DeviceMappingsService, DeviceStatesService } from "../services";
import { ActionStackService } from "../services/action-stack-service/action-stack-service";

// Register the dependency injection layers.
const AppContext = Layer.mergeAll(
  DeviceMappingsService.Live,
  DeviceStatesService.Live,
  ActionStackService.Live
);

// Create the app runtime with the service providers.
export const AppRuntime = ManagedRuntime.make(AppContext);
