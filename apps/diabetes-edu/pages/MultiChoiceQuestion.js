import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: rgb(0, 162, 97);
  padding-top: 10px;
  padding-bottom: 5px;
  padding-right: 15px;
  padding-left: 15px;
  /* margin-right: 25px; */
  margin-bottom: 25px;
  margin-top: 50spx;
  /* width: 60vw; */
  /* max-width: 400px; */
  border-radius: 25px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
`;

const Heading = styled.h2`
  color: rgba(255, 255, 255, 0.9);
  font-family: Helvetica Neue, Arial, sans-serif;
  margin: 0;
  margin-bottom: 6px;
`;

const SubHeading = styled.h3`
  color: rgba(255, 255, 255, 0.9);
  font-family: Helvetica Neue, Arial, sans-serif;
  margin: 0;
  margin-bottom: 6px;
`;

const QuestionText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  font-weight: 500;
  font-family: Helvetica Neue, Arial, sans-serif;
  line-height: 1.2;
  margin: 5px;
  padding: 10px;
  padding-left: 25px;
  border-radius: 25px;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.9);
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  opacity: ${(props) => (props.hasAnswered && !props.isAnswer ? 0.2 : 1)};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

function QuestionTextFunction({ children, isAnswer }) {
  const [answered, setAnswered] = useState(false);

  const guessedAndWrong = answered && !isAnswer;
  const guessedAndWrite = answered && isAnswer;

  return (
    <QuestionText
      onClick={() => setAnswered(true)}
      hasAnswered={answered}
      isAnswer={isAnswer}
    >
      {children} {guessedAndWrong && 'X'}
      {guessedAndWrite && '✓'}
    </QuestionText>
  );
}

function MultiChoiceQuestion({ question, answers }) {
  return (
    <Container>
      <Heading>Review Question</Heading>
      <hr />
      <SubHeading>{question}</SubHeading>
      {answers.map((question) => {
        return (
          <QuestionTextFunction
            isAnswer={question.isAnswer}
            key={question.answerText}
          >
            {question.answerText}
          </QuestionTextFunction>
        );
      })}
    </Container>
  );
}

export default MultiChoiceQuestion;
