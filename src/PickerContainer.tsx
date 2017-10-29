import React, { StatelessComponent } from "react"
import styled from "styled-components"
import { FocalPicker } from "./lib/FocalPicker"

const Container = styled.div`
  position: fixed;
  top: 30px;
  left: 30px;
  width: 200px;
  padding: 12px;
  background-color: papayawhip;
  border-radius: 4px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.8);
`

interface PickerContainerProps {
  src: string
  onChange: (x: number, y: number) => void
}

export const PickerContainer: StatelessComponent<PickerContainerProps> = ({
  src,
  onChange,
}) => (
  <Container>
    <FocalPicker src={src} onChange={onChange} />
  </Container>
)
