const MINUTES_IN_HOUR = 60;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

const prefixify = (value: number, prefix = '0') =>
  value < 10 ? prefix + value : value;

export function formatSecondsToHHMMSS(secondsAccumulate: number) {
  const currentTime = Math.floor(secondsAccumulate);
  const hours = Math.floor(currentTime / SECONDS_IN_HOUR);
  const minutes = hours
    ? Math.floor((currentTime % SECONDS_IN_HOUR) / MINUTES_IN_HOUR)
    : Math.floor(currentTime / MINUTES_IN_HOUR);
  const seconds = minutes ? currentTime % SECONDS_IN_MINUTE : currentTime;

  return `${prefixify(hours)}:${prefixify(minutes)}:${prefixify(seconds)}`;
}
