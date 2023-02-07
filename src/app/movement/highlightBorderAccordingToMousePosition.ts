/**
 * Given a vertical mouse position, highlight the closest border
 * @param container
 * @param mouseY
 * @param targetElement the element we want the border to be highlighted
 */
export const highlightBorderAccordingToMousePosition = (
  container: HTMLDivElement,
  mouseY: number,
  targetElement: HTMLDivElement
) => {
  const scrollY = container.getBoundingClientRect().top

  const deltaTop = mouseY - (targetElement.offsetTop + scrollY)
  const deltaBottom = targetElement.offsetTop + targetElement.offsetHeight + scrollY - mouseY

  if (deltaTop < deltaBottom) {
    targetElement.style.borderTop = "solid 2px orange"
  } else {
    targetElement.style.borderBottom = "solid 2px orange"
  }
}
