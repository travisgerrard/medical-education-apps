import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context as ReadingContext } from '../../src/Components/context/ReadingContext';
import { Context as NextToReadContext } from '../../src/Components/context/NextToReadContext';
import Router from 'next/router';

const ResetButtonContainer = styled.div`
  display: flex;
  flex-direction: 'row';
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 65, 65, 0.9);
  color: white;
  text-align: center;
  border-radius: 22px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  padding-top: 16px;
  padding-bottom: 16px;
  font-size: 16px;
  font-weight: 400;
  font-family: Helvetica Neue, Arial, sans-serif;
  line-height: 1.2;
  margin-bottom: 16px;
  margin-top: 64px;
  transition: all 0.25s;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 65, 65, 1);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.5);
  }
  &:active {
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.5);
  }
`;

function ResetButton() {
  const { clearReadingArray } = useContext(ReadingContext);
  const { clearNextReading } = useContext(NextToReadContext);

  return (
    <ResetButtonContainer
      onClick={() => {
        if (
          confirm(
            'This button will clear your reading history. There is no way to undo this.'
          )
        ) {
          localStorage.clear();
          clearReadingArray();
          clearNextReading();
          Router.push('/');
          Router.reload(window.location.pathname);
        } else {
          console.log('Cancel Pressed');
        }
      }}
    >
      Reset Reading Progress
    </ResetButtonContainer>
  );
}

export default ResetButton;
