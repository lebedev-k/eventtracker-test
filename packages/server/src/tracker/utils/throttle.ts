export const throttle = (
  executor: () => void | Promise<void>,
  timeout: number,
): ((forceExecutionNow?: boolean) => void) => {
  let lastCallCooldown: ReturnType<typeof setTimeout> | null = null;
  let shouldCallAfterCooldown = false;

  return (forceExecutionNow) => {
    if (!forceExecutionNow && lastCallCooldown) {
      shouldCallAfterCooldown = true;
      return;
    }

    lastCallCooldown = setTimeout(() => {
      lastCallCooldown = null;

      if (shouldCallAfterCooldown) {
        shouldCallAfterCooldown = false;
        executor();
      }
    }, timeout);

    return executor();
  };
};
