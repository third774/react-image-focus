import React, { Component } from "react"

interface FocalPickerProps {
  src: string
  x?: number
  y?: number
  onChange?: (x: number, y: number) => void
}

export class FocalPicker extends Component<FocalPickerProps> {
  canvas: HTMLCanvasElement | null

  state = {
    height: 0,
    width: 0,
    x: 0,
    y: 0,
    moving: false
  }

  get ctx(): CanvasRenderingContext2D {
    if (!this.canvas) {
      throw new Error("No canvas")
    }
    const ctx = this.canvas.getContext("2d")
    if (!ctx) {
      throw new Error("No context")
    }
    return ctx
  }

  handleLoad = (e: any) => {
    console.log(e.target)
    const [height, width] = [e.target.naturalHeight, e.target.naturalWidth]
    this.setState({ height, width })
    if (this.canvas) {
      this.canvas.height = height
      this.canvas.width = width
    }
    this.ctx.drawImage(e.target, 0, 0, width, height)
    this.initializeFocalPicker()
  }

  componentDidMount() {
    const img = new Image()
    img.addEventListener("load", this.handleLoad)
    img.src = this.props.src
  }

  startDrag = (e: any) => {
    console.log(e.currentTarget)
  }

  handleDragStart = (e: any) => {
    this.setState({ moving: true })
  }

  handleDragEnd = (e: any) => {
    if (this.state.moving) {
      const { onChange } = this.props
      this.setState({ moving: false })
      onChange && onChange(this.state.x, this.state.y)
    }
  }

  handleMove = (e: any) => {
    if (this.state.moving) {
      const x = Math.round(e.clientX / this.state.width * 1000) / 1000
      const y = Math.round(e.clientY / this.state.height * 1000) / 1000
      if (x <= 1 && y <= 1) {
        this.setState({ x, y })
      } else {
        this.handleDragEnd(e)
      }
    }
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

  render() {
    const { height, width, x, y } = this.state
    return (
      <div
        style={{ position: "relative", height, width, overflow: "hidden" }}
        onMouseMove={this.handleMove}
        onMouseLeave={this.handleDragEnd}
      >
        <canvas style={{ maxWidth: "100%" }} ref={el => (this.canvas = el)} />
        <svg
          onMouseDown={this.handleDragStart}
          onMouseUp={this.handleDragEnd}
          onDrag={this.handleMove}
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
