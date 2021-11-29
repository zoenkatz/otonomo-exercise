module.exports = {
    stories: ['../src/stories/index.jsx'],
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-knobs/',
        '@storybook/addon-links',
        '@storybook/preset-scss',
    ],

    typescript: { reactDocgen: false },

    core: {
        builder: 'webpack5',
    },


};
