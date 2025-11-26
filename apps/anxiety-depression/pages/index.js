import React, { useContext, useEffect } from 'react';
import { DisclaimerPage } from '@medical-edu/shared-ui';
import { AuthContext } from '@medical-edu/shared-contexts';
import VerticalHalfPaginator from '@medical-edu/shared-ui/TopHalfMainScreen/VerticalHalfPaginator';
import { DATA } from '../SectionOutline';

export default function Home() {
  const { state, tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  if (state.isLoading) return null;

  if (state.disclaimer === null) {
    return <DisclaimerPage />;
  } else {
    const welcomeConfig = {
      welcomeText: "Understanding anxiety and depression\nis the first step to feeling better.\nLet's start with the basics.",
      startPath: "/what-are-anxiety-depression/introduction"
    };
    return <VerticalHalfPaginator data={DATA} welcomeConfig={welcomeConfig} />;
  }
}
