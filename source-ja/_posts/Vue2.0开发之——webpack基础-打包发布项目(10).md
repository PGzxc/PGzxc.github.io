---
title: Vue2.0开发之——webpack基础-打包发布项目(10)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: f15de03a
date: 2022-11-01 11:27:23
---
## 一  概述

* 配置webpack打包发布
* 优化图片和js文件的存放路径
* 配置和使用clean-webpack-plugin插件自动删除dist目录
* 发布流程总结

<!--more-->

## 二 配置webpack打包发布

在package.json文件的scripts节点下，新增build命令如下：

```
"scripts": {
    "build": "webpack --mode production",
    "dev": "webpack serve",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

说明：

* --model是一个参数项，用来指定webpack的运行模式。production代表生产环境，会对打包生成的文件进行压缩和性能优化
* 通过--model指定的参数项，会覆盖webpack.config.js中的model选项

## 三 优化图片和js文件的存放路径

### 3.1 把JavaScript文件统一生成到js目录中

在webpack.config.js配置文件的output节点中，进行如下的配置

```
output: {
      path: path.join(__dirname, './dist'), //输出文件的存放路径
      filename: 'js/bundle.js',//输出文件的名称
},
```

![][1]

### 3.2 把图片文件统一生成到image目录中

修改webpack.config.js中的url-loader配置项，新增outputPath选项即可指定图片文件的输出路径

```
{
   test: /\.(png|jpg|gif)$/,
   use: [{loader: 'url-loader',options: {limit: 1000,outputPath:'images'}}],
},
```

执行`npm run build`指令后，查看dist文件夹下图片的生成路径

![][2]

## 四 配置和使用clean-webpack-plugin插件自动删除dist目录

### 4.1 clean-webpack-plugin插件介绍

一款webpack插件，用于删除和清理自动生成的dist文件夹中文件

### 4.2 clean-webpack-plugin插件安装

```
npm install --save-dev clean-webpack-plugin
```

### 4.3 clean-webpack-plugin插件配置

1-在webpack.config.js中导入clean-webpack-plugin插件

```
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
```

2-在module.exports->plugins下配置

```
plugins: [ new CleanWebpackPlugin(),],
```

### 4.4 执行`npm run dev`重新生成dist文件

```
npm run dev
```

## 五 发布流程总结

* 在package.json中自定义build指令，执行`npm run build`就会执行打包发布操作
* 在配置项中指定图片和js的存放文件夹
* 如果需要删除dist文件夹内容重新生成，借助clean-webpack-plugin插件

## 六 参考

* [webpack-clean-webpack-plugin][00]


[00]:https://www.npmjs.com/package/clean-webpack-plugin
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-10-js-file-build.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-10-images-file-build.png