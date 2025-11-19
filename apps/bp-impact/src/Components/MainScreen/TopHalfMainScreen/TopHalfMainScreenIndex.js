import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import CircularProgressIndicator from './CircleProgressBar/CircleProgressBar';
import ContReadingSection from './ContReadingSection';

const CircleContainer = styled.div`
  width: 50%;
`;

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function TopHalfMainScreenIndex({ percent, offsetPercent, nextOnReadingList }) {
  const { section, theNextSectionTitle, theNextSectionId } = nextOnReadingList;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (percent === 0) {
      setProgress(0);
    }
  }, [percent]);

  useInterval(() => {
    if (progress < percent) {
      setProgress(progress + 1);
    }
  }, 100);

  return (
    <CircleContainer>
      <CircularProgressIndicator
        percentage={percent}
        trailStrokeColor="rgb(255, 50, 50, 0.25)"
        strokeColor="rgb(255, 50, 50)"
        strokeWidth={2}
        trailStrokeWidth={2}
        textColor="rgba(255, 255, 255, 0.75)"
      />
      <ContReadingSection
        offsetPercent={offsetPercent}
        section={section}
        nextOnReadingList={nextOnReadingList}
        theNextSectionId={theNextSectionId}
        theNextSectionTitle={theNextSectionTitle}
      />
    </CircleContainer>
  );
}

export default TopHalfMainScreenIndex;
