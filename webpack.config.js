const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: './public/favicon.ico',
            filename: 'index.html',
            manifest: './public/manifest.json',
            template: './public/index.html',
        }),
    ],
    devServer: {
        compress: true,
        port: 3000,
        proxy: [
            {
                context: '/api',
                target: 'http://localhost:3001',
            },
        ],
        static: {
            directory: path.join(__dirname, 'public'),
        },
    },
};
