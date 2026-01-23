---
title: Vue2.0开发之——webpack基础-html-webpack-plugin插件(05)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 8b172b84
date: 2022-10-26 08:59:50
---
## 一 概述

* html-webpack-plugin插件介绍
* html-webpack-plugin插件安装与配置
* html-webpack-plugin插件的特性

<!--more-->

## 二 html-webpack-plugin插件介绍

* webpack中的HTML插件(类似于一个模板引擎插件)
* 可以通过此插件自定制Index.html页面的内容

## 三 html-webpack-plugin插件安装与配置

### 3.1 html-webpack-plugin插件安装

通过如下的命令，即可在项目中安装此插件

```
npm install html-webpack-plugin -D
```

安装完成后package.json->devDependencies下可以看到html-webpack-plugin依赖

```
  "devDependencies": {
    "html-webpack-plugin": "^5.5.0",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0",
    "webpack-dev-server": "^4.11.1"
  },
```

### 3.2 html-webpack-plugin插件配置

1-导入HTML插件，得到一个构造函数

```
const HtmlPlugin =require('html-webpack-plugin') 
```

2-指定源文件和生成文件的存放路径

```
const htmlPlugin = new HtmlPlugin({
    template:'./src/index.html', //指定源文件的存放路径
    filename: './index.html', //指定生成文件的存放路径
})
```

3-通过plugins节点，使htmlPlugin插件生效

```
module.exports = {
    entry: path.join(__dirname, './src/index.js'), //打包入口文件的路径
    output: {
        path: path.join(__dirname, './dist'), //输出文件的存放路径
        filename: 'bundle.js',//输出文件的名称
        
    },
    mode: 'development', //mode 用来指定构建模式。可选值有 development 和 production
    devServer:{
        open:true,
        host:'localhost',
        port:8080,
        static: {
            directory: path.join(__dirname, './')
        },
    },
    plugins:[htmlPlugin], //通过plugins节点，使htmlPlugin插件生效
}
```

### 3.3 使用html-webpack-plugin前后对比

| 使用前 | 使用后 |
| :----: | :----: |
| ![][1] | ![][2] |

说明：

* 使用前，未配置html源和目的路径，打开后是根目录
* 使用后，配置了html源和目的路径，可以预览效果图

## 四 html-webpack-plugin插件的特性

### 4.1 index源码和html-webpack-plugin生成对比

| index源码 | html-webpack-plugin生成 |
| :-------: | :---------------------: |
|  ![][3]   |         ![][4]          |

### 4.2 解惑hmtl-webpack-plugin

* 通过HTML插件复制到项目根目录中的Index.html页面，也被放到内存中
* HTML插件在生成的index页面，自动注入了打包的bundle.js文件

## 五 参考

[Webpack-全局 exports][00]

[00]:https://www.webpackjs.com/guides/shimming/#%E5%85%A8%E5%B1%80-exports






[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-05-html-webpack-plugin-before.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-05-html-webpack-plugin-after.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-05-html-webpack-plugin-index-self.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-05-html-webpack-plugin-def-add.png