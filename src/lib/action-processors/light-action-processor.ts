import { setTimeout } from "timers/promises";
import { DeviceState } from "../app.types";
import { ActionProcessor } from "./action-processors.types";

export default class LightActionProcessor implements ActionProcessor {
  /**
   * Process the action for the given state.
   *
   * @param DeviceState state
   */
  public async process(state: DeviceState) {
    await (state === DeviceState.On ? this.on() : this.off());
  }

  /**
   * Turn off the light.
   */
  private async off() {
    console.log("Turning off light...");
    await setTimeout(1000);
    console.log("Light off!");
  }

  /**
   * Turn on the light.
   */
  private async on() {
    console.log("Turning on light...");
    await setTimeout(1000);
    console.log("Light on!");
  }
}
