import { setTimeout } from "timers/promises";
import { DeviceState } from "../app.types";
import { ActionProcessor } from "./action-processors.types";

export default class DishwasherActionProcessor implements ActionProcessor {
  /**
   * Process the action for the given state.
   *
   * @param DeviceState state
   */
  public async process(state: DeviceState) {
    await (state === DeviceState.On ? this.on() : this.off());
  }

  /**
   * Turn the dishwasher off.
   */
  private async off() {
    console.log("Turning off dishwasher...");
    await setTimeout(1000);
    console.log("Dishwasher off!");
  }

  /**
   * Turn the dishwasher on.
   */
  private async on() {
    console.log("Turning on dishwasher...");
    await setTimeout(1000);
    console.log("Dishwasher on!");
  }
}
