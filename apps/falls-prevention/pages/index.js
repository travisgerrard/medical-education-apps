import React, { useContext } from 'react';
import { VerticalHalfPaginator, DisclaimerPage } from '@medical-edu/shared-ui';
import { AuthContext } from '@medical-edu/shared-contexts';
import { DATA } from '../SectionOutline';
import { theme } from '../theme';

export default function Index() {
  const { state } = useContext(AuthContext);

  if (state.disclaimer === null) {
    return <DisclaimerPage />;
  } else {
    return <VerticalHalfPaginator data={DATA} />;
  }
}
