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

const A1cContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Helvetica Neue, Arial, sans-serif;
  background-color: #ff7576;
  width: 20%;
  text-align: center;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Helvetica Neue, Arial, sans-serif;
  background-color: white;
  width: 40%;
  text-align: center;
`;

const RoutineContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Helvetica Neue, Arial, sans-serif;
  background-color: #dbcd4a;
  width: 25%;
  text-align: center;
`;

const LowBloodSugarContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Helvetica Neue, Arial, sans-serif;
  background-color: #f3b05c;
  width: 25%;
  text-align: center;
`;

const WeightChangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Helvetica Neue, Arial, sans-serif;
  background-color: #727fb5;
  width: 25%;
  text-align: center;
`;

const HeartContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Helvetica Neue, Arial, sans-serif;
  background-color: #a665a6;
  width: 25%;
  text-align: center;
`;

const CostContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Helvetica Neue, Arial, sans-serif;
  background-color: #32b3c4;
  width: 20%;
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
        <TopContainer>Name</TopContainer>
        <BottomContainer>
          <Link href="/medications/metformin">Metformin</Link>
        </BottomContainer>
        <BottomContainer>
          <Link href="/medications/sulfonylureas">Sulfonylureas</Link>
        </BottomContainer>
        <BottomContainer>
          <Link href="/medications/dpp4-inhibitors">DPP-4</Link>
        </BottomContainer>
        <BottomContainer>
          <Link href="/medications/sglt2-inhibitors">SGLT2</Link>
        </BottomContainer>
        <BottomContainer>
          <Link href="/medications/glp1-agonists">GLP-1</Link>
        </BottomContainer>
        <BottomContainer>
          <Link href="/medications/insulin">Insulin</Link>
        </BottomContainer>
      </NameContainer>
      <A1cContainer>
        <TopContainer>A1c↓</TopContainer>

        <BottomContainer>
          <span>1-2%</span>
        </BottomContainer>
        <BottomContainer>
          <span>1-2%</span>
        </BottomContainer>
        <BottomContainer>
          <span>0.5-1%</span>
        </BottomContainer>
        <BottomContainer>
          <span>0.5-1%</span>
        </BottomContainer>
        <BottomContainer>
          <span>0.8-1.2%</span>
        </BottomContainer>
        <BottomContainer>
          <span>∞</span>
        </BottomContainer>
      </A1cContainer>
      <RoutineContainer>
        <TopContainer>Routine</TopContainer>

        <BottomContainer>
          <span>Daily / Twice Daily Pill</span>
        </BottomContainer>
        <BottomContainer>
          <span>Daily / Twice Daily Pill</span>
        </BottomContainer>
        <BottomContainer>
          <span>Daily Pill</span>
        </BottomContainer>
        <BottomContainer>
          <span>Daily Pill</span>
        </BottomContainer>
        <BottomContainer>
          <span>Weekly / Daily / 2x Daily Injection</span>
        </BottomContainer>
        <BottomContainer>
          <span>Daily / Twice Daily Injection</span>
        </BottomContainer>
      </RoutineContainer>
      <LowBloodSugarContainer>
        <TopContainer>
          <span>Low Blood Sugar</span>
        </TopContainer>

        <BottomContainer>
          <span>No</span>
        </BottomContainer>
        <BottomContainer>
          <span>Yes - Monitor</span>
        </BottomContainer>
        <BottomContainer>
          <span>No</span>
        </BottomContainer>
        <BottomContainer>
          <span>No</span>
        </BottomContainer>
        <BottomContainer>
          <span>No</span>
        </BottomContainer>
        <BottomContainer>
          <span>Yes - Monitor</span>
        </BottomContainer>
      </LowBloodSugarContainer>
      <WeightChangeContainer>
        <TopContainer>
          <span>Weight Change</span>
        </TopContainer>

        <BottomContainer>Neutral</BottomContainer>
        <BottomContainer>Gain</BottomContainer>
        <BottomContainer>Neutral</BottomContainer>
        <BottomContainer>Loss</BottomContainer>
        <BottomContainer>Loss</BottomContainer>
        <BottomContainer>Gain</BottomContainer>
      </WeightChangeContainer>
      <HeartContainer>
        <TopContainer>
          <span>Heart Benefit</span>
        </TopContainer>

        <BottomContainer>Potential</BottomContainer>
        <BottomContainer>Neutral</BottomContainer>
        <BottomContainer>Neutral</BottomContainer>
        <BottomContainer>Benefit</BottomContainer>
        <BottomContainer>Neutral</BottomContainer>
        <BottomContainer>Neutral</BottomContainer>
      </HeartContainer>
      <CostContainer>
        <TopContainer>
          <span>Cost</span>
        </TopContainer>

        <BottomContainer>
          <span>Low</span>
        </BottomContainer>
        <BottomContainer>
          <span>Low</span>
        </BottomContainer>
        <BottomContainer>
          <span>High</span>
        </BottomContainer>
        <BottomContainer>
          <span>High</span>
        </BottomContainer>
        <BottomContainer>
          <span>High</span>
        </BottomContainer>
        <BottomContainer>
          <span>Low to High</span>
        </BottomContainer>
      </CostContainer>
    </Container>
  );
}

export default MedQuickFactBar;
