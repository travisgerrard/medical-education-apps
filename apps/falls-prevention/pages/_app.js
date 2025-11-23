import React, { useEffect } from 'react';
import Head from 'next/head';
import './styles.css';
import { useRouter } from 'next/router';

import styled, { ThemeProvider } from 'styled-components';
import { NextSectionButton, MainReadingView } from '@medical-edu/shared-ui';

import {
  AuthProvider,
  ReadingProvider,
  NextToReadProvider,
  TextProvider,
  MenuScrollProvider,
  DarkProvider,
} from '@medical-edu/shared-contexts';

import { DATA } from '../SectionOutline';

import { theme } from '../theme';

const Index = ({ Component, pageProps, router }) => {
  const { route } = router;

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
                    <NextSectionButton route={route} lastSectionId="6" />
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
