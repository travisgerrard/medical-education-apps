import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled, { useTheme } from 'styled-components';

import {
  getSectionFromSlugs,
  getSubsectionFromSlug,
  updateSubSectionsWith,
  updateSection,
  nextSectionTitle,
  nextSectionTitleId,
  firstSubSection,
  nextSectionSlug,
} from './TextScrollViewHelpers';

import {
  ReadingContext,
  NextToReadContext,
  READING_KEY,
  NEXT_READING_KEY,
} from '@medical-edu/shared-contexts';

const Button = styled.div`
  background-color: white;
  border-radius: 8px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-top: 40px;
  margin-bottom: 40px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-out;
  &:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }
  &:active {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    transform: translateY(0px);
  }
`;

const NextLessonText = styled.div`
  color: ${props => props.theme.colors.link};
  font-size: 12px;
  font-weight: 900;
  font-family: Helvetica Neue, Arial, sans-serif;
`;

export const LAST_SECTION_ID = '7';

export default function NextSectionButton({ route }) {
  const theme = useTheme();
  const router = useRouter();

  var routes = route.split('/');

  const { state: readingState, setReadingArray } = useContext(ReadingContext);
  const { readingArray } = readingState;
  const { setNextOnReadingList } = useContext(NextToReadContext);

  useEffect(() => {
    async function firstLoad() {
      try {
        const value = localStorage.getItem(READING_KEY);
        if (value !== null) {
          const readingArray = JSON.parse(value);
          setReadingArray(readingArray);
        }
      } catch (error) {
        console.log(error);
      }

      try {
        const value = localStorage.getItem(NEXT_READING_KEY);

        if (value !== null) {
          const nextReadingArray = JSON.parse(value);
          setNextOnReadingList(nextReadingArray);
        }
      } catch (error) {
        console.log(error);
      }
    }

    firstLoad();
  }, []);

  const section = getSectionFromSlugs(readingArray, routes[1]);

  // If it's not a diabetes section
  if (!section) {
    return null;
  }

  const subSections = section.sections;
  const subSection = getSubsectionFromSlug(subSections, routes[2]);
  if (!subSection) {
    return null;
  }
  const sectionId = section.id;
  const subSectionId = subSection.id;

  const theNextSectionTitle = nextSectionTitle(
    readingArray,
    sectionId,
    subSectionId
  );
  const theNextSectionSlug = nextSectionSlug(
    readingArray,
    sectionId,
    subSectionId
  );
  const theNextSectionId = nextSectionTitleId(
    readingArray,
    sectionId,
    subSectionId
  );

  function updateReadingArray() {
    const updatedSubSection = { ...subSection, hasRead: true };
    const updatedSubSections = updateSubSectionsWith(
      subSections,
      updatedSubSection,
      subSectionId
    );
    const updatedReadingArray = updateSection(
      updatedSubSections,
      readingArray,
      sectionId
    );
    setReadingArray(updatedReadingArray);

    if (theNextSectionId === 'Close Section') {
      if (sectionId === LAST_SECTION_ID) {
        setNextOnReadingList({
          section: sectionId,
          sectionSlug: routes[1],
          theNextSectionTitle: 'complete',
          theNextSectionSlug: 'complete',
          theNextSectionId: 5,
        });
      } else {
        const nextSectionFirstSubSection = firstSubSection(
          readingArray,
          `${Number(sectionId) + 1}`
        );
        setNextOnReadingList({
          section: `${Number(sectionId) + 1}`,
          sectionSlug: nextSectionFirstSubSection[0].slug,
          theNextSectionTitle: nextSectionFirstSubSection[1].title,
          theNextSectionSlug: nextSectionFirstSubSection[1].slug,
          theNextSectionId: nextSectionFirstSubSection[1].id,
        });
      }
    } else {
      setNextOnReadingList({
        section: sectionId,
        sectionSlug: routes[1],
        theNextSectionTitle,
        theNextSectionSlug,
        theNextSectionId,
      });
    }
  }

  return (
    <Button
      onTouchEnd={() => {
        if (theNextSectionTitle !== 'Close Section') {
          updateReadingArray();
          router
            .push(`/${routes[1]}/${theNextSectionSlug}`)
            .then(() => window.scrollTo(0, 0));
        } else {
          updateReadingArray();
          router.push(`/`).then(() => window.scrollTo(0, 0));
        }
      }}
      onClick={() => {
        if (theNextSectionTitle !== 'Close Section') {
          updateReadingArray();
          router
            .push(`/${routes[1]}/${theNextSectionSlug}`)
            .then(() => window.scrollTo(0, 0));
        } else {
          updateReadingArray();
          sectionId === LAST_SECTION_ID
            ? router.push(`/complete`).then(() => window.scrollTo(0, 0))
            : router.push(`/`).then(() => window.scrollTo(0, 0));
        }
      }}
    >
      <div>
        {theNextSectionTitle !== 'Close Section' && (
          <NextLessonText> NEXT LESSON</NextLessonText>
        )}
        <div>{theNextSectionTitle}</div>
      </div>
      <theme.icons.nextSection color={theme.colors.link} fontSize="32px" />
    </Button>
  );
}
