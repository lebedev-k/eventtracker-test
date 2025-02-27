import { EventPayload } from "../types/event-payload.js";
import { throttle } from "./utils/throttle.js";

const flushThrottleTimeout = 1000;
const networkFailureRetryTimeout = 1000;
const queueFlushThreshold = 3;

const wait = (ms: number) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

class Tracker {
  private queue: EventPayload[];

  constructor() {
    this.queue = [];

    const preFilledEventQueue = window.eventtracker_test_tracker_queue;

    if (Array.isArray(preFilledEventQueue) && preFilledEventQueue.length > 0) {
      preFilledEventQueue.forEach((args) =>
        this.track(args.event, ...args.tags),
      );

      window.eventtracker_test_tracker_queue = [];
    }

    // motivation:
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon#sending_analytics_at_the_end_of_a_session
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        this.flush(true)
      }
    });
  }

  track(event: string, ...tags: string[]): void {
    const eventPayload: EventPayload = {
      event: event || "unknown_event",
      tags,
      url: window.location.href,
      title: document.title || "no_title",
      ts: Math.floor(new Date().getTime() / 1000),
    };

    this.enqueue(eventPayload);
  }

  private enqueue(...events: EventPayload[]) {
    this.queue.push(...events);

    this.flush(this.queue.length >= queueFlushThreshold)
  }

  private flush = throttle(async () => {
    const eventsToSend = this.queue;
    this.queue = [];

    if (eventsToSend.length === 0) {
      return;
    }

    try {
      await fetch(
        process.env.TRACK_ENDPOINT_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(eventsToSend),
          // this doesn't work in firefox and "navigation link click" event
          // followed by page unload will be lost there
          //
          // whole request could be replaced by a `navigator.sendBeacon` call, but
          // it can't throw network errors, so the requirement "must retry on network error"
          // would be violated (can't catch error => can't handle it)
          keepalive: true,
        }
      );
    } catch {
      await wait(networkFailureRetryTimeout);
      this.enqueue(...eventsToSend);
    }
  }, flushThrottleTimeout);
}

window.tracker = new Tracker();
