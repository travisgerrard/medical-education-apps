import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import styled from 'styled-components';
import IosArrowDropup from 'react-ionicons/lib/IosArrowDropup';
import IosArrowDropdown from 'react-ionicons/lib/IosArrowDropdown';
import IosMenu from 'react-ionicons/lib/IosMenu';
import Card from './Card/Card';
import TopHalfMainScreenIndex from './TopHalfMainScreen/TopHalfMainScreenIndex';
import { Context as ReadingContext } from '../context/ReadingContext';
import { Context as NextToReadContext } from '../context/NextToReadContext';
import { Context as MenuScrollContext } from '../context/MenuScrollContext';
import { useRouter } from 'next/router';
import VM_Small from './VM_Small.png';

import { DATA } from '../../../SectionOutline';

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`;

const Menu = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  opacity: ${(props) => (props.listFullScreen === '50vh' ? '100%' : '0%')};
  transition: all 0.25s;

  svg {
    transition: all 0.25s;

    &:hover {
      opacity: 0.5;
    }
    &:active {
      opacity: 0.3;
    }
  }

  img {
    background-color: white;
    margin-right: 26px;
    padding: 3px;
    border-radius: 5px;
    height: 40px;
    width: 55px;
    object-fit: contain;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.8);
    cursor: pointer;
    transition: all 0.25s;

    &:hover {
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
      opacity: 0.9;
    }
    &:active {
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.5);
      opacity: 0.8;
    }
  }
`;

const TopHalfContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding-top: 25px;
  max-width: 500px;
  justify-items: center;
  transition: all 0.5s;
  opacity: ${(props) => (props.listFullScreen === '50vh' ? '100%' : '0%')};
`;

const Title = styled.div`
  position: relative;
  float: right;
  padding-right: 26px;
  padding-top: 16px;
`;

const StyledCardContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  position: absolute;
  width: 100%;
  transition: all 0.5s;
  top: ${(props) => props.listFullScreen};
`;

const StyledCard = styled.div`
  flex-shrink: 0;
  background-color: white;

  /* height: 80%; */
  width: 80vw;
  margin: 2.5vw;
  margin-top: 5vh;

  border-radius: 25px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  /* top: 50vh; */
`;

export const READING_KEY = 'READING';
export const NEXT_READING_KEY = 'NEXT_READING';

function VerticalHalfPaginator() {
  const myRef = useRef(null);

  const { setReadingArray } = useContext(ReadingContext);
  const { setNextOnReadingList } = useContext(NextToReadContext);
  const { state: menuScrollState, setScrollValue } = useContext(
    MenuScrollContext
  );
  const router = useRouter();

  const scrollEvent = (e) => {
    setScrollValue(e.target.scrollLeft);
  };

  useLayoutEffect(() => {
    myRef.current.scrollTo(menuScrollState.scrollPosition, 0);
  }, []);

  useEffect(() => {
    // console.log(menuScrollState);
    async function firstLoad() {
      try {
        const value = localStorage.getItem(READING_KEY);
        if (value !== null) {
          const readingArray = JSON.parse(value);

          var numberOfSectionsInMaster = numberOfSubSections(DATA);
          var numberOfObjectsInLocal = numberOfSubSections(readingArray);

          // If master data section number is the same as local secion, return local section
          if (numberOfSectionsInMaster == numberOfObjectsInLocal) {
            setReadingArray(readingArray);
          } else {
            DATA.forEach((category, i) => {
              // Assuming no new categories...
              category.sections.forEach((section, j) => {
                var masterSectionTitle = section.title;
                var localSection = readingArray[i].sections[j];
                if (localSection) {
                  var localSectionTitle = readingArray[i].sections[j].title;
                  if (masterSectionTitle !== localSectionTitle) {
                    // replace local sections with new section from master
                    readingArray[i].sections[j] = section;
                  }
                } else {
                  // if the local section does not exist...add it
                  readingArray[i].sections[j] = section;
                }
              });
            });
            setReadingArray(readingArray);
          }
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

  const [listFullScreen, setListFullScreen] = useState('50vh');
  const [offsetPercent, setOffsetPercent] = useState(1);

  const { state: readingState } = useContext(ReadingContext);
  const { readingArray } = readingState;

  return (
    <Container>
      <Menu listFullScreen={listFullScreen}>
        <IosMenu
          color="white"
          fontSize="32px"
          style={{ padding: '26px', cursor: 'pointer' }}
          onClick={() =>
            router.push(`/about`).then(() => window.scrollTo(0, 0))
          }
        />
        <img
          src={VM_Small}
          onClick={() =>
            router
              .push(`https://www.virginiamason.org`)
              .then(() => window.scrollTo(0, 0))
          }
        />
      </Menu>
      <TopHalfContainer listFullScreen={listFullScreen}>
        <TopHalfMainScreen offsetPercent={offsetPercent} />
      </TopHalfContainer>
      <StyledCardContainer
        listFullScreen={listFullScreen}
        onScroll={scrollEvent}
        ref={myRef}
      >
        {readingArray.map((item) => {
          return (
            <CardsArray
              item={item}
              key={item.id}
              setListFullScreen={setListFullScreen}
              listFullScreen={listFullScreen}
            />
          );
        })}
      </StyledCardContainer>
    </Container>
  );
}

export default VerticalHalfPaginator;

const CardsArray = ({ item, setListFullScreen, listFullScreen }) => {
  const { state: readingState } = useContext(ReadingContext);
  const { readingArray } = readingState;

  const readingItem = readingArray.filter((arrayItem) => {
    return arrayItem.id === item.id;
  });

  return (
    <StyledCard>
      <Title
        onClick={() =>
          setListFullScreen(listFullScreen === '50vh' ? '0vh' : '50vh')
        }
      >
        {listFullScreen === '50vh' ? (
          <IosArrowDropup fontSize="32px" style={{ cursor: 'pointer' }} />
        ) : (
          <IosArrowDropdown fontSize="32px" style={{ cursor: 'pointer' }} />
        )}
      </Title>
      <Card key={readingItem[0].id} item={readingItem[0]} />
    </StyledCard>
  );
};

const TopHalfMainScreen = ({ offsetPercent }) => {
  const { state: readingState } = useContext(ReadingContext);
  const { readingArray } = readingState;

  const [percentRead, setPercentRead] = useState(0);

  const { state: readingListState } = useContext(NextToReadContext);
  const { nextOnReadingList } = readingListState;

  useEffect(() => {
    readingProgress();
  }, [readingArray]);

  function readingProgress() {
    const hasReadArray = readingArray.map((section) => {
      return section.sections.filter((subSection) => {
        return subSection.hasRead;
      }).length;
    });
    const hasReadTotal = hasReadArray.reduce((a, b) => a + b, 0);

    const percentHasRead = Math.round(
      (hasReadTotal / numberOfSubSections(DATA)) * 100
    );

    setPercentRead(percentHasRead);
  }

  return (
    <TopHalfMainScreenIndex
      percent={percentRead}
      offsetPercent={offsetPercent}
      nextOnReadingList={nextOnReadingList}
      style={{}}
    />
  );
};

function numberOfSubSections(array) {
  var TOTAL_NUMBER_OF_SECTIIONS = 0;

  array.forEach((category) => {
    TOTAL_NUMBER_OF_SECTIIONS += category.sections.length;
  });
  return TOTAL_NUMBER_OF_SECTIIONS;
}
