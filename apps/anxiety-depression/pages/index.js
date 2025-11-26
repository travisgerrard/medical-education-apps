import React, { useContext, useEffect } from 'react';
import { VerticalHalfPaginator, DisclaimerPage } from '@medical-edu/shared-ui';
import { AuthContext } from '@medical-edu/shared-contexts';
import { DATA } from '../SectionOutline';
import VerticalHalfPaginator from '@medical-edu/shared-ui/TopHalfMainScreen/VerticalHalfPaginator';

export default function Home() {
  const welcomeConfig = {
    welcomeText: "Understanding anxiety and depression\nis the first step to feeling better.\nLet's start with the basics.",
    startPath: "/what-are-anxiety-depression/introduction"
  };
  return <VerticalHalfPaginator data={DATA} welcomeConfig={welcomeConfig} />;
}
