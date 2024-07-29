import { ActionProcessor } from "./action-processors.types";
import DishwasherActionProcessor from "./dishwasher-action-processor";
import GarageActionProcessor from "./garage-action-processor";
import LightActionProcessor from "./light-action-processor";

/**
 * Factory function to create the appropriate action processor for an action.
 *
 * @param {string} action
 * @returns Action processor
 */
export function createActionProcessor(action: string): ActionProcessor | null {
  switch (action) {
    case "garage":
      return new GarageActionProcessor();
    case "dishwasher":
      return new DishwasherActionProcessor();
    case "light":
      return new LightActionProcessor();
    default:
      return null;
  }
}
