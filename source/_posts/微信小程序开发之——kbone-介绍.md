---
title: 微信小程序开发之——kbone-介绍
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: 470cc518
date: 2021-10-27 15:14:04
---
## 一 概述

* **kbone** 是一个致力于微信小程序和 Web 端同构的解决方案
* **kbone**实现了一个适配器，在适配器里模拟出了浏览器环境，让Web端的代码可以不做什么改动便运行在小程序里
* **kbone**可开发React、Vue、kbone-ui、Omi、Preact技术栈的小程序或Web

<!--more-->

## 二 kbone的优势

* 大部分流行的前端框架都能够在 kbone 上运行，比如 Vue、React、Preact 等。
* 支持更为完整的前端框架特性，因为 kbone 不会对框架底层进行删改（比如 Vue 中的 v-html 指令、Vue-router 插件）
* 提供了常用的 dom/bom 接口，让用户代码无需做太大改动便可从 Web 端迁移到小程序端。
* 在小程序端运行时，仍然可以使用小程序本身的特性（比如像 live-player 内置组件、分包功能）
* 提供了一些 Dom 扩展接口，让一些无法完美兼容到小程序端的接口也有替代使用方案（比如 getComputedStyle 接口）

## 三 kbone创建项目中可能遇到的问题

### 3.1 现象

执行如下创建kbone项目时，出现模板react不存在

```
kbone init my-app
```
![][1]

### 3.2 原因及解决办法

#### 原因

项目基于 webpack 构建，项目未配置webpack

#### 解决办法

见下文的`kbone创建项目`

## 四 kbone创建项目

### 4.1 安装依赖`kbone-cli`(环境已安装并配置npm)

```
npm install -g kbone-cli
```

### 4.2 [创建webpack构建文件][00]

新建一个 webpack.mp.config.js 文件，用于小程序端代码的构建

```
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const MpPlugin = require('mp-webpack-plugin') // 用于构建小程序代码的 webpack 插件

const isOptimize = true // 是否压缩业务代码，开发者工具可能无法完美支持业务代码使用到的 es 特性，建议自己做代码压缩

module.exports = {
    mode: 'production',
    entry: {
        // js 入口
        home: path.resolve(__dirname, '../src/home/main.mp.js'),
        list: path.resolve(__dirname, '../src/list/main.mp.js'),
        detail: path.resolve(__dirname, '../src/detail/main.mp.js'),
    },
    output: {
        path: path.resolve(__dirname, './miniprogram/common'), // 放到小程序代码目录中的 common 目录下
        filename: '[name].js', // 必需字段，不能修改
        library: 'createApp', // 必需字段，不能修改
        libraryExport: 'default', // 必需字段，不能修改
        libraryTarget: 'window', // 必需字段，不能修改
    },
    target: 'web', // 必需字段，不能修改
    optimization: {
        runtimeChunk: false, // 必需字段，不能修改
        splitChunks: { // 代码分割配置，不建议修改
            chunks: 'all',
            minSize: 1000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 100,
            maxInitialRequests: 100,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },

        minimizer: isOptimize ? [
            // 压缩CSS
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.(css|wxss)$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', {
                        discardComments: {
                            removeAll: true,
                        },
                        minifySelectors: false, // 因为 wxss 编译器不支持 .some>:first-child 这样格式的代码，所以暂时禁掉这个
                    }],
                },
                canPrint: false
            }),
            // 压缩 js
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                parallel: true,
            })
        ] : [],
    },
    module: {
        rules: [
            // loaders 配置。这里需要注意的是，部分在 wxss 不支持的样式需要剔除，比如 ie hack 代码，可以使用 postcss 的 stylehacks 插件剔除；对于资源文件来说，需要转成 base64 或者线上资源链接，下面是一个简单的示例：
            // {
            //     test: /\.(png|jpg|jpeg|gif|svg|eot|woff|woff2|ttf)$/,
            //     use: [{
            //         loader: 'url-loader',
            //         options: {
            //             limit: 1024,
            //             name: '[name]_[hash:hex:6].[ext]',
            //             publicPath: 'https://test.miniprogram.com/res', // 对于资源文件直接使用线上的 cdn 地址
            //             emitFile: false,
            //         }
            //     }],
            // },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.isMiniprogram': process.env.isMiniprogram, // 注入环境变量，用于业务代码判断
        }),
        new MiniCssExtractPlugin({
            filename: '[name].wxss',
        }),
        new VueLoaderPlugin(),
        new MpPlugin({
            // 插件配置，下面会详细介绍
        }),
    ],
}
```

### 4.3 创建项目(确保电脑上已有webpack.mp.config.js)

#### 在终端中，打开要创建项目的位置(webpack.mp.config.js要有，可能不在项目所在位置)

![][2]

#### 执行项目创建指令

```
kbone init my-app
```

#### 选择创建项目使用的技术栈(通过上下键选择)
![][3]

#### 指令执行完成后，出现如下指令，表示执行成功
![][4]

#### 项目创建成功后的目录结构

说明：此时，并没有Web和小程序的开发环境，需要执行后续的操作

![][5]

#### 进入my_app，并安装webpack.mp.config.js依赖

```
cd my-app
npm install
```
### 4.4 Web和小程序开发环境

#### 开发小程序

执行如下指令，生成小程序端代码

```
npm run mp
```

`npm run mp`执行完成后，`my-app\build`下生成`mp`小程序开发文件

![][6]

微信小程序开发工具导入mp文件夹
![][7]

项目结构与预览图
![][8]

#### 开发Web端

执行如下指令，查看项目运行在浏览器中的界面

```
npm run web
```

执行如下指令，构建Web端

```
npm run build
```

## 五 参考

* [wechat-miniprogram / kbone](https://wechat-miniprogram.github.io/kbone/docs/)
* [wechat-miniporgram/ kbone 项目搭建流程](https://wechat-miniprogram.github.io/kbone/docs/guide/tutorial.html#kbone-%E9%A1%B9%E7%9B%AE%E6%90%AD%E5%BB%BA%E6%B5%81%E7%A8%8B)
* [微信官方文档——多端统一开发工具——kbone](https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/extended/kbone/#kbone-ui)



[00]:https://wechat-miniprogram.github.io/kbone/docs/guide/tutorial.html#%E7%BC%96%E5%86%99-webpack-%E9%85%8D%E7%BD%AE
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-kbone-init-app-no-exist.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-kbone-webpack-project-terminal.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-kbone-project-create-language.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-kbone-project-create-success.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-kbone-project-create-file-struct.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-kbone-npm-run-mp.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-kbone-import-mp.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-kbone-project-import-preview.png