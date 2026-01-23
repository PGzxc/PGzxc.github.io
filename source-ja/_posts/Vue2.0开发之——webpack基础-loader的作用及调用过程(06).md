---
title: Vue2.0开发之——webpack基础-loader的作用及调用过程(06)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 44cec30e
date: 2022-10-27 09:22:14
---
## 一 概述

* webpack如何处理css文件
* loader概述
* loader的安装与配置
* loader的调用过程说明

<!--more-->

## 二 webpack如何处理css文件

之前介绍了通过js处理li列表奇数行和偶数行颜色显示。如果是通过css样式文件将圆点去除。webpack能否处理呢。

1-在src目录下，添加css文件夹，创建index.css样式文件，并添加css样式

![][1]

2-在index.js中导入index.css样式

```
import './css/index.css'
```

3-执行`npm run dev`查看效果

```
Module parse failed: Unexpected token (1:2)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file
```

![][2]

说明：此问题后面会通过css-loader来解决

## 三 loader概述

### 3.1 loader概述

在实际开发过程中，webpack默认只能打包处理以`.js`后缀结尾的模块。其他非.js后缀结尾的模块，webpack默认处理不了，需要调用loader加载器才可以正常打包，否则会报错。

loader加载器的作用：协助webpack打包处理特定的文件模块。比如：

* css-loader可以打包处理.css相关的文件
* less-loader可以打包处理.less相关的文件
* babel-loader可以打包处理webpack无法处理的高级JS语法

### 3.2 loader的调用过程图示
![][3]

## 四 loader的安装与配置

### 4.1 loader的安装

```
npm install style-loader css-loader -D(--save-dev)
```

安装完成后，查看package.json中css-loader和style-loader

```
"devDependencies": {
    "css-loader": "^6.7.1",
    "style-loader": "^3.3.1",
 },
```

### 4.2 loader的配置

在webpack.config.js的module->rules数组中，添加loader规则如下：

```
module: { //所有第三方文件模块的匹配规则
        rules: [ //文件后缀名的匹配规则
            {
                test: /\.css$/,use: ['style-loader','css-loader']
            }
        ]
 }
```

其中，test表示匹配的文件类型，use表示对应要调用的loader

注意：

* use数组中指定的loader顺序是固定的
* 多个loader的调用顺序是：从后往前调用

### 4.3 loader使用前后对比

| loader使用前 | loader使用后 |
| :----------: | :----------: |
|    ![][4]    |    ![][5]    |

## 五 loader的调用过程说明

* webpack默认只能打包处理.js结尾的问价，处理不了其他后缀的文件
* 由于代码中包含了index.css这个文件，因此webpack默认处理不了
* 当webpack发现某个文件处理不了的时候，会查找webpack.config.js这个配置文件，看module.rules数组中，是否配置了对应的loader加载器。
* webpack把index.css这个文件，先转交给最后一个loader进行处理(先转交给css-loader)
* 当css-loader处理完毕之后，会把处理的结果，转交给下一个loader(转交给style-loader)
* 当style-loader处理完毕之后，发现没有下一个loader了，于是就把处理的结果，转交给webpack
* webpack把style-loader处理的结果，合并到/dist/bundle.js中，最终生成打包后的文件

## 六 参考

[webpack-加载 CSS][00]




[00]:https://www.webpackjs.com/guides/asset-management/#%E5%8A%A0%E8%BD%BD-css
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-06-loader-css-li-style.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-06-loader-css-process-error.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-06-loader-process.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-06-loader-use-before.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-06-loader-use-after.png