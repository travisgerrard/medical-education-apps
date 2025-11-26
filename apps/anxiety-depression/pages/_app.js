import React, { useEffect } from 'react';
import Head from 'next/head';
import './styles.css';
import { useRouter } from 'next/router';

import styled, { ThemeProvider } from 'styled-components';
import { NextSectionButton, MainReadingView, SearchProvider, SearchModal, useSearch } from '@medical-edu/shared-ui';

import {
  AuthProvider,
  ReadingProvider,
  NextToReadProvider,
  TextProvider,
  MenuScrollProvider,
  DarkProvider,
} from '@medical-edu/shared-contexts';

import { DATA } from '../SectionOutline';
import searchConfig from '../search.config';

import { theme } from '../theme';

const AppContent = ({ route, Component, pageProps }) => {
  const { isSearchOpen, closeSearch, searchIndex, config } = useSearch();

  return (
    <>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={closeSearch}
        searchIndex={searchIndex}
        placeholder={config?.placeholder}
      />
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
                      <NextSectionButton route={route} lastSectionId="9" />
                    </MainReadingView>
                  )}
                </MenuScrollProvider>
              </TextProvider>
            </NextToReadProvider>
          </ReadingProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

const Index = ({ Component, pageProps, router }) => {
  const { route } = router;

  return (
    <SearchProvider config={searchConfig}>
      <AppContent route={route} Component={Component} pageProps={pageProps} />
    </SearchProvider>
  );
};

export default Index;
