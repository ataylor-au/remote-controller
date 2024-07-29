# Remote Controller

This app is a MVP for a remote-controller API. For this example I use a mix of functional-programming and object-oriented elements to demonstrate the different coding styles - though in a real-world implementation you might prefer to stick to just one of the methodologies.

I am using the Effect TS library extensively as it provides dependency injection, easy parsing for unknown objects and detailed error handling out of the box. It has a steep learning curve, but it is very powerful and makes you a better programmer once you understand it.

## Design

In application-design.png there is an overview of the workflow and coding design of the application.

## Requirements

- node 20
- pnpm

## State

Inside the state directory there are JSON files that contain the state of the app. It is not necessary to change anything, but you can alter the initial states if you want.

### device-mappings.json

This maps the device to a particular slot/row on the remote, indexed from 0.

### device-states.json

The initial state of each device with 0 being closed/off and 1 being open/on.

### action-stack.json

The historical stack of actions that are available to be undone with the "undo" event. There is currently no limit on how many actions can be undone, but it can be configured with a limit easily.

## Running Instructions

- install dependencies:
  > pnpm install
- run server on port 3000:

  > pnpm run serve

  or

  > npx ts-node src/index.ts

- POST to API endpoint with postman/fiddler etc.
  > slotId: ID of the row 0-4
  > state (optional): 0-1 off/on. Default 0.
- Valid actions will be printed to the console and return success codes via the API. Invalid actions won't print to the console but will return appropriate responses via the API.

### Example Requests

#### Turn the device in slot 0 to on.

> POST: http://localhost:3000/remote-event

    {
      "slotId": 0,
      "state": 1
    }

#### Turn the device in slot 2 to off.

> POST: http://localhost:3000/remote-event

    {
      "slotId": 2,
      "state": 0
    }

#### Attempt to turn a non-existent device in slot 3 to off without specifying state.

> POST: http://localhost:3000/remote-event

    {
      "slotId": 3
    }

#### Undo button.

> POST: http://localhost:3000/remote-event

    {
      "slotId": 4
    }

## Dependency Decisions

- expressjs: Quick and easy server. Web server can technically be implemented with Effect as well but it's a bit more complex.
- Effect.ts: Empowers Typescript with best practice functional programming techniques, immutability, great error handling, object parsing, dependency injection and dynamic runtime configurations.

## Design Patterns

- Functional programming
- Object-oriented programming
- Dependency injection for the state manager services
- Abstract factory method for determining the action handler
- Inheritance
- Singleton
- Currying
- Variable immutability
- Errors as first-class citizens
- Strong typing
- Tree shaking
