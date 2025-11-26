export default {
    appName: 'Diabetes Education',
    placeholder: 'Search diabetes topics...',
    indexPath: '/searchIndex.json',
    boostFields: {
        title: 2,
        headings: 1.5,
        content: 1,
    },
};
