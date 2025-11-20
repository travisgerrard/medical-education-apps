import React, { useContext } from 'react';
import { AuthContext } from '@medical-edu/shared-contexts';
import styled, { useTheme } from 'styled-components';
import { Container, TitleText, Button } from './AccessCodeScreen';

const TitleTextDisclaimer = styled(TitleText)`
  padding-left: 10%;
  padding-right: 10%;
  padding-bottom: 24px;
  text-align: center;
`;

export default function DisclaimerPage() {
  const theme = useTheme();
  const { agreeToDisclaimer } = useContext(AuthContext);

  async function submitAgreeToDisclaimer() {
    agreeToDisclaimer();
  }

  return (
    <Container>
      <TitleTextDisclaimer>
        {theme.text.disclaimerText}
      </TitleTextDisclaimer>
      <Button onClick={() => submitAgreeToDisclaimer()}>
        <p>AGREE</p>
      </Button>
    </Container>
  );
}
