import * as React from "react"
import "./App.css"
import { FocalImage } from "./lib/FocalImage"
import { PickerContainer } from "./PickerContainer"

const DEFAULT_IMG_URL = "https://picsum.photos/2300/1700"

class App extends React.Component {
  state = {
    imgUrl: DEFAULT_IMG_URL,
    x: 0.5,
    y: 0.5,
  }

  handleChange = (x: number, y: number) => {
    this.setState({ x, y })
  }

  handleImgSrcChange = (imgUrl: string) => {
    this.setState({ imgUrl })
  }

  render() {
    const { x, y, imgUrl } = this.state
    return (
      <div className="App">
        <FocalImage src={imgUrl} focalPoint={{ x, y }} />
        <FocalImage src={imgUrl} focalPoint={{ x, y }} />
        <FocalImage src={imgUrl} focalPoint={{ x, y }} />
        <FocalImage src={imgUrl} focalPoint={{ x, y }} />
        <FocalImage src={imgUrl} focalPoint={{ x, y }} />
        <FocalImage src={imgUrl} focalPoint={{ x, y }} />
        <FocalImage src={imgUrl} focalPoint={{ x, y }} />
        <FocalImage src={imgUrl} focalPoint={{ x, y }} />
        <FocalImage src={imgUrl} focalPoint={{ x, y }} />
        <PickerContainer
          x={x}
          y={y}
          src={imgUrl}
          onChange={this.handleChange}
          onImgSrcChange={this.handleImgSrcChange}
        />
      </div>
    )
  }
}

export default App
