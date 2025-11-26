export default {
    appName: 'Falls Prevention',
    placeholder: 'Search falls prevention topics...',
    indexPath: '/searchIndex.json',
    boostFields: {
        title: 2,
        headings: 1.5,
        content: 1,
    },
};
