import { Effect } from "effect";
import fs from "fs";
import DeviceMappings from "./device-mappings";
import { STATE_FILE } from "./device-mappings-service.const";

/**
 * Factory function for the device mapping.
 */
export const makeService = Effect.gen(function* () {
  const deviceMappingConfig = JSON.parse(fs.readFileSync(STATE_FILE, "utf-8"));
  return new DeviceMappings(deviceMappingConfig);
});
