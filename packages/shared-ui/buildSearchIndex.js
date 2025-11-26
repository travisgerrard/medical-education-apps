const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuration - can be passed as args or from config file
const config = {
    pagesDir: process.argv[2] || './pages',
    outputPath: process.argv[3] || './public/searchIndex.json',
    excludePaths: ['_app.js', '_document.js', 'index.js', 'privacy', 'about'],
};

function getAllMdxFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Skip excluded directories
            if (!config.excludePaths.some(ex => filePath.includes(ex))) {
                getAllMdxFiles(filePath, fileList);
            }
        } else if (file.endsWith('.mdx') || file.endsWith('.md')) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

function extractContent(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // Remove MDX components and formatting
    let cleanContent = content
        .replace(/<[^>]*>/g, '') // Remove HTML/JSX tags
        .replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .replace(/`[^`]*`/g, '') // Remove inline code
        .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Replace links with just text
        .replace(/#+ /g, '') // Remove heading markers
        .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1') // Remove bold/italic
        .replace(/\n{3,}/g, '\n\n') // Normalize newlines
        .trim();

    return {
        frontmatter: data,
        content: cleanContent,
    };
}

function getPathInfo(filePath, pagesDir) {
    // Convert file path to URL path
    const relativePath = path.relative(pagesDir, filePath);
    const pathParts = relativePath.split(path.sep);

    // Remove 'index.mdx' or 'index.md'
    if (pathParts[pathParts.length - 1].startsWith('index.')) {
        pathParts.pop();
    }

    const urlPath = '/' + pathParts.join('/');

    return {
        urlPath,
        section: pathParts[0] || 'home',
        subsection: pathParts[1] || null,
    };
}

function extractHeadings(content) {
    const headingRegex = /^#{1,6}\s+(.+)$/gm;
    const headings = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        headings.push(match[1].trim());
    }

    return headings;
}

function buildSearchIndex() {
    console.log('🔍 Building search index...');
    console.log(`📂 Pages directory: ${config.pagesDir}`);
    console.log(`📝 Output path: ${config.outputPath}`);

    const mdxFiles = getAllMdxFiles(config.pagesDir);
    console.log(`📄 Found ${mdxFiles.length} MDX/MD files`);

    const pages = [];

    mdxFiles.forEach((filePath) => {
        try {
            const { frontmatter, content } = extractContent(filePath);
            const { urlPath, section, subsection } = getPathInfo(filePath, config.pagesDir);
            const headings = extractHeadings(fs.readFileSync(filePath, 'utf-8'));

            // Get the first heading as title, or use frontmatter title
            const title = headings[0] || frontmatter.title || subsection || 'Untitled';

            // Create a unique ID
            const id = urlPath.replace(/\//g, '-').replace(/^-/, '') || 'home';

            // Format section name nicely
            const sectionName = section
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            pages.push({
                id,
                title,
                section: sectionName,
                path: urlPath,
                content: content.substring(0, 5000), // Increased to 5000 for comprehensive search coverage
                headings: headings.slice(1, 6), // Store some headings (skip the title)
            });

            console.log(`  ✅ Indexed: ${title}`);
        } catch (error) {
            console.error(`  ❌ Error processing ${filePath}:`, error.message);
        }
    });

    // Write to output file
    const outputDir = path.dirname(config.outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const indexData = {
        pages,
        generatedAt: new Date().toISOString(),
        totalPages: pages.length,
    };

    fs.writeFileSync(config.outputPath, JSON.stringify(indexData, null, 2));
    console.log(`\n✨ Search index generated successfully!`);
    console.log(`📊 Total pages indexed: ${pages.length}`);
    console.log(`💾 Index saved to: ${config.outputPath}`);
}

// Run the script
try {
    buildSearchIndex();
} catch (error) {
    console.error('❌ Error building search index:', error);
    process.exit(1);
}
