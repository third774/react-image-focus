import React, { Component } from "react"

interface FocalPoint {
  x: number
  y: number
}

interface FocalImageProps {
  src: string
  alt?: string
  focalPoint: FocalPoint
}

interface FocalPointState {
  style: any
}

export class FocalImage extends Component<FocalImageProps, FocalPointState> {
  img: HTMLImageElement | null
  container: HTMLDivElement | null

  state = {
    style: {
      display: "none", // do not display image until it is loaded
    },
  }

  containerStyles: any = {
    position: "relative",
    height: "100%",
    width: "100%",
    overflow: "hidden",
  }

  defaultImageStyles = {
    position: "absolute",
    left: 0,
    top: 0,
    minHeight: "100%",
    minWidth: "100%",
    transition: "all 0.5s ease-in-out",
  }

  calculateShift(
    dimensionRatio: number,
    containerSize: number,
    imageSize: number,
    focus: number,
    shiftDimension: string,
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

  updateImageStyles = () => {
    if (this.img && this.container) {
      const { focalPoint } = this.props

      const imageHeight = this.img.naturalHeight
      const imageWidth = this.img.naturalWidth
      const containerHeight = this.container.getBoundingClientRect().height
      const containerWidth = this.container.getBoundingClientRect().width

      const style: any = {
        ...this.defaultImageStyles,
      }

      const widthRatio = imageWidth / containerWidth
      const heightRatio = imageHeight / containerHeight

      if (widthRatio > heightRatio) {
        style.maxHeight = "100%"
        style.left = this.calculateShift(
          heightRatio,
          containerWidth,
          imageWidth,
          focalPoint.x,
          "width",
        )
      } else {
        style.maxWidth = "100%"
        style.top = this.calculateShift(
          widthRatio,
          containerHeight,
          imageHeight,
          focalPoint.y,
          "height",
        )
      }

      const updatedState = {
        style,
      }
      return this.setState(updatedState)
    }
  }

  componentDidUpdate(prevProps: FocalImageProps) {
    if (
      this.props.focalPoint.x !== prevProps.focalPoint.x ||
      this.props.focalPoint.y !== prevProps.focalPoint.y
    ) {
      this.updateImageStyles()
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateImageStyles)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateImageStyles)
  }

  render() {
    const { style } = this.state
    const { src, alt } = this.props
    return (
      <div ref={el => (this.container = el)} style={this.containerStyles}>
        <img
          ref={el => (this.img = el)}
          style={style}
          src={src}
          onLoad={this.updateImageStyles}
          alt={alt}
        />
      </div>
    )
  }
}
