export const getTrackElementBelowTrack = (
  stack: Element[],
  except: Element
): HTMLDivElement | undefined => {
  return stack.find((element) => element.className === "track-element" && element !== except) as
    | HTMLDivElement
    | undefined
}
