const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
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
      test: /\.(png|jpe?g|gif|svg)$/i,
      type: 'asset/resource',
    });
    return config;
  },
});
