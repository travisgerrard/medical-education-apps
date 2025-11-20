import React, { useEffect } from 'react';
import { MDXProvider } from '@mdx-js/react';
import './styles.css';
import { useRouter } from 'next/router';

import styled, { ThemeProvider } from 'styled-components';
import { NextSectionButton, MainReadingView } from '@medical-edu/shared-ui';

import {
  AuthProvider,
  TextProvider,
  MenuScrollProvider,
  ReadingProvider,
  NextToReadProvider,
} from '@medical-edu/shared-contexts';
import { DATA } from '../SectionOutline';

import * as ga from '../lib/ga';
import { theme } from '../theme';

const Index = ({ Component, pageProps, router }) => {
  const { route } = router;

  const routerForUseEffect = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      // ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    routerForUseEffect.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      routerForUseEffect.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [routerForUseEffect.events]);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ReadingProvider initialState={{ readingArray: DATA, errorMessage: '' }}>
          <NextToReadProvider>
            <TextProvider>
              <MenuScrollProvider>
                {route === '/' ? (
                  <Component {...pageProps} />
                ) : (
                  <MainReadingView>
                    <Component {...pageProps} />
                    <NextSectionButton route={route} />
                  </MainReadingView>
                )}
              </MenuScrollProvider>
            </TextProvider>
          </NextToReadProvider>
        </ReadingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Index;
