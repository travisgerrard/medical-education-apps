import React, { useContext, useEffect } from 'react';
import { VerticalHalfPaginator, DisclaimerPage } from '@medical-edu/shared-ui';
import { AuthContext } from '@medical-edu/shared-contexts';
import { DATA } from '../SectionOutline';
import { theme } from '../theme';

export default function Index() {
  const { state, tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  if (state.isLoading) return null;

  if (state.disclaimer === null) {
    return <DisclaimerPage />;
  } else {
    const welcomeConfig = {
      welcomeText: "Ready to reduce your risk of falls?\nLet's get started with\nthe courses below.",
      startPath: "/understanding-falls/introduction"
    };
    return <VerticalHalfPaginator data={DATA} welcomeConfig={welcomeConfig} />;
  }
}
