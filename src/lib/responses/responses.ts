import { Effect } from "effect";

/**
 * Build a Bad Request response from an error object.
 *
 * @param {Error} e
 * @returns Effect containing response details.
 */
export function badRequest(e: Error) {
  return Effect.succeed({
    status: 400,
    message: `Bad request: ${e.message}`,
  });
}

/**
 * Build a Success response object.
 *
 * @param {string} message (Optional)
 * @returns Effect containing response details.
 */
export function success(message: string = "Success") {
  return Effect.succeed({
    status: 200,
    message,
  });
}

/**
 * Build a Not Implemented response object.
 *
 * @param {string} message (Optional)
 * @returns Effect containing response details.
 */
export function notImplemented(message: string = "Not Implemented") {
  return Effect.succeed({
    status: 501,
    message,
  });
}

/**
 * Build a Server Error response object.
 *
 * @param {string} message (Optional)
 * @returns Effect containing response details.
 */
export function serverError(message: string = "Internal Server Error") {
  return Effect.succeed({
    status: 500,
    message,
  });
}
