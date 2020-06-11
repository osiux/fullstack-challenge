module.exports = (api) => {
    // This caches the Babel config by environment.
    api.cache.using(() => process.env.NODE_ENV);

    return {
        presets: [
            [
                '@babel/env',
                {
                    useBuiltIns: 'usage',
                    corejs: 3,
                },
            ],
            [
                '@babel/preset-typescript',
                {
                    isTSX: true,
                    allExtensions: true,
                },
            ],
            '@babel/react',
        ],
        plugins: [
            'babel-plugin-macros',
            'emotion',
            '@babel/plugin-transform-react-jsx',
            '@babel/proposal-class-properties',
            '@babel/proposal-object-rest-spread',
            api.env('development') && 'react-refresh/babel',
        ].filter(Boolean),
    };
};
