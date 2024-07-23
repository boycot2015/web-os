import { sineIn, sineOut } from 'svelte/easing';

export function fadeIn(
  _,
  { duration = 150, delay = duration } = {},
) {
  return {
    duration: duration + 10,
    delay,
    easing: sineIn,
    css: (t) => `opacity: ${t}`,
  };
}

export function fadeOut(
  _,
  { duration = 150 } = {},
) {
  return {
    duration,
    easing: sineOut,
    css: (t) => `opacity: ${t}`,
  };
}
