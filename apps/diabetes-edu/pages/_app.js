import React, { useEffect } from 'react';
import { MDXProvider } from '@mdx-js/react';
import './styles.css';
import { useRouter } from 'next/router';

import styled from 'styled-components';
import NextSectionButton from '../src/Components/ReadingScreen/NextSectionButton';
import MainReadingView from '../src/Components/ReadingScreen/MainReadingView';

import { Provider as ReadingContextProvider } from '../src/Components/context/ReadingContext';
import { Provider as NextToReadContextProvider } from '../src/Components/context/NextToReadContext';
import { Provider as AuthContextProvider } from '../src/Components/context/AuthContext';
import { Provider as TextContextProvider } from '../src/Components/context/TextContext';
import { Provider as MenuScrollContextProvider } from '../src/Components/context/MenuScrollContext';

import * as ga from '../lib/ga';

const Index = ({ Component, pageProps, router }) => {
  const { route } = router;

  const routerForUseEffect = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
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
    <AuthContextProvider>
      <ReadingContextProvider>
        <NextToReadContextProvider>
          <TextContextProvider>
            <MenuScrollContextProvider>
              {route === '/' ? (
                <Component {...pageProps} />
              ) : (
                <MainReadingView>
                  <Component {...pageProps} />
                  <NextSectionButton route={route} />
                </MainReadingView>
              )}
            </MenuScrollContextProvider>
          </TextContextProvider>
        </NextToReadContextProvider>
      </ReadingContextProvider>
    </AuthContextProvider>
  );
};

export default Index;
