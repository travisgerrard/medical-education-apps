import React from 'react';
import VerticalHalfPaginator from '@medical-edu/shared-ui/TopHalfMainScreen/VerticalHalfPaginator';
import { DATA } from '../SectionOutline';

export default function Home() {
  const welcomeConfig = {
    welcomeText: "Understanding anxiety and depression\nis the first step to feeling better.\nLet's start with the basics.",
    startPath: "/what-are-anxiety-depression/introduction"
  };
  return <VerticalHalfPaginator data={DATA} welcomeConfig={welcomeConfig} />;
}
