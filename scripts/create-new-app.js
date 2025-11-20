#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for better output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function promptUser(question) {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        readline.question(question, answer => {
            readline.close();
            resolve(answer.trim());
        });
    });
}

async function createNewApp() {
    log('\n🏥 Medical Education App Generator\n', 'bright');

    // Get app details
    const appName = await promptUser('App name (e.g., gerd-edu): ');
    const appDisplayName = await promptUser('Display name (e.g., GERD Education): ');
    const primaryColor = await promptUser('Primary color (RGB format, e.g., rgb(220, 38, 38)): ');
    const linkColor = await promptUser('Link color (RGB format, e.g., rgb(1, 121, 213)): ');
    const disclaimerText = await promptUser('Disclaimer text (or press Enter for default): ') ||
        `The ${appDisplayName} provides useful information but is not a substitute for professional medical advice, diagnosis, or treatment. If you have a medical emergency, call your healthcare provider or dial 911. Before acting on any of the information in the ${appDisplayName}, please consult with your healthcare provider.`;

    // Validate app name
    if (!appName || !/^[a-z0-9-]+$/.test(appName)) {
        log('❌ Invalid app name. Use lowercase letters, numbers, and hyphens only.', 'red');
        process.exit(1);
    }

    const appDir = path.join(__dirname, '..', 'apps', appName);

    // Check if app already exists
    if (fs.existsSync(appDir)) {
        log(`❌ App "${appName}" already exists at ${appDir}`, 'red');
        process.exit(1);
    }

    log('\n📁 Creating app directory structure...', 'blue');

    // Create app directory
    fs.mkdirSync(appDir, { recursive: true });

    // Create subdirectories
    const dirs = [
        'pages',
        'pages/about',
        'public',
        'public/images',
        'src'
    ];

    dirs.forEach(dir => {
        fs.mkdirSync(path.join(appDir, dir), { recursive: true });
    });

    // Create package.json
    log('📦 Creating package.json...', 'blue');
    const packageJson = {
        name: appName,
        version: '1.0.0',
        private: true,
        scripts: {
            dev: 'next dev',
            build: 'next build',
            start: 'next start'
        },
        dependencies: {
            '@medical-edu/shared-contexts': '*',
            '@medical-edu/shared-ui': '*',
            '@mdx-js/loader': '^3.1.0',
            '@mdx-js/mdx': '^3.1.0',
            '@mdx-js/react': '^3.1.0',
            '@next/mdx': '^15.1.4',
            next: '^15.5.6',
            react: '^18.3.1',
            'react-dom': '^18.3.1',
            'react-icons': '^5.4.0',
            'styled-components': '^6.1.14'
        },
        devDependencies: {
            '@babel/core': '^7.26.0',
            '@babel/preset-react': '^7.26.3',
            'babel-plugin-styled-components': '^2.1.4'
        }
    };

    fs.writeFileSync(
        path.join(appDir, 'package.json'),
        JSON.stringify(packageJson, null, 2)
    );

    // Create theme.js
    log('🎨 Creating theme.js...', 'blue');
    const themeContent = `import {
  IoArrowForward,
  IoCheckmarkCircleOutline,
  IoCaretForward,
} from 'react-icons/io5';

export const theme = {
  colors: {
    primary: '${primaryColor}',
    link: '${linkColor}',
  },
  icons: {
    arrow: IoArrowForward,
    checkmark: IoCheckmarkCircleOutline,
    nextSection: IoCaretForward,
  },
  text: {
    appName: '${appDisplayName}',
    disclaimerText: '${disclaimerText}',
  },
};
`;

    fs.writeFileSync(path.join(appDir, 'theme.js'), themeContent);

    // Create SectionOutline.js template
    log('📝 Creating SectionOutline.js template...', 'blue');
    const sectionOutlineContent = `// Define your app's content structure here
// Add sections and subsections based on your educational content

export const DATA = [
  {
    id: '1',
    slug: 'introduction',
    title: 'Introduction',
    subtitle: 'Getting Started',
    sections: [
      {
        id: '1',
        slug: 'welcome',
        title: 'Welcome',
        hasRead: false,
      },
    ],
  },
  // Add more sections here...
];

export const LAST_SECTION_ID = '1'; // Update this to match your last section
`;

    fs.writeFileSync(path.join(appDir, 'SectionOutline.js'), sectionOutlineContent);

    // Create next.config.js
    log('⚙️  Creating next.config.js...', 'blue');
    const nextConfigContent = `const withMDX = require('@next/mdx')({
  extension: /\\.mdx?$/,
  options: {},
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ['@medical-edu/shared-contexts', '@medical-edu/shared-ui'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\\.(png|jpe?g|gif|svg)$/i,
      type: 'asset/resource',
    });
    return config;
  },
});
`;

    fs.writeFileSync(path.join(appDir, 'next.config.js'), nextConfigContent);

    // Create .babelrc
    log('🔧 Creating .babelrc...', 'blue');
    const babelrcContent = {
        presets: ['next/babel'],
        plugins: [['styled-components', { ssr: true }]]
    };

    fs.writeFileSync(
        path.join(appDir, '.babelrc'),
        JSON.stringify(babelrcContent, null, 2)
    );

    // Create pages/_app.js
    log('📄 Creating pages/_app.js...', 'blue');
    const appJsContent = `import React, { useEffect } from 'react';
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

import * as ga from '../lib/ga';
import { theme } from '../theme';

const Index = ({ Component, pageProps, router }) => {
  const { route } = router;

  const routerForUseEffect = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    routerForUseEffect.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      routerForUseEffect.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [routerForUseEffect.events]);

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
                    <NextSectionButton route={route} />
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
`;

    fs.writeFileSync(path.join(appDir, 'pages', '_app.js'), appJsContent);

    // Create pages/_document.js
    log('📄 Creating pages/_document.js...', 'blue');
    const documentJsContent = `import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
`;

    fs.writeFileSync(path.join(appDir, 'pages', '_document.js'), documentJsContent);

    // Create pages/index.js
    log('📄 Creating pages/index.js...', 'blue');
    const indexJsContent = `import React, { useContext } from 'react';
import { VerticalHalfPaginator, DisclaimerPage } from '@medical-edu/shared-ui';
import { AuthContext } from '@medical-edu/shared-contexts';
import { DATA } from '../SectionOutline';
import { theme } from '../theme';

export default function Index() {
  const { state } = useContext(AuthContext);

  // If disclaimer not accepted, show disclaimer page
  if (state.disclaimer === null) {
    return <DisclaimerPage />;
  } else {
    return <VerticalHalfPaginator data={DATA} />;
  }
}
`;

    fs.writeFileSync(path.join(appDir, 'pages', 'index.js'), indexJsContent);

    // Create pages/styles.css
    log('🎨 Creating pages/styles.css...', 'blue');
    const stylesContent = `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
`;

    fs.writeFileSync(path.join(appDir, 'pages', 'styles.css'), stylesContent);

    // Create lib/ga.js for Google Analytics
    fs.mkdirSync(path.join(appDir, 'lib'), { recursive: true });
    const gaContent = `export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    });
  }
};

export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
`;

    fs.writeFileSync(path.join(appDir, 'lib', 'ga.js'), gaContent);

    // Create sample about page
    log('📄 Creating sample about page...', 'blue');
    const aboutContent = `# About ${appDisplayName}

This is the about page for your new educational application.

Add your content here using MDX format.

## Getting Started

1. Edit \`SectionOutline.js\` to define your content structure
2. Create MDX files in the \`pages\` directory for each section
3. Customize your theme in \`theme.js\`
`;

    fs.writeFileSync(path.join(appDir, 'pages', 'about', 'index.mdx'), aboutContent);

    // Update root package.json workspace scripts
    log('📝 Updating root package.json...', 'blue');
    const rootPackageJsonPath = path.join(__dirname, '..', 'package.json');
    const rootPackageJson = JSON.parse(fs.readFileSync(rootPackageJsonPath, 'utf8'));

    if (!rootPackageJson.scripts) {
        rootPackageJson.scripts = {};
    }

    rootPackageJson.scripts[`dev:${appName}`] = `npm run dev --workspace=${appName}`;
    rootPackageJson.scripts[`build:${appName}`] = `npm run build --workspace=${appName}`;

    fs.writeFileSync(rootPackageJsonPath, JSON.stringify(rootPackageJson, null, 2));

    // Install dependencies
    log('\n📦 Installing dependencies...', 'blue');
    log('This may take a few minutes...', 'yellow');

    try {
        execSync('npm install', {
            cwd: path.join(__dirname, '..'),
            stdio: 'inherit'
        });
    } catch (error) {
        log('⚠️  Warning: npm install encountered issues. You may need to run it manually.', 'yellow');
    }

    // Success message
    log('\n✅ App created successfully!', 'green');
    log(`\n📁 Location: ${appDir}`, 'blue');
    log(`\n🚀 Next steps:`, 'bright');
    log(`   1. cd apps/${appName}`, 'yellow');
    log(`   2. Edit SectionOutline.js to define your content structure`, 'yellow');
    log(`   3. Create MDX content files in the pages directory`, 'yellow');
    log(`   4. Run: npm run dev:${appName}`, 'yellow');
    log(`\n📚 Documentation: See README.md for more details\n`, 'blue');
}

// Run the script
createNewApp().catch(error => {
    log(`\n❌ Error: ${error.message}`, 'red');
    process.exit(1);
});
