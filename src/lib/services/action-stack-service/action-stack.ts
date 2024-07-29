import fs from "fs";
import { DeviceAction } from "../../app.types";

/**
 * Class to track the actions each device has performed.
 */
export class ActionStack {
  private statesFilePath: string;
  private actions: DeviceAction[];
  private maxItems: number | null;

  /**
   *
   * @param statesFilePath Path to the
   * @param maxItems
   */
  constructor(statesFilePath: string, maxItems: number | null = null) {
    this.statesFilePath = statesFilePath;
    this.actions = [];
    this.loadStack();
    this.maxItems = maxItems;
  }

  /**
   * Load the historical stack from local storage.
   */
  private loadStack() {
    this.actions = JSON.parse(fs.readFileSync(this.statesFilePath, "utf-8"));
  }

  /**
   * Store the stack to local storage.
   */
  private storeStack() {
    fs.writeFileSync(this.statesFilePath, JSON.stringify(this.actions));
  }

  /**
   * Add an action to the stack history.
   *
   * @param {DeviceAction} action
   */
  public add(action: DeviceAction) {
    if (this.maxItems === 0) {
      return;
    }

    if (this.maxItems && this.actions.length > this.maxItems - 1) {
      this.actions.splice(0, 1);
    }

    this.actions.push(action);
    this.storeStack();
  }

  /**
   * Remove an action from the stack history and return the action.
   *
   * @returns {DeviceAction | null} Last device action.
   */
  public remove() {
    const action = this.actions.pop() || null;
    this.storeStack();
    return action;
  }
}
