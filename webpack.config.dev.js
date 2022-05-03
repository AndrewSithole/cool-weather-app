import webpack from 'webpack';
import path from 'path';

export default {
    devtool: 'eval-source-map',
    entry: [path.resolve(__dirname, 'src/index')],
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'src'),
        publicPath: '/public/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    mode: 'development',
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: false,
            noInfo: true
        })
    ],
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
            { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
            { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']}
        ]
    }
};
