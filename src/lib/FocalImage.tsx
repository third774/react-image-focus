import React, { Component } from "react"
import { calculateShift } from "./calculateShift"

interface FocalPoint {
  x: number
  y: number
}

interface FocalImageProps {
  src: string
  alt?: string
  focalPoint: FocalPoint
}

const DEFAULT_IMAGE_STYLES = {
  position: "absolute",
  left: 0,
  top: 0,
  minHeight: "100%",
  minWidth: "100%",
  transition: "all 0.5s ease-in-out",
}

const CONTAINER_STYLES: any = {
  position: "relative",
  height: "100%",
  width: "100%",
  overflow: "hidden",
}

export class FocalImage extends Component<FocalImageProps> {
  img: HTMLImageElement | null
  container: HTMLDivElement | null

  componentDidMount() {
    this.reRender()
    window.addEventListener("resize", this.reRender)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.reRender)
  }

  reRender = () => {
    this.forceUpdate()
  }

  getImageStyles() {
    if (this.img && this.container) {
      const { focalPoint } = this.props
      const imageHeight = this.img.naturalHeight
      const imageWidth = this.img.naturalWidth
      const containerHeight = this.container.getBoundingClientRect().height
      const containerWidth = this.container.getBoundingClientRect().width

      if (!imageHeight || !imageWidth || !containerHeight || !containerWidth) {
        return { display: "none" }
      }

      const style: any = {
        ...DEFAULT_IMAGE_STYLES,
      }

      const widthRatio = imageWidth / containerWidth
      const heightRatio = imageHeight / containerHeight

      if (widthRatio > heightRatio) {
        style.maxHeight = "100%"
        style.left = calculateShift(
          heightRatio,
          containerWidth,
          imageWidth,
          focalPoint.x,
        )
      } else {
        style.maxWidth = "100%"
        style.top = calculateShift(
          widthRatio,
          containerHeight,
          imageHeight,
          focalPoint.y,
        )
      }
      return style
    }
  }

  render() {
    const { src, alt } = this.props
    return (
      <div ref={el => (this.container = el)} style={CONTAINER_STYLES}>
        <img
          ref={el => (this.img = el)}
          style={this.getImageStyles()}
          src={src}
          alt={alt}
          onLoad={this.reRender}
        />
      </div>
    )
  }
}
