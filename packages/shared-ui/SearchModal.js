import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  padding-top: 10vh;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideDown 0.2s ease-out;

  @keyframes slideDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const SearchInputContainer = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SearchIcon = styled.span`
  font-size: 20px;
  color: #666;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 18px;
  font-family: Helvetica Neue, Arial, sans-serif;
  color: #333;

  &::placeholder {
    color: #999;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 4px 8px;
  line-height: 1;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
`;

const ResultsContainer = styled.div`
  overflow-y: auto;
  padding: 8px 0;
  flex: 1;
`;

const ResultItem = styled.div`
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.15s;
  background-color: ${props => props.selected ? '#f5f5f5' : 'transparent'};

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ResultTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
  font-family: Helvetica Neue, Arial, sans-serif;
`;

const ResultSection = styled.div`
  font-size: 13px;
  color: #666;
  margin-bottom: 4px;
  font-family: Helvetica Neue, Arial, sans-serif;
`;

const ResultSnippet = styled.div`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  font-family: Helvetica Neue, Arial, sans-serif;
  
  mark {
    background-color: #fff59d;
    padding: 0 2px;
    border-radius: 2px;
  }
`;

const EmptyState = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: #999;
  font-family: Helvetica Neue, Arial, sans-serif;
`;

const SectionDivider = styled.div`
  padding: 8px 20px;
  font-size: 12px;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: #fafafa;
  font-family: Helvetica Neue, Arial, sans-serif;
`;

export default function SearchModal({ isOpen, onClose, searchIndex, placeholder }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const router = useRouter();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Perform search
  useEffect(() => {
    if (!query.trim() || !searchIndex) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const searchResults = searchIndex.search(query, { limit: 50 });
    setResults(searchResults);
    setSelectedIndex(0);
  }, [query, searchIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'Arrow Up') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        handleResultClick(results[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, query]);

  const handleResultClick = (result) => {
    // Include search query in URL for scroll-to-match
    const url = `${result.path}?highlight=${encodeURIComponent(query)}`;
    router.push(url);
    onClose();
    setQuery('');
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Group results by section
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.section]) {
      acc[result.section] = [];
    }
    acc[result.section].push(result);
    return acc;
  }, {});

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <SearchInputContainer>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            ref={inputRef}
            type="text"
            placeholder={placeholder || 'Search...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <CloseButton onClick={onClose}>✕</CloseButton>
        </SearchInputContainer>

        <ResultsContainer>
          {!query.trim() && (
            <EmptyState>
              Type to search across all lessons...
              <br />
              <br />
              <small style={{ color: '#bbb' }}>
                Tip: Press Esc to close, ↑↓ to navigate, Enter to go to page
              </small>
            </EmptyState>
          )}

          {query.trim() && results.length === 0 && (
            <EmptyState>No results found for "{query}"</EmptyState>
          )}

          {Object.entries(groupedResults).map(([section, sectionResults]) => (
            <div key={section}>
              <SectionDivider>{section}</SectionDivider>
              {sectionResults.map((result, index) => {
                const globalIndex = results.indexOf(result);
                return (
                  <ResultItem
                    key={result.id}
                    selected={globalIndex === selectedIndex}
                    onClick={() => handleResultClick(result)}
                  >
                    <ResultTitle>{result.title}</ResultTitle>
                    {result.snippet && (
                      <ResultSnippet
                        dangerouslySetInnerHTML={{ __html: result.snippet }}
                      />
                    )}
                  </ResultItem>
                );
              })}
            </div>
          ))}
        </ResultsContainer>
      </Modal>
    </Overlay>
  );
}
