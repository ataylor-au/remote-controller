import { DeviceState } from "../app.types";

export interface ActionProcessor {
  process: (state: DeviceState) => Promise<void>;
}
