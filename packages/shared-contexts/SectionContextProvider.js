import React, { createContext, useContext, useMemo, useEffect, useState } from 'react';

const SectionContext = createContext({
    currentSection: null,
    currentSubsection: null,
    currentIndex: 0,
    totalSubsections: 0,
    progressPercent: 0,
});

export function SectionContextProvider({ data, children }) {
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        // Set initial pathname
        setPathname(window.location.pathname);

        // Listen for route changes (Next.js uses popstate for back/forward)
        const handleRouteChange = () => {
            setPathname(window.location.pathname);
        };

        window.addEventListener('popstate', handleRouteChange);

        // Also listen for pushState/replaceState via custom event
        const originalPushState = window.history.pushState;
        const originalReplaceState = window.history.replaceState;

        window.history.pushState = function (...args) {
            originalPushState.apply(this, args);
            setPathname(window.location.pathname);
        };

        window.history.replaceState = function (...args) {
            originalReplaceState.apply(this, args);
            setPathname(window.location.pathname);
        };

        return () => {
            window.removeEventListener('popstate', handleRouteChange);
            window.history.pushState = originalPushState;
            window.history.replaceState = originalReplaceState;
        };
    }, []);

    const contextValue = useMemo(() => {
        if (!pathname || !data || data.length === 0) {
            return {
                currentSection: null,
                currentSubsection: null,
                currentIndex: 0,
                totalSubsections: 0,
                progressPercent: 0,
            };
        }

        // Parse pathname: /section-slug/subsection-slug
        const pathParts = pathname.split('/').filter(Boolean);

        if (pathParts.length < 2) {
            // Not in a subsection view
            return {
                currentSection: null,
                currentSubsection: null,
                currentIndex: 0,
                totalSubsections: 0,
                progressPercent: 0,
            };
        }

        const sectionSlug = pathParts[0];
        const subsectionSlug = pathParts[1];

        // Find the section
        const section = data.find(s => s.slug === sectionSlug);
        if (!section) {
            return {
                currentSection: null,
                currentSubsection: null,
                currentIndex: 0,
                totalSubsections: 0,
                progressPercent: 0,
            };
        }

        // Find the subsection index
        const subsectionIndex = section.sections.findIndex(
            sub => sub.slug === subsectionSlug
        );

        if (subsectionIndex === -1) {
            return {
                currentSection: { title: section.title, slug: section.slug },
                currentSubsection: null,
                currentIndex: 0,
                totalSubsections: section.sections.length,
                progressPercent: 0,
            };
        }

        const currentIndex = subsectionIndex + 1; // 1-based
        const totalSubsections = section.sections.length;
        const progressPercent = Math.round((currentIndex / totalSubsections) * 100);

        return {
            currentSection: { title: section.title, slug: section.slug },
            currentSubsection: section.sections[subsectionIndex],
            currentIndex,
            totalSubsections,
            progressPercent,
        };
    }, [pathname, data]);

    return (
        <SectionContext.Provider value={contextValue}>
            {children}
        </SectionContext.Provider>
    );
}

export function useSectionContext() {
    return useContext(SectionContext);
}

export default SectionContext;
