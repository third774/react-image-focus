import React, { Component } from "react"

const retina = require("./Retina.svg")

interface FocalPickerProps {
  src: string
  x?: number
  y?: number
  onChange?: (x: number, y: number) => void
}

export class FocalPicker extends Component<FocalPickerProps> {
  container: HTMLDivElement | null

  state = {
    x: this.props.x || 0.5,
    y: this.props.y || 0.5,
    moving: false,
  }

  handleDragStart = (e: any) => {
    this.setState({ moving: true })
    this.updateCoordinates(e)
  }

  handleDragEnd = () => {
    if (this.state.moving) {
      const { onChange } = this.props
      this.setState({ moving: false })
      if (onChange) {
        onChange(this.state.x, this.state.y)
      }
    }
  }

  handleMove = (e: any) => {
    if (this.state.moving && this.container) {
      this.updateCoordinates(e)
    }
  }

  updateCoordinates = (e: any) => {
    if (this.container) {
      const containerRect = this.container.getBoundingClientRect()
      const x =
        Math.round(
          (e.clientX - containerRect.left) / containerRect.width * 1000,
        ) / 1000
      const y =
        Math.round(
          (e.clientY - containerRect.top) / containerRect.height * 1000,
        ) / 1000
      if (0 <= x && x <= 1 && 0 <= y && y <= 1) {
        this.setState({ x, y })
        this.props.onChange && this.props.onChange(x, y)
      } else {
        this.setState({ moving: false })
        this.handleDragEnd()
      }
    }
  }

  render() {
    const { src } = this.props
    const { x, y } = this.state
    return (
      <div
        ref={el => (this.container = el)}
        style={{
          maxWidth: "100%",
          position: "relative",
          userSelect: "none",
          overflow: "hidden",
        }}
        onMouseUp={this.handleDragEnd}
        onMouseMove={this.handleMove}
        onMouseDown={this.handleDragStart}
        onMouseLeave={this.handleDragEnd}
      >
        <img
          style={{ width: "100%", display: "block" }}
          draggable={false}
          src={src}
        />
        <img
          src={retina}
          style={{
            position: "absolute",
            left: `calc(${x * 100}% - 10px)`,
            top: `calc(${y * 100}% - 10px)`,
            cursor: "move",
          }}
          draggable={false}
        />
      </div>
    )
  }
}
