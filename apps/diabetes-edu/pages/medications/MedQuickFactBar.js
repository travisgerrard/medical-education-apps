import React from 'react';
import styled from 'styled-components';

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
  width: 20%;
  text-align: center;
`;

const HeartContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Helvetica Neue, Arial, sans-serif;
  background-color: #a665a6;
  width: 20%;
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
  height: 40%;
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

function MedQuickFactBar({
  a1cText,
  rountineText,
  lowBloodSugarText,
  weightChangeText,
  heartBenefitText,
  costText,
}) {
  return (
    <Container>
      <A1cContainer>
        <TopContainer>A1c↓</TopContainer>

        <BottomContainer>
          <span>{a1cText}</span>
        </BottomContainer>
      </A1cContainer>
      <RoutineContainer>
        <TopContainer>Routine</TopContainer>

        <BottomContainer>
          <span>{rountineText}</span>
        </BottomContainer>
      </RoutineContainer>
      <LowBloodSugarContainer>
        <TopContainer>
          <span>Low Blood Sugar</span>
        </TopContainer>

        <BottomContainer>
          <span>{lowBloodSugarText}</span>
        </BottomContainer>
      </LowBloodSugarContainer>
      <WeightChangeContainer>
        <TopContainer>
          <span>Weight Change</span>
        </TopContainer>

        <BottomContainer>{weightChangeText}</BottomContainer>
      </WeightChangeContainer>
      <HeartContainer>
        <TopContainer>
          <span>Heart Benefit</span>
        </TopContainer>

        <BottomContainer>{heartBenefitText}</BottomContainer>
      </HeartContainer>
      <CostContainer>
        <TopContainer>
          <span>Cost</span>
        </TopContainer>

        <BottomContainer>
          <span>{costText}</span>
        </BottomContainer>
      </CostContainer>
    </Container>
  );
}

export default MedQuickFactBar;
