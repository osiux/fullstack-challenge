module.exports = {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    bracketSpacing: true,
    arrowParens: 'always',
    overrides: [
        {
            files: '.editorconfig',
            options: { parser: 'yaml' },
        },
    ],
};
