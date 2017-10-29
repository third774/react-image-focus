import * as React from "react"
import "./App.css"
import { FocalImage } from "./lib/FocalImage"
import { PickerContainer } from "./PickerContainer"

const IMG_SRC = "https://picsum.photos/2000/5000?random"

class App extends React.Component {
  state = {
    imgUrl: IMG_SRC,
    x: 0.5,
    y: 0.5,
  }

  handleChange = (x: number, y: number) => {
    this.setState({ x, y })
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
        <PickerContainer src={imgUrl} onChange={this.handleChange} />
      </div>
    )
  }
}

export default App
