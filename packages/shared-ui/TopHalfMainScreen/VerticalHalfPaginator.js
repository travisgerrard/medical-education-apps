import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import styled from 'styled-components';
import { IoCaretUp, IoCaretDown, IoMenu } from 'react-icons/io5';
import Card from '../Card/Card';
import TopHalfMainScreenIndex from './TopHalfMainScreenIndex';
import HamburgerMenu from '../HamburgerMenu';
import {
  ReadingContext,
  NextToReadContext,
  MenuScrollContext,
  READING_KEY,
  NEXT_READING_KEY,
} from '@medical-edu/shared-contexts';
import { useRouter } from 'next/router';

// import { DATA } from '../../../SectionOutline';

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



function VerticalHalfPaginator({ data }) {
  const myRef = useRef(null);

  const { state: readingState, setReadingArray } = useContext(ReadingContext);
  const { readingArray } = readingState;
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

          var numberOfSectionsInMaster = numberOfSubSections(data);
          var numberOfObjectsInLocal = numberOfSubSections(readingArray);

          // If master data section number is the same as local secion, return local section
          if (numberOfSectionsInMaster == numberOfObjectsInLocal) {
            setReadingArray(readingArray);
          } else {
            data.forEach((category, i) => {
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
  const [menuOpen, setMenuOpen] = useState(false);



  return (
    <Container>
      <HamburgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <Menu listFullScreen={listFullScreen}>
        <IoMenu
          color="white"
          fontSize="32px"
          style={{ padding: '26px', cursor: 'pointer' }}
          onClick={() => setMenuOpen(true)}
        />
      </Menu>
      <TopHalfContainer listFullScreen={listFullScreen}>
        <TopHalfMainScreen offsetPercent={offsetPercent} data={data} />
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
          <IoCaretUp fontSize="32px" style={{ cursor: 'pointer' }} />
        ) : (
          <IoCaretDown fontSize="32px" style={{ cursor: 'pointer' }} />
        )}
      </Title>
      <Card key={readingItem[0].id} item={readingItem[0]} />
    </StyledCard>
  );
};

const TopHalfMainScreen = ({ offsetPercent, data }) => {
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
      (hasReadTotal / numberOfSubSections(data)) * 100
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
