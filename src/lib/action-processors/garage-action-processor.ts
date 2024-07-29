import { setTimeout } from "timers/promises";
import { DeviceState } from "../app.types";
import { ActionProcessor } from "./action-processors.types";

export default class GarageActionProcessor implements ActionProcessor {
  /**
   * Process the action for the given state.
   *
   * @param DeviceState state
   */
  public async process(state: DeviceState) {
    await (state === DeviceState.On ? this.open() : this.close());
  }

  /**
   * Close the garage.
   */
  private async close() {
    console.log("Closing garage...");
    await setTimeout(1000);
    console.log("Garage closed!");
  }

  /**
   * Open the garage.
   */
  private async open() {
    console.log("Opening garage...");
    await setTimeout(1000);
    console.log("Garage opened!");
  }
}
