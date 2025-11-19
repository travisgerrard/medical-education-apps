import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import {
  READING_KEY,
  NEXT_READING_KEY,
} from '../MainScreen/VerticalHalfPaginator';
import styled from 'styled-components';

import { BsArrowRightCircle } from 'react-icons/bs';

import {
  getSection,
  getSubsection,
  updateSubSectionsWith,
  updateSection,
  nextSectionTitle,
  nextSectionTitleId,
  firstSubSection,
  getSectionFromSlugs,
  getSubsectionFromSlug,
  nextSectionSlug,
} from './TextScrollViewHelpers';

export const LAST_SECTION_ID = '7';

import { Context as ReadingContext } from '../context/ReadingContext';
import { Context as NextToReadContext } from '../context/NextToReadContext';

const NextSectionButtonContainer = styled.div`
  display: flex;
  flex-direction: 'row';
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 22px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  padding: 16px;
  font-size: 16px;
  font-weight: 400;
  font-family: Helvetica Neue, Arial, sans-serif;
  line-height: 1.2;
  margin-bottom: 16px;
  margin-top: 100px;
  transition: all 0.25s;
  cursor: pointer;
  user-select: none;
  &:hover {
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.5);
  }
  &:active {
    opacity: 0.5;
  }
`;

const NextLessonText = styled.div`
  color: rgb(255, 65, 65);
  font-size: 12px;
  font-weight: 900;
  font-family: Helvetica Neue, Arial, sans-serif;
`;

function NextSectionButton({ route }) {
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
    <NextSectionButtonContainer
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
      <BsArrowRightCircle color="rgb(255, 65, 65)" fontSize="24px" />
    </NextSectionButtonContainer>
  );
}

export default NextSectionButton;
