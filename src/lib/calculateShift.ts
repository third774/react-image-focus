export function calculateShift(
  dimensionRatio: number,
  containerSize: number,
  imageSize: number,
  focus: number,
) {
  const containerCenter = containerSize / 2
  const scaledImage = imageSize / dimensionRatio
  const scaledFocus = scaledImage * focus

  // scaled focus is beyond the halfway point of the container at the far edge
  if (scaledFocus > scaledImage - containerCenter) {
    // return the far edge
    return (scaledImage - containerSize) * -1
  }

  // similarly, focus is too close to inner edge, just return 0 for no shift
  if (scaledFocus < containerCenter) {
    return 0
  }

  // subtract containerCenter from scaled focus to center image on focal point
  return (scaledFocus - containerCenter) * -1
}
