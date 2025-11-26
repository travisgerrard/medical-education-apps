import React from 'react';
import Index from './index.md';
import ResetButton from './ResetButton.js';

export default function About() {
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Index />
            <ResetButton />
        </div>
    );
}
