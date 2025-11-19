import React, { useState, useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const TitleText = styled.div`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Ubuntu, 'Helvetica Neue', sans-serif;
  color: rgba(255, 255, 255, 0.9);
  font-size: 20px;
  font-weight: 900;
`;

const Input = styled.input`
  width: 50%;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 24px;
  border-radius: 50px;
  color: black;
  background: white;
  border: none;
  align-self: center;
  margin: 16px;
  font-size: 22px;
  min-height: 40px;
`;

const ErrorText = styled.div`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Ubuntu, 'Helvetica Neue', sans-serif;
  color: rgba(255, 0, 0, 0.75);
  font-size: 20px;
  font-weight: 900;
  padding-bottom: 10px;
`;

export const Button = styled.div`
  align-items: center;
  justify-content: center;
  background-color: rgb(1, 121, 213);
  border-color: rgb(32, 137, 220);
  border-radius: 10px;
  height: 50px;
  padding: 8px;
  width: 200px;
  transition: all 0.25s;
  cursor: pointer;
  p {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Ubuntu, 'Helvetica Neue', sans-serif;
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    align-self: center;
  }
  &:hover {
    opacity: 0.5;
  }
  &:active {
    opacity: 0.2;
  }
`;

export default function AccessCodeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [isValidAcessCode, setIsValidAcessCode] = useState(true);

  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  async function submitAccessToken() {
    setIsLoading(true);
    signin({ accessCode });
  }

  useEffect(() => {
    // setIsValidAcessCode(
    //   !state.errorMessage.length || accessCodeInput.current.shake()
    // );
    if (state.token) {
      navigation.navigate('Disclaimer');
    }
    setIsLoading(false);
  }, [state]);

  console.log(state);

  return (
    <Container>
      <TitleText>Enter code to get started</TitleText>
      <div />
      <Input
        autocapitalize="none"
        placeholder="Access Code"
        autocomplete="on"
        autocorrect="off"
        enterkeyhint="done"
        spellcheck="false"
        value={accessCode}
        onChange={(e) => setAccessCode(e.target.value)}
      />
      {state.errorMessage && <ErrorText>{state.errorMessage}</ErrorText>}
      <Button onClick={() => submitAccessToken()}>
        <p>SUBMIT</p>
      </Button>
    </Container>
  );
}
