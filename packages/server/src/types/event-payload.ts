import type { JSONSchema4 } from "json-schema";

export interface EventPayload {
  event: string;
  tags: string[];
  url: string;
  title: string;
  ts: number;
}

export const EventsPayloadSchema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  type: "array",
  items: {
    type: "object",
    additionalProperties: false,
    properties: {
      event: {
        type: "string",
      },
      tags: {
        type: "array",
        items: {
          type: "string",
        },
      },
      url: {
        type: "string",
      },
      title: {
        type: "string",
      },
      ts: {
        type: "integer",
      },
    },
    required: ["event", "tags", "url", "title", "ts"],
  },
} as JSONSchema4;
