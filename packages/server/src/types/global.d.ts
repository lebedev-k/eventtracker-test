export {};

declare global {
  interface Window {
    eventtracker_test_tracker_queue: { event: string; tags: string[] }[];
    tracker: { track: (event: string, ...tags: string[]) => void };
  }
}
