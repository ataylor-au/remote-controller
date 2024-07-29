import { SlotDevice } from "./device-mappings-service.types";

/**
 * Class to track the mapping between devices and slots on the remote control.
 */
export default class DeviceMappings {
  private mapping: Map<number, string>;

  /**
   * Constructor
   *
   * @param {SlotDevice[]} slotDevices Initial slot-device mapping
   */
  constructor(slotDevices: SlotDevice[]) {
    this.mapping = new Map();

    slotDevices.forEach(({ slotId, device }) => {
      this.mapping.set(slotId, device);
    });
  }

  /**
   * Get the mapping for a slot.
   *
   * @param {number} slotId
   * @returns {string | null} Device
   */
  public get(slotId: number) {
    return this.mapping.get(slotId) ?? null;
  }
}
