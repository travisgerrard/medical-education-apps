const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  transpilePackages: ['@medical-edu/shared-contexts', '@medical-edu/shared-ui'],
};

module.exports = withMDX(nextConfig);
