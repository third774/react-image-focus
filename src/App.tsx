import * as React from "react"
import "./App.css"
import { FocalPicker } from "./FocalPicker"
import { FocalImage } from "./FocalImage"

const IMG_SRC = "https://picsum.photos/1200/1000"

class App extends React.Component {
  state = {
    x: 0,
    y: 0
  }

  handleChange = (x: number, y: number) => {
    console.log(`x: ${x} | y: ${y}`)
    this.setState({ x, y })
  }

  render() {
    const { x, y } = this.state
    return (
      <div className="App">
        <FocalPicker src={IMG_SRC} onChange={this.handleChange} />
        <FocalImage src={IMG_SRC} x={x} y={y} />
      </div>
    )
  }
}

export default App
