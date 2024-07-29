import * as S from "@effect/schema/Schema";

export enum DeviceState {
  Off = 0,
  On = 1,
}

export class RemoteControllerEvent extends S.Class<RemoteControllerEvent>(
  "RemoteControllerEvent"
)({
  slotId: S.Number,
  state: S.Enums(DeviceState),
}) {
  static decode = S.decodeUnknown(RemoteControllerEvent);
}

export interface DeviceAction {
  device: string;
  state: DeviceState;
  isReversal?: boolean;
}
