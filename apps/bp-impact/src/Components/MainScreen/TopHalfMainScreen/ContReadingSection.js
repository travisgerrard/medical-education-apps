import React from 'react';
import styled from 'styled-components';
import { LAST_SECTION_ID } from '../../ReadingScreen/NextSectionButton';

import { StyledLink } from '../Card/Card';

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const TextCallout = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 20px;
  font-weight: 900;
  font-family: Helvetica Neue, Arial, sans-serif;
  margin: 0;
  margin-bottom: 8px;
`;

const RegularText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  font-weight: 500;
  font-family: Helvetica Neue, Arial, sans-serif;
  line-height: 1.2;
  margin: 0;
`;

const ReadingButton = styled.p`
  background-color: rgba(255, 65, 65, 0.9);
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  font-weight: 500;
  font-family: Helvetica Neue, Arial, sans-serif;
  text-align: center;
  margin-top: 20px;
  padding: 15px;
  width: 100%;
  transition: all 0.25s;
  border-radius: 25px;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 65, 65, 1);
    color: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
  }
  &:active {
    background-color: rgba(0, 122, 73, 0.3);
    color: rgba(255, 255, 255, 0.3);
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.5);
  }
`;

const ContReadingSection = ({
  offsetPercent,
  section,
  nextOnReadingList,
  theNextSectionId,
  theNextSectionTitle,
}) => {
  return (
    <div style={{ opacity: offsetPercent, zIndex: offsetPercent * 100 - 1 }}>
      {section ? (
        <TextContainer>
          {nextOnReadingList.theNextSectionSlug === 'complete' ? (
            <>
              <TextCallout>Congratulations</TextCallout>
              <RegularText>
                You have completed the Virginia Mason Diabetes Education
                Application.
              </RegularText>
            </>
          ) : (
            <>
              <TextCallout>Keep Going!</TextCallout>

              <RegularText>Next up is</RegularText>
              <RegularText>
                {`
             ${nextOnReadingList.theNextSectionTitle}`}
              </RegularText>
              <RegularText>You're making great progress.</RegularText>
              <StyledLink
                href={`/${nextOnReadingList.sectionSlug}/${nextOnReadingList.theNextSectionSlug}`}
              >
                <ReadingButton>Continue Reading</ReadingButton>
              </StyledLink>
            </>
          )}
        </TextContainer>
      ) : (
        <TextContainer>
          <TextCallout>Hello!</TextCallout>
          <RegularText>You're on your way to becoming</RegularText>
          <RegularText>a hypertention expert! Let's start with</RegularText>
          <RegularText>the courses below.</RegularText>
          <StyledLink href="/what-is-hypertension/introduction">
            <ReadingButton>Get Reading Now</ReadingButton>
          </StyledLink>
        </TextContainer>
      )}
    </div>
  );
};

export default ContReadingSection;
