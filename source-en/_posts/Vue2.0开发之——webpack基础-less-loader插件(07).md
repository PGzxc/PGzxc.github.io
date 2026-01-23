---
title: Vue2.0开发之——webpack基础-less-loader插件(07)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 2a294a3d
date: 2022-10-28 09:57:20
---
## 一 概述

* 示例导入less文件修改样式
* less-loader的安装与配置
* less-loader打包处理less后的效果

<!--more-->

## 二 示例导入less文件修改样式

1-css文件夹下，添加index.less样式文件

```
html,body,ul{
    margin: 0;
    padding: 0;
    li{
        line-height: 30px;
        padding-left: 20px;
        font-size: 12px;
    }
}
```

![][1]

2-index.js中导入index.less样式文件

```
import './css/index.less'
```

3-执行`npm run dev`查看效果

```
Compiled with problems:X

ERROR in ./src/css/index.less 1:12

Module parse failed: Unexpected token (1:12)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file.
```

![][2]

说明：缺少处理.less文件的less-loader，后面介绍如何解决此问题

## 三 less-loader的安装与配置

### 3.1 less-loader的安装

```
npm install less less-loader -D(--save-dev)
```

安装完成后，package.json->devDependencies配置

```
"devDependencies": {
    "less": "^4.1.3",
    "less-loader": "^11.1.0",
 },
```

### 3.2 在webpack.config.js的module->rules数组中，添加loader规则

```
module: { //所有第三方文件模块的匹配规则
        rules: [ //文件后缀名的匹配规则
            {
                test: /\.css$/, use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,use: ["style-loader","css-loader","less-loader",],
            },
        ]
}
```

## 四 less-loader打包处理less后的效果
![][3]

## 五 参考

[webpack-less-loader][00]



[00]:https://webpack.js.org/loaders/less-loader/#root
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-07-index-less-create.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-07-index-less-run-error.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-07-index-less-run-correct.png