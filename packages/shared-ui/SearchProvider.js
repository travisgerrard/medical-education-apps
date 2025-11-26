import React, { createContext, useState, useEffect, useContext } from 'react';
import FlexSearch from 'flexsearch';

const SearchContext = createContext();

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within SearchProvider');
    }
    return context;
};

export function SearchProvider({ children, config = {} }) {
    const [searchIndex, setSearchIndex] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isIndexing, setIsIndexing] = useState(true);

    useEffect(() => {
        initializeSearch();
    }, []);

    // Listen for Cmd+K / Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const initializeSearch = async () => {
        try {
            setIsIndexing(true);

            // Create FlexSearch index
            const index = new FlexSearch.Index({
                tokenize: 'strict',
                cache: true,
            });

            // Load search data
            const indexPath = config.indexPath || '/searchIndex.json';
            const response = await fetch(indexPath);

            if (!response.ok) {
                console.warn('Search index not found. Search will be disabled.');
                setIsIndexing(false);
                return;
            }

            const data = await response.json();

            // Build index
            data.pages.forEach((page) => {
                const searchableContent = [
                    page.title,
                    page.section,
                    ...(page.headings || []),
                    page.content,
                ].join(' ');

                index.add(page.id, searchableContent);
            });

            const searchUtil = {
                search: (query, options = {}) => {
                    const limit = options.limit || 50;
                    const resultIds = index.search(query, { limit });

                    return resultIds.map(id => {
                        const page = data.pages.find(p => p.id === id);
                        if (!page) return null;

                        // Generate snippet with highlighting
                        const snippet = generateSnippet(page.content, query);

                        return {
                            id: page.id,
                            title: page.title,
                            section: page.section,
                            path: page.path,
                            snippet,
                        };
                    }).filter(Boolean);
                },
            };

            setSearchIndex(searchUtil);
            setIsIndexing(false);
        } catch (error) {
            console.error(' Error initializing search:', error);
            setIsIndexing(false);
        }
    };

    const generateSnippet = (content, query) => {
        if (!content || !query) return '';

        const lowerContent = content.toLowerCase();
        const lowerQuery = query.toLowerCase().trim();

        // Try to find the exact query phrase first
        let startIndex = lowerContent.indexOf(lowerQuery);

        // If exact phrase not found, try individual words
        if (startIndex === -1) {
            const queryWords = lowerQuery.split(/\s+/).filter(Boolean);
            for (const word of queryWords) {
                const index = lowerContent.indexOf(word);
                if (index !== -1) {
                    startIndex = index;
                    break;
                }
            }
        }

        if (startIndex === -1) {
            return content.substring(0, 150) + '...';
        }

        // Get context around match - increase context window
        const snippetStart = Math.max(0, startIndex - 60);
        const snippetEnd = Math.min(content.length, startIndex + 200);
        let snippet = content.substring(snippetStart, snippetEnd);

        // Add ellipsis
        if (snippetStart > 0) snippet = '...' + snippet;
        if (snippetEnd < content.length) snippet = snippet + '...';

        // Highlight the exact query phrase and individual words
        const queryWords = lowerQuery.split(/\s+/).filter(Boolean);

        // Try exact phrase first
        const phraseRegex = new RegExp(`(${lowerQuery.replace(/\s+/g, '\\s+')})`, 'gi');
        snippet = snippet.replace(phraseRegex, '<mark>$1</mark>');

        // Then highlight individual words
        queryWords.forEach(word => {
            const regex = new RegExp(`\\b(${word})\\b`, 'gi');
            snippet = snippet.replace(regex, '<mark>$1</mark>');
        });

        return snippet;
    };

    const openSearch = () => setIsSearchOpen(true);
    const closeSearch = () => setIsSearchOpen(false);

    return (
        <SearchContext.Provider
            value={{
                searchIndex,
                isSearchOpen,
                openSearch,
                closeSearch,
                isIndexing,
                config,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}
