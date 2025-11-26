import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';


const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  
  & > a {
    width: 100%;
    display: block;
  }
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
  background-color: ${props => props.theme.colors.primary};
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  font-weight: 500;
  font-family: Helvetica Neue, Arial, sans-serif;
  text-align: center;
  margin: 20px 0 0 0;
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.25s;
  border-radius: 25px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    opacity: 0.9;
    color: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
  }
  &:active {
    opacity: 0.7;
    color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.5);
  }
`;

const ContReadingSection = ({
  offsetPercent,
  section,
  nextOnReadingList,
  theNextSectionId,
  theNextSectionTitle,
  welcomeText = "You're on your way to becoming\na diabetes expert! Let's start with\nthe courses below.",
  startPath = "/what-is-diabetes/introduction",
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
              <Link
                href={`/${nextOnReadingList.sectionSlug}/${nextOnReadingList.theNextSectionSlug}`}
              >
                <ReadingButton>Continue Reading</ReadingButton>
              </Link>
            </>
          )}
        </TextContainer>
      ) : (
        <TextContainer>
          <TextCallout>Hello!</TextCallout>
          {welcomeText.split('\n').map((line, i) => (
            <RegularText key={i}>{line}</RegularText>
          ))}
          <Link href={startPath}>
            <ReadingButton>Get Reading Now</ReadingButton>
          </Link>
        </TextContainer>
      )}
    </div>
  );
};

export default ContReadingSection;
