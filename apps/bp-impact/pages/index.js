import React, { useContext, useEffect } from 'react';
import { VerticalHalfPaginator } from '@medical-edu/shared-ui';
import { DisclaimerPage } from '@medical-edu/shared-ui';
import { AuthContext } from '@medical-edu/shared-contexts';
import theme from '../theme';
import { DATA } from '../SectionOutline';

export default function Index() {
  const { state, tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  if (state.isLoading) return null;

  // if (state.token === null) {
  //   return <AccessCodeScreen />;
  // } else {
  if (state.disclaimer === null) {
    return <DisclaimerPage />;
  } else {
    const welcomeConfig = {
      welcomeText: "Ready to take control of your blood pressure?\nLet's get started with\nthe courses below.",
      startPath: "/what-is-hypertension/introduction"
    };
    return <VerticalHalfPaginator data={DATA} welcomeConfig={welcomeConfig} />;
  }
  // }
}
