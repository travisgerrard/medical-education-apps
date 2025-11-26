export default {
    appName: 'BP Impact',
    placeholder: 'Search blood pressure topics...',
    indexPath: '/searchIndex.json',
    boostFields: {
        title: 2,
        headings: 1.5,
        content: 1,
    },
};
