import React, { useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import styled from 'styled-components';
import { Container, TitleText, Button } from './AccessCodeScreen';

const TitleTextDisclaimer = styled(TitleText)`
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 24px;
  text-align: center;
`;

export default function DisclaimerPage() {
  const { agreeToDisclaimer } = useContext(AuthContext);

  async function submitAgreeToDisclaimer() {
    agreeToDisclaimer();
  }

  return (
    <Container>
      <TitleTextDisclaimer>
        The Hypertension Application provides useful information but is not a
        substitute for professional medical advice, diagnosis, or treatment. If
        you think you may have a medical emergency, immediately call your doctor
        or dial 911. Before acting on any of the information in the Hypertension
        Application, consult with your doctor or nurse to make sure that it is
        right for you.
      </TitleTextDisclaimer>
      <Button onClick={() => submitAgreeToDisclaimer()}>
        <p>AGREE</p>
      </Button>
    </Container>
  );
}
