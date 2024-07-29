import * as S from "@effect/schema/Schema";

export class UnknownDeviceError extends S.TaggedError<UnknownDeviceError>()(
  "UnknownDeviceError",
  {
    message: S.String,
  }
) {}

export class NoActionRequiredError extends S.TaggedError<NoActionRequiredError>()(
  "NoActionRequiredError",
  {
    message: S.String,
  }
) {}

export class ProcessorNotImplementedError extends S.TaggedError<ProcessorNotImplementedError>()(
  "ProcessorNotImplementedError",
  {
    message: S.String,
  }
) {}

export class ProcessingError extends S.TaggedError<ProcessingError>()(
  "ProcessingError",
  {
    message: S.String,
  }
) {}
