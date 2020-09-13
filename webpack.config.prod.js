import webpack from 'webpack';
import path from 'path';

export default {
    devtool: 'source-map',
    entry: [path.resolve(__dirname, 'src/index')],
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist1'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    mode: 'development',
    plugins: [],
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
            { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
            { test: /\.jpg$/, loaders: ['file-loader'] },
            { test: /\.svg$/, loaders: ['file-loader'] }
        ]
    },
    optimization: {
        minimize: false
    }
};
