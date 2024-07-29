import { Effect, Match, pipe } from "effect";
import express from "express";
import {
  AppRuntime,
  badRequest,
  determineDeviceAction,
  notImplemented,
  processAction,
  respond,
  serverError,
  success,
} from "./lib";
import { RemoteControllerEvent } from "./lib/app.types";

const app = express();
app.use(express.json());

app.post("/remote-event", async (req, res) => {
  await pipe(
    req.body,
    RemoteControllerEvent.decode, // Decode the request into a RemoteControllerEvent object.
    Effect.flatMap(determineDeviceAction), // Determine the action required from the event.
    Effect.flatMap(processAction), // Process the action.
    Effect.matchEffect({
      // Handle all the success and failures states.
      onFailure: (e) =>
        Match.value(e).pipe(
          Match.when({ _tag: "ParseError" }, badRequest), // User sent an invalid request.
          Match.when({ _tag: "UnknownDeviceError" }, (e) => success(e.message)), // Unknown device, so no action needed - return success.
          Match.when({ _tag: "NoActionRequiredError" }, (e) =>
            success(e.message)
          ), // No action needed - return success.
          Match.when({ _tag: "ProcessorNotImplementedError" }, (e) =>
            notImplemented(e.message)
          ), // The processor for the action has not been implemented.
          Match.when({ _tag: "ProcessingError" }, (e) =>
            serverError(e.message)
          ), // Error during processing.
          Match.orElse(badRequest) // Catch any leftover errors.
        ),
      onSuccess: () => success(), // Action was successful.
    }),
    Effect.map(({ status, message }) => respond(res, status, message)), // Send the response.
    AppRuntime.runPromiseExit
  );
});

app.listen(3000, () => {
  console.log(
    "Listening on port 3000! See README for details on how to use your remote control."
  );
});
