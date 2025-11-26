import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.9);
  padding: 6px 12px;
  font-size: 14px;
  font-family: Helvetica Neue, Arial, sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.4);
  }

  &:active {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Icon = styled.span`
  font-size: 16px;
`;

const Shortcut = styled.span`
  opacity: 0.7;
  font-size: 12px;
  margin-left: 4px;
`;

export default function SearchButton({ onClick }) {
    const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const shortcut = isMac ? '⌘K' : 'Ctrl+K';

    return (
        <Button onClick={onClick}>
            <Icon>🔍</Icon>
            Search
            <Shortcut>{shortcut}</Shortcut>
        </Button>
    );
}
