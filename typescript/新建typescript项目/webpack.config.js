const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const json = require('./package.json') // 这个路径视当前的路径进行对于修改

// the path(s) that should be cleaned
let pathsToClean = ['dist'];

// the clean options to use
let cleanOptions = {
    root: path.resolve(__dirname),
    // exclude: ['shared.js'],
    verbose: true,
    dry: false,
};

module.exports = {
    resolve: {
        extensions: ['.js', '.ts', '.json'],
    },
    devtool: 'source-map',// 打包出的js文件是否生成map文件（方便浏览器调试）
    mode: 'production',
    entry: {
        app: path.resolve(__dirname, 'src/index.ts'),
        // 将 第三方依赖 单独打包
        vendor: Object.keys(json.dependencies)
    },
    output: {
        filename: '[name].[chunkhash:8].js',// 生成的fiename需要与package.json中的main一致
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'tslint-loader',
                        options: {
                            configFile: path.resolve(__dirname, './tslint.json'),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            // 指定特定的ts编译配置，为了区分脚本的ts配置
                            configFile: path.resolve(__dirname, './tsconfig.json'),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].[chunkhash:8].js'
        })
    ],
};