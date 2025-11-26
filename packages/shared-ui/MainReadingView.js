import React, { useContext, useEffect } from 'react';
import { MDXProvider } from '@mdx-js/react';

import styled from 'styled-components';
import Link from 'next/link';
import AccessCodeScreen from './AccessCodeScreen';
import DisclaimerPage from './DisclaimerPage';
import { AuthContext } from '@medical-edu/shared-contexts';
import { TextContext } from '@medical-edu/shared-contexts';

const BodyContainer = styled.div`
  display: flex;
  background-color: white;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const NavBar = styled.div`
  position: relative;
  background-color: ${props => props.theme.colors.primary};
  width: 100%;
  height: 64px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NavBarText = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 24px;
  font-family: Helvetica Neue, Arial, sans-serif;
  font-weight: 400;
  padding: 0px;
  margin: 0px;
  padding-left: 16px;
  padding-right: 16px;
  line-height: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NavBarButton = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 24px;
  font-family: Helvetica Neue, Arial, sans-serif;
  font-weight: 400;
  padding: 0px;
  margin: 0px;
  padding-left: 16px;
  padding-right: 16px;
  line-height: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-out;
  opacity: ${(props) => (props.grayOutButton ? 0.2 : 1)};
  &:hover {
    opacity: ${(props) => (props.grayOutButton ? 0.2 : 0.6)};
  }
  &:active {
    opacity: ${(props) => (props.grayOutButton ? 0.2 : 0.3)};
  }
`;

const TextContainer = styled.div`
  max-width: 600px;
  padding: 25px;
  padding-left: max(25px, env(safe-area-inset-left));
  padding-right: max(25px, env(safe-area-inset-right));
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;

  @keyframes highlight-pulse {
    0%, 100% { background-color: #ffeb3b; }
    50% { background-color: #ffd54f; }
  }
`;

export const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  font-family: Helvetica Neue, Arial, sans-serif;
`;

export const RegularText = styled.p`
  font-size: ${(props) => props.textSize};
  font-weight: 400;
  font-family: Helvetica Neue, Arial, sans-serif;
`;

const RegularList = styled.li`
  font-size: ${(props) => props.textSize};
  font-weight: 400;
  font-family: Helvetica Neue, Arial, sans-serif;
`;

const QuoteBox = styled.div`
  background-color: lightgray;
  border-radius: 22px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  padding: 8px;
  font-size: 16px;
  font-weight: 400;
  font-family: Helvetica Neue, Arial, sans-serif;
  line-height: 1.2;
  margin-bottom: 16px;
  margin-top: 16px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin: 16px auto;
`;

export default function MainReadingView({ children }) {
  const { state, tryLocalSignin } = useContext(AuthContext);
  const {
    state: textState,
    changeTextSize,
    setTextSizeOnLoad,
  } = useContext(TextContext);

  useEffect(() => {
    tryLocalSignin();
    setTextSizeOnLoad();
  }, []);

  // Handle search highlighting from URL parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const highlight = params.get('highlight');

    if (highlight) {
      // Wait for content to render
      setTimeout(() => {
        highlightSearchTerm(highlight);
      }, 300);
    }
  }, []);

  const highlightSearchTerm = (searchTerm) => {
    const container = document.querySelector('.mdx-content');
    if (!container) return;

    const text = container.textContent || '';
    const lowerText = text.toLowerCase();
    const lowerSearch = searchTerm.toLowerCase();

    // Find first occurrence
    const index = lowerText.indexOf(lowerSearch);
    if (index === -1) return;

    // Use TreeWalker to find text nodes
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null
    );

    let charCount = 0;
    let targetNode = null;
    let targetOffset = 0;

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const nodeText = node.textContent || '';
      const nodeLength = nodeText.length;

      if (charCount + nodeLength > index) {
        targetNode = node;
        targetOffset = index - charCount;
        break;
      }

      charCount += nodeLength;
    }

    if (!targetNode) return;

    // Create highlight span
    const range = document.createRange();
    range.setStart(targetNode, targetOffset);
    range.setEnd(targetNode, targetOffset + searchTerm.length);

    const mark = document.createElement('mark');
    mark.style.backgroundColor = '#ffeb3b';
    mark.style.padding = '2px 4px';
    mark.style.borderRadius = '3px';
    mark.style.animation = 'highlight-pulse 2s ease-in-out';
    mark.className = 'search-highlight';

    try {
      range.surroundContents(mark);

      // Scroll to highlighted element
      setTimeout(() => {
        mark.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);

      // Remove highlight after 10 seconds
      setTimeout(() => {
        if (mark.parentNode) {
          const parent = mark.parentNode;
          while (mark.firstChild) {
            parent.insertBefore(mark.firstChild, mark);
          }
          parent.removeChild(mark);
          parent.normalize();
        }
      }, 10000);
    } catch (e) {
      console.warn('Could not highlight search term:', e);
    }
  };

  const { textSize } = textState;
  const increaseTextSizeGrayOut = textSize === '22px';
  const decreaseTextSizeGrayOut = textSize === '16px';

  const mdComponents = {
    h1: (props) => <Header {...props} />,
    p: (props) => <RegularText textSize={textSize} {...props} />,
    li: (props) => <RegularList textSize={textSize} {...props} />,
    blockquote: (props) => <QuoteBox textSize={textSize} {...props} />,
    img: (props) => <Image {...props} />,
  };

  if (state.isLoading) return null;

  // if (state.token === null) {
  //   return <AccessCodeScreen />;
  // } else {
  if (state.disclaimer === null) {
    return <DisclaimerPage />;
  } else {
    return (
      <>
        <NavBar>
          <NavBarText>
            Aa:{' '}
            <NavBarButton
              onClick={() => changeTextSize({ textSize, isIncrease: true })}
              grayOutButton={increaseTextSizeGrayOut}
            >
              +
            </NavBarButton>{' '}
            /{' '}
            <NavBarButton
              onClick={() => changeTextSize({ textSize, isIncrease: false })}
              grayOutButton={decreaseTextSizeGrayOut}
            >
              -
            </NavBarButton>
          </NavBarText>
          <Link href="/">
            <NavBarButton style={{ cursor: 'pointer' }}>Close</NavBarButton>
          </Link>
        </NavBar>
        <BodyContainer>
          <TextContainer className="mdx-content">
            <MDXProvider components={mdComponents}>{children}</MDXProvider>
          </TextContainer>
        </BodyContainer>
      </>
    );
  }
  // }
}
