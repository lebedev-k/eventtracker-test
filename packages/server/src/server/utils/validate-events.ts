import { Validator } from "jsonschema";
import {
  EventPayload,
  EventsPayloadSchema,
} from "../../types/event-payload.js";

const eventValidator = new Validator();

/**
 * Validate events array using json schema
 */
export const validateEvents = (events: EventPayload[]): boolean =>
  Boolean(events && eventValidator.validate(events, EventsPayloadSchema).valid);
