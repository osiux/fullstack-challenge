module.exports = {
    root: true,
    settings: {
        react: {
            version: 'detect',
        },
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'emotion'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    env: {
        browser: true,
        node: true,
    },
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
};
