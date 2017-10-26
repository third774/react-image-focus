import React, { Component } from "react"

interface FocalImageProps {
  src: string
  x: number
  y: number
}

export class FocalImage extends Component<FocalImageProps> {
  getImageStyles() {
    return {
      maxWidth: "100%"
    }
  }

  render() {
    const { src } = this.props
    return (
      <div style={{ overflow: "hidden", maxWidth: "100%" }}>
        <img style={this.getImageStyles()} src={src} alt="" />
      </div>
    )
  }
}
