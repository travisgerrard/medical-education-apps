export default {
    appName: 'Anxiety & Depression',
    placeholder: 'Search anxiety and depression topics...',
    indexPath: '/searchIndex.json',
    boostFields: {
        title: 2,
        headings: 1.5,
        content: 1,
    },
};
