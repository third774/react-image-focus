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

  if (scaledFocus < containerCenter) {
    return 0
  }

  return (scaledFocus - containerCenter) * -1
}
