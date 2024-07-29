/**
 * Send a response with the express response object.
 *
 * @param res
 * @param status
 * @param message
 */
export function respond(res: any, status: number, message: string) {
  res.status(status).send(message);
}
