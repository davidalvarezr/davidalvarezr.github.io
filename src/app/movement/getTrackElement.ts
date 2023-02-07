/**
 * get the DOM element only if it is a track
 * @param target the possible track
 */
export const getTrackElement = (target: EventTarget): HTMLDivElement | undefined => {
  return (target as Element).className === "track-element" ? (target as HTMLDivElement) : undefined
}
