import React, { Component } from "react"

interface FocalPickerProps {
  src: string
  x?: number
  y?: number
  onChange?: (x: number, y: number) => void
}

export class FocalPicker extends Component<FocalPickerProps> {
  img: HTMLImageElement | null
  container: HTMLDivElement | null

  state = {
    x: 0,
    y: 0,
    moving: false
  }

  componentDidMount() {
    this.initializeFocalPicker()
  }

  initializeFocalPicker() {
    if (this.props.x !== undefined && this.props.y !== undefined) {
      this.setState({
        x: this.props.x,
        y: this.props.y
      })
    } else {
      this.setState({
        x: 0.5,
        y: 0.5
      })
    }
  }

  handleDragStart = (e: any) => {
    this.setState({ moving: true })
    this.updateCoordinates(e)
  }

  handleDragEnd = () => {
    if (this.state.moving) {
      const { onChange } = this.props
      this.setState({ moving: false })
      onChange && onChange(this.state.x, this.state.y)
    }
  }

  handleMove = (e: any) => {
    if (this.state.moving && this.container) {
      this.updateCoordinates(e)
    }
  }

  updateCoordinates = (e: any) => {
    if (this.container) {
      const x =
        Math.round(
          (e.clientX - this.container.offsetLeft) /
            this.container.scrollWidth *
            1000
        ) / 1000
      const y =
        Math.round(
          (e.clientY - this.container.offsetTop) /
            this.container.scrollHeight *
            1000
        ) / 1000
      if (0 <= x && x <= 1 && 0 <= y && y <= 1) {
        this.setState({ x, y })
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
        style={{ maxWidth: "100%", position: "relative", userSelect: "none" }}
        onMouseUp={this.handleDragEnd}
        onMouseMove={this.handleMove}
        onMouseDown={this.handleDragStart}
        onMouseLeave={this.handleDragEnd}
      >
        <img
          style={{ maxWidth: "100%", display: "block" }}
          draggable={false}
          src={src}
          ref={el => (this.img = el)}
        />
        <svg
          style={{
            position: "absolute",
            left: `calc(${x * 100}% - 10px)`,
            top: `calc(${y * 100}% - 10px)`,
            cursor: "move"
          }}
          height="20"
          width="20"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="100" fill="deeppink" />
        </svg>
      </div>
    )
  }
}
