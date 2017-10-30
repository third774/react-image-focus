# react-focal-image
A component for displaying images and intelligently cropping based on a specific focal point.

## Usage

### Displaying Images

```jsx
import React from "react"
import { FocalImage } from "image-focal-picker"

class App extends React.Component {
  render() {
    const { x, y, imgUrl } = this.state
    return (
      <div className="App">
        <div className="container">
          <FocalImage src="https://picsum.photos/3000/1700" focalPoint={{ x: 0.25, y: 0.75 }} />
        </div>
      </div>
    )
  }
}
```
