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

  console.log(state.disclaimer);
  if (state.isLoading) return null;

  // if (state.token === null) {
  //   return <AccessCodeScreen />;
  // } else {
  if (state.disclaimer === null) {
    return <DisclaimerPage />;
  } else {
    return <VerticalHalfPaginator data={DATA} />;
  }
  // }
}
