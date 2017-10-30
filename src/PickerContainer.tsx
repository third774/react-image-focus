import React, { StatelessComponent } from "react"
import styled from "styled-components"
import { FocalPicker } from "./lib/FocalPicker"

const Container = styled.div`
  position: fixed;
  top: 30px;
  left: 30px;
  width: 300px;
  padding: 12px;
  background-color: ghostwhite;
  border-radius: 4px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.8);
`

const Instruction = styled.p`margin: 10px 0 5px 0;`

const SrcInput = styled.input`
  width: 100%;
  margin: 5px 0;
  padding: 4px 0;
  border: 1px solid gray;
  border-radius: 4px;
  font-size: 16px;
  font-family: monospace;
`

interface PickerContainerProps {
  x: number
  y: number
  src: string
  onChange: (x: number, y: number) => void
  onImgSrcChange: (url: string) => void
}

const handleChange = (onImgSrcChange: (url: string) => void) => (e: any) => {
  const url = e.target.value
  onImgSrcChange(url)
}

export const PickerContainer: StatelessComponent<PickerContainerProps> = ({
  x,
  y,
  src,
  onChange,
  onImgSrcChange,
}) => (
  <Container>
    <Instruction>Drag to select focus</Instruction>
    <FocalPicker src={src} x={x} y={y} onChange={onChange} />
    <Instruction>Change URL to update image:</Instruction>
    <SrcInput value={src} onChange={handleChange(onImgSrcChange)} />
    <Instruction>Focal Coordinates:</Instruction>
    <SrcInput
      value={`{ x: ${x.toFixed(3)}, y: ${y.toFixed(3)} }`}
      readOnly={true}
    />
  </Container>
)
