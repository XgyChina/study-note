## 1、npm init

按照步骤创建一个package项目



## 2、安装依赖

```json
{
   "devDependencies": {
    "@types/node": "^14.14.17",
    "clean-webpack-plugin": "^3.0.0",
    "jest": "^26.6.3",
    "ts-loader": "^8.0.12",
    "tslint": "^5.20.0",
    "typescript": "^4.1.3",
    "webpack": "^5.11.1"
  }
}
```



## 3、配置webpack.config.js和tsconfig.json

+ webpack.config.js

```javascript
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
```



+ tsconfig.json

```json
{
    "compileOnSave": false,
    "compilerOptions": {
        "outDir": "./dist/", // 打包到的目录
        "sourceMap": true, // 是否生成sourceMap（用于浏览器调试）
        "noEmit": false,
        "importHelpers": true,
        "pretty": true,
        "strict": true,
        "noImplicitAny": false,
        "noUnusedLocals": true,
        "noImplicitReturns": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true,
        "esModuleInterop": true,
        "experimentalDecorators": true, /* Enables experimental support for ES7 decorators. */
        "emitDecoratorMetadata": true,
        "declaration": true, // 是否生成声明文件
        "declarationDir": "./dist/types/", // 声明文件打包的位置
        "declarationMap": true, // 是否生成声明文件map文件（便于调试）
        "moduleResolution": "node",
        "module": "commonjs",
        "target": "es2017", // 转化成的目标语言
        "baseUrl": "./",
        "types": [
            "node",
            "jest"
        ],
        "typeRoots": [
            "./node_modules/@types",
            "src/typings"
        ],
        "lib": [
            "es2017",
            "dom"
        ],
        "jsx": "react",
        "allowJs": false
    },
    "include": [
        "src/**/*.ts"
    ], // 要打包的文件
    "exclude": [
        "node_modules",
        "*.test.ts"
    ]
}
```



## 4、运行npm  run build 打包

