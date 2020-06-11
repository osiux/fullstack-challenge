/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/server/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
    },
    mode: 'production',
    target: 'node',
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
        alias: {
            '@client': path.resolve(__dirname, 'src/client'),
            '@server': path.resolve(__dirname, 'src/server'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
    ],
};

