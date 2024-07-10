---
title: Vue2.0开发之——webpack基础-babel-loader插件(09)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 367be10e
date: 2022-10-31 12:19:25
---
## 一 概述

* 通过装饰器注解问题导入babel-loader
* babel-loader的安装与配置
* babel-loader处理后的效果

<!--more-->

## 二 通过装饰器注解问题导入babel-loader

### 2.1 在index.js文件中，添加如下代码

```
//定义装饰器函数
function info(target){
    target.info='Person.info'
}

//定义一个普通的类
@info
class Person{}

console.log(Person.info)
```

### 2.2 执行`npm run dev`后的效果

```
ERROR in ./src/index.js 31:0

Module parse failed: Unexpected character '@' (31:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
| 
| //定义一个普通的类
> @info
| class Person{}
```

![][1]

说明：@info是loader无法处理的高级JS语法，后面的babel-loader解决此问题

## 三 babel-loader的安装与配置

### 3.1 babel-loader的安装

```
npm install -D babel-loader @babel/core @babel/plugin-proposal-decorators 
```

安装完成后package.json添加依赖

```
 "devDependencies": {
    "@babel/core": "^7.19.6",
    "babel-loader": "^9.0.0",
  }
```

### 3.2 babel-loader的配置

在webapck.config.js的module->rules数组中，添加loader规则如下

```
module: { //所有第三方文件模块的匹配规则
        rules: [ //文件后缀名的匹配规则
            {
                test: /\.css$/, use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/, use: ["style-loader", "css-loader", "less-loader",],
            },
            {
                test: /\.(png|jpg|gif)$/,use: [{loader: 'url-loader',options: {limit: 8192,}}],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {loader: 'babel-loader',}
              }
        ]
    }
```

### 3.3 配置babel-loader

在项目根目录下，创建名为babel.config.js的配置文件，定义Babel的配置如下

```
module.exports = {
    "plugins": [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
      ]
}
```

## 四 babel-loader处理后的效果
![][2]


## 五 参考

* [webpack/babel-loader][00]
* [webpack/babel/plugin-proposal-decorators][01]




[00]:https://v4.webpack.js.org/loaders/babel-loader/#install
[01]:https://babeljs.io/docs/en/babel-plugin-proposal-decorators
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-09-babel-loader-error.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-09-babel-loader-success.png