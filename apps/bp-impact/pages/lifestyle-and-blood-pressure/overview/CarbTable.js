import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context as TextContext } from '../../../src/Components/context/TextContext';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  max-width: 85vw;

  div {
    flex-shrink: 0;
    background-color: lightgray;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 25px;
    margin-bottom: 25px;
    width: 60vw;
    max-width: 400px;
    border-radius: 25px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
    p {
      font-size: ${(props) => props.textSize};
      font-weight: 400;
      font-family: Helvetica Neue, Arial, sans-serif;
      line-height: 1;
      padding: 0;
      margin: 10px;
    }
    h1 {
      font-size: 24px;
      font-weight: bold;
      font-family: Helvetica Neue, Arial, sans-serif;
    }
  }
`;

export default function CarbTable({ children }) {
  const { state: textState } = useContext(TextContext);

  const { textSize } = textState;

  return <Container textSize={textSize}>{children}</Container>;
}
