import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  max-width: 85vw;
  /* background-color: rgb(0, 162, 97); */
  /* padding-top: 10px;
  padding-bottom: 5px;
  padding-right: 15px;
  padding-left: 15px;
  margin-bottom: 25px;
  margin-top: 50spx; */
  /* width: 60vw; */
  /* max-width: 400px; */
  /* border-radius: 25px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5); */
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Helvetica Neue, Arial, sans-serif;
  background-color: white;
  width: 60%;
  text-align: center;
`;

const RoutineContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Helvetica Neue, Arial, sans-serif;
  background-color: #dbcd4a;
  /* width: 25%; */
  text-align: center;
`;

const CostContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Helvetica Neue, Arial, sans-serif;
  background-color: #32b3c4;
  width: 50%;
  text-align: center;
`;

const TopContainer = styled.div`
  height: 10%;
  line-height: 50px;
  border-width: 1px;
  border-color: black;
  border-style: solid;
  font-weight: bold;

  span {
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
  }
`;

const BottomContainer = styled.div`
  height: 100px;
  line-height: 75px;
  /* vertical-align: middle; */
  background-color: lightgray;
  border-width: 1px;
  border-color: black;
  border-style: solid;
  padding-left: 5px;
  padding-right: 5px;
  /* font-weight: bold; */

  font-size: 18px;
  span {
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
  }
`;

function MedQuickFactBar() {
  return (
    <Container>
      <NameContainer>
        <TopContainer>Medication</TopContainer>
        <BottomContainer>
          <Link href="/medications/ccb">Calcium Channel Blocker</Link>
        </BottomContainer>

        <BottomContainer>
          <Link href="/medications/acei">ACEi</Link>
        </BottomContainer>
        <BottomContainer>
          <Link href="/medications/arb">ARB</Link>
        </BottomContainer>
        <BottomContainer>
          <Link href="/medications/thiazide">Thiazide Diuretic</Link>
        </BottomContainer>
        <BottomContainer>
          <Link href="/medications/loopdiuretic">Loop Diuretic</Link>
        </BottomContainer>
        <BottomContainer>
          <Link href="/medications/antimineralocorticoid">
            Antimineralocorticoid
          </Link>
        </BottomContainer>
        <BottomContainer>
          <Link href="/medications/bblockers">Beta blockers</Link>
        </BottomContainer>
      </NameContainer>
      {/*
      <RoutineContainer>
        <TopContainer>Recommendation</TopContainer>
        <BottomContainer>
          <span>
            Lose at least 1kg with goal of reaching as close to ideal body
            weight as able
          </span>
        </BottomContainer>
        <BottomContainer>
          <span>Between 1000mg - 1500mg per day</span>
        </BottomContainer>
        <BottomContainer>
          <span>Between 3500mg - 5000mg per day</span>
        </BottomContainer>
        <BottomContainer>
          <span>90 - 150 minutes a week</span>
        </BottomContainer>
        <BottomContainer>
          <span>90 - 150 minutes a week</span>
        </BottomContainer>
        <BottomContainer>
          <span>4 sets of 2 minutes hand grips, 3 sessions a week</span>
        </BottomContainer>
        <BottomContainer>
          <span>
            Reduce alcohol to 2 or fewer drinks in men and 1 or fewer drinks in
            women
          </span>
        </BottomContainer>
      </RoutineContainer> */}

      <CostContainer>
        <TopContainer>
          <span>Impact on BP (SP / DP)</span>
        </TopContainer>

        <BottomContainer>
          <span>10 - 20 / 8 - 12 mm Hg</span>
        </BottomContainer>
        <BottomContainer>
          <span>7 - 17 / 7 - 13 mm Hg</span>
        </BottomContainer>
        <BottomContainer>
          <span>7 - 17 / 7 - 13 mm Hg</span>
        </BottomContainer>
        <BottomContainer>
          <span>10 - 20 / 7 - 13 mm Hg</span>
        </BottomContainer>
        <BottomContainer>
          <span>10 - 20 / 4 - 12 mm Hg</span>
        </BottomContainer>
        <BottomContainer>
          <span>5 - 10 / 1 - 4 mm Hg</span>
        </BottomContainer>
        <BottomContainer>
          <span>10 - 20 / 10 - 14 mm Hg</span>
        </BottomContainer>
      </CostContainer>
    </Container>
  );
}

export default MedQuickFactBar;
