import React from 'react';
import styled from 'styled-components';

const SearchButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.9);
  padding: 8px 12px;
  font-size: 14px;
  font-family: Helvetica Neue, Arial, sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.4);
  }

  &:active {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const SearchIcon = styled.span`
  font-size: 16px;
`;

const SearchText = styled.span`
  @media (max-width: 480px) {
    display: none;
  }
`;

const Shortcut = styled.span`
  font-size: 11px;
  opacity: 0.7;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
  
  @media (max-width: 640px) {
    display: none;
  }
`;

export default function HomeSearchBar({ onClick, placeholder }) {
  const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const shortcut = isMac ? '⌘K' : 'Ctrl+K';

  return (
    <SearchButton onClick={onClick}>
      <SearchIcon>🔍</SearchIcon>
      <SearchText>Search</SearchText>
      <Shortcut>{shortcut}</Shortcut>
    </SearchButton>
  );
}
