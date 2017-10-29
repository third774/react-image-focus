import * as React from "react"
import "./App.css"
import { FocalImage } from "./lib/FocalImage"
import { PickerContainer } from "./PickerContainer"

const IMG_SRC = "https://picsum.photos/4000/2400"

class App extends React.Component {
  state = {
    imgUrl: IMG_SRC,
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
        <div className="container">
          <FocalImage src={imgUrl} focalPoint={{ x, y }} />
        </div>
        <div className="container">
          <FocalImage src={imgUrl} focalPoint={{ x, y }} />
        </div>
        <div className="container">
          <FocalImage src={imgUrl} focalPoint={{ x, y }} />
        </div>
        <div className="container">
          <FocalImage src={imgUrl} focalPoint={{ x, y }} />
        </div>
        <div className="container">
          <FocalImage src={imgUrl} focalPoint={{ x, y }} />
        </div>
        <div className="container">
          <FocalImage src={imgUrl} focalPoint={{ x, y }} />
        </div>
        <div className="container">
          <FocalImage src={imgUrl} focalPoint={{ x, y }} />
        </div>
        <div className="container">
          <FocalImage src={imgUrl} focalPoint={{ x, y }} />
        </div>
        <div className="container">
          <FocalImage src={imgUrl} focalPoint={{ x, y }} />
        </div>
        <PickerContainer
          src={imgUrl}
          onChange={this.handleChange}
          onImgSrcChange={this.handleImgSrcChange}
        />
      </div>
    )
  }
}

export default App
