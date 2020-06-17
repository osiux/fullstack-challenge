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
            '@emotion/babel-preset-css-prop',
        ],
        plugins: [
            'babel-plugin-macros',
            'emotion',
            [
                '@emotion/babel-plugin-jsx-pragmatic',
                {
                    export: 'jsx',
                    import: '__cssprop',
                    module: '@emotion/core',
                },
            ],
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-transform-react-jsx', { pragma: '__cssprop' }],
            '@babel/proposal-class-properties',
            '@babel/proposal-object-rest-spread',
            api.env('development') && 'react-refresh/babel',
        ].filter(Boolean),
    };
};
