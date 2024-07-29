import fs from "fs";
import { DeviceState } from "../../app.types";

/**
 * Class to track the state of each device.
 */
export class DeviceStates {
  private statesFilePath: string;
  private states: Map<string, DeviceState>;

  /**
   * Constructor
   *
   * @param {string} statesFilePath
   */
  constructor(statesFilePath: string) {
    this.statesFilePath = statesFilePath;
    this.states = new Map();
    this.loadStates();
  }

  /**
   * Load the device states from local storage.
   */
  private loadStates() {
    const initialStates = JSON.parse(
      fs.readFileSync(this.statesFilePath, "utf-8")
    );

    Object.keys(initialStates).forEach((device) => {
      this.states.set(device, initialStates[device]);
    });
  }

  /**
   * Store the device states to local storage.
   */
  private storeStates() {
    const deviceStates: any = {};
    this.states.forEach((value, key) => {
      deviceStates[key] = value;
    });
    fs.writeFileSync(this.statesFilePath, JSON.stringify(deviceStates));
  }

  /**
   * Get the state for a device.
   *
   * @param {string} device
   * @returns {DeviceState}
   */
  public get(device: string) {
    return this.states.get(device) ?? DeviceState.Off;
  }

  /**
   * Set the state for a device.
   *
   * @param {string} device
   * @param {DeviceState} state
   */
  public set(device: string, state: DeviceState) {
    this.states.set(device, state);
    this.storeStates();
  }
}
