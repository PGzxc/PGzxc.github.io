---
title: Vue2.0开发之——webpack基础-file-loader插件(08)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 98b31cf5
date: 2022-10-29 20:37:05
---
## 一 概述

* 导入图片显示示例及问题
* file-loader/url-loader的安装与配置
* file-loader中的limit选项

<!--more-->

## 二 示例-导入图片显示示例及问题

1-src/images文件夹下添加logo.png文件

![][1]

2-index.html下添加img属性

```
<img src="" alt="" class="box"/>
```

3-通过index.js添加img图片显示

```
//1.导入图片，得到图片文件
import logo from './images/logo.png'

//2.给img标签的src动态赋值
$('.box').attr('src',logo)
```

4-执行npm run dev，查看预览效果
![][2]

说明：缺少处理图片文件的file-loader、url-loader，，后面介绍如何解决此问题

## 三 file-loader/url-loader的安装与配置

### 3.1 loader的安装

```
npm install url-loader file-loader -D(--save-dev)
```

url-loader、filder-loader安装完成后，package.json-devDependencies中配置

```
"devDependencies": {
    "file-loader": "^6.2.0",
    "url-loader": "^4.1.1",
},
```

### 3.2 loader的配置

在webpack.config.js的module->rules数组中，添加loader规则

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
        ]
    }
```

### 3.3 配置loader后的效果
![][3]

## 四 file-loader中的limit选项

### 4.1 说明

* limit用来指定图片的大小，单位是字节(byte)
* 只有小于等于limit大小的图片，才会被转换为base64格式的图片

### 4.2 limit和图片大小关系

| 图片(2.09KB)>limit(1024 B) | 图片(2.09KB)<limit(8192 B) |
| :------------------------: | :------------------------: |
|           ![][4]           |           ![][5]           |

## 五 参考

* [webpack-urloader][00]
* [webpack-fileloader][01]


[00]:https://v4.webpack.js.org/loaders/url-loader/
[01]:https://v4.webpack.js.org/loaders/file-loader
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-08-images-logo-add.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-08-images-logo-run-dev-error.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-08-images-logo-run-dev-success.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-08-images-logo-limit-1.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-08-images-logo-limit-2.png