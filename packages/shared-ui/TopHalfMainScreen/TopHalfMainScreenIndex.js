import React, { useState, useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components';
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

function TopHalfMainScreenIndex({ percent, offsetPercent, nextOnReadingList, welcomeText, startPath }) {
  const theme = useTheme();
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
        strokeColor={theme.colors.primary}
        textColor="rgba(255, 255, 255, 0.75)"
      />
      <ContReadingSection
        offsetPercent={offsetPercent}
        section={section}
        nextOnReadingList={nextOnReadingList}
        theNextSectionId={theNextSectionId}
        theNextSectionTitle={theNextSectionTitle}
        welcomeText={welcomeText}
        startPath={startPath}
      />
    </CircleContainer>
  );
}

export default TopHalfMainScreenIndex;
