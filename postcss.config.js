/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('cssnano')({
            preset: 'default',
        }),
    ],
};
