// this whole thing basically copies google analytics snippet (as pointed at in requirements)
// this is needed to load tracker script asynchronously (to not block rendering),
// but at the same time also immediately fire page load event as soon as it is loaded
const addAnalyticsScript = () => {
  const scriptTag = document.createElement("script");
  const firstScript = document.getElementsByTagName("script")[0];

  scriptTag.async = true;
  scriptTag.src = process.env.TRACKER_SCRIPT_URL;

  firstScript.parentNode.insertBefore(scriptTag, firstScript);
};

const addPageLoadEvent = () => {
  window.eventtracker_test_tracker_queue =
    window.eventtracker_test_tracker_queue || [];

  window.eventtracker_test_tracker_queue.push({ event: "pageview", tags: [] });
};

addAnalyticsScript();
addPageLoadEvent();
