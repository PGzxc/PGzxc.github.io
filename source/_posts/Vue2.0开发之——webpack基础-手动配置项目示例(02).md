---
title: Vue2.0开发之——webpack基础-手动配置项目示例(02)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: b28a19a7
date: 2022-10-24 10:28:38
---
## 一 概述

* 创建初始项目工程
* 项目webpack配置
* webpack的mode选项
* 配置项目的入口路径和输出文件

<!--more-->

## 二 创建初始项目工程

1- 新建vue-demo空文件夹

![][1]

2- 使用VsCode打开此空白项目
![][2]

3-切换到终端控制台，执行如下指令，生成package.json

```
npm init -y
```

![][3]

4-执行如下的指令，安装webpack和cli

```
npm install webpack  --save-dev
npm install webpack-cli --save-dev
```

![][4]

说明：

* dependencies：开发和上线阶段都要用到；通过 -S 指定安装
* deveDependencies：只在开发阶段用到，上线用不到。通过 -D 指定安装

5-新建src文件夹，用于存放项目文件

![][5]

6-新建index.html和index.js项目文件
![][6]

7-通过插件新建html默认文件
![][7]
8-通过插件创建9个列表
![][8]

9-通过如下指令，安装`jQuery`

```
npm install jquery -S
```

![][9]

10-在index.js中，使用ES6导入语法导入jQuery，实现奇数行红色，偶数行粉红色

```
//1-使用ES6导入语法，导入jQuery
import $ from 'jquery';

//2.定义jQuery的入口函数
$(function name() {
    //3.实现奇偶行变色效果
    $('li:odd').css('background-color','red') //奇数行
    $('li:even').css('background-color','pink') //偶数行
})
```

11-在index.html中导入index.js，预览项目效果

```
<script src="./index.js"></script>
```

![][10]

说明：语法报错；使用ES6中的高级语法，不支持

## 三 项目webpack配置-webpack.config.js

### 3.1 在项目根目录中创建名为`webpack.config.js`配置文件

```
module.exports = {
    mode: 'development' //mode 用来指定构建模式。可选值有 development 和 production
}
```

![][11]

### 3.2 在package.json的scripts节点下，新增dev脚本

```
"dev": "webpack",
```

![][12]

说明：scripts节点下的脚本，可以通过npm run执行，例如npm run dev

### 3.3 在终端中运行npm run dev命令，启动webpack进行项目的打包构建
![][13]

说明：执行成功后，dist目录下生成main.js文件。将index.html中的index.js替换为main.js后，预览成功

```
 <!-- <script src="./index.js"></script> -->
 <script src="../dist/main.js"></script>
```

![][14]

## 四 webpack的mode选项

### 4.1 mode的可选值

mode节点的可选值有两个，分别是：

#### development

* 开发环境
* 不会对打包生成的文件进行代码压缩和性能优化
* 打包速度快，适合在开发阶段使用

#### production

* 生产环境
* 会对打包生成的文件进行代码压缩和性能优化
* 打包速度很慢，仅适合在项目发布阶段使用

### 4.2 效果对比

| development | production |
| :---------: | :--------: |
|   ![][15]   |  ![][16]   |

说明：

* development：大小为325kb，编译速度快
* production：大小为88.5kb，编译速度慢

## 五 配置项目的入口路径和输出文件

### 5.1 webpack中的默认约定

在webpack 4.x和5.x的版本中，有如下的默认约定

* 默认的打包入口文件为src—>index.js
* 默认的输出文件路径为dist—>main.js

注意：可以在webpack.config.js中修改打包的默认约定

### 5.2 错误演示

![][17]

说明：将index.js修改为index1.js后，出现上述错误

### 5.2 自定义打包的入口与出口

在webpack.config.js配置文件中，通过entry节点指定打包的入口。通过output节点指定打包的出口。

```
const path = require('path') //导入node.js中专门操作路径的模块

module.exports = {
    entry: path.join(__dirname, './src/index1.js'), //打包入口文件的路径
    output: {
        path: path.join(__dirname, './dist'), //输出文件的存放路径
        filename: 'bundle.js'//输出文件的名称
    },
    mode: 'development' //mode 用来指定构建模式。可选值有 development 和 production
}
```

![][18]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-02-vue-demo-empty.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-02-vue-demo-empty-vscode-open.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-02-vue-demo-empty-vscode-init.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-02-vue-demo-empty-vscode-install.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-02-vue-demo-empty-vscode-src.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-02-vue-demo-empty-vscode-indexs-create.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-02-vue-demo-empty-vscode-index-default.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-02-vue-demo-empty-vscode-html-table.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-02-vue-demo-empty-vscode-install-jq.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-02-vue-demo-empty-vscode-html-preview-first.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-02-vue-demo-empty-config-webpack-mode.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-02-vue-demo-empty-config-scripts-dev.png
[13]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-02-vue-demo-empty-config-run-dev.png
[14]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-02-vue-demo-empty-config-run-dev-suc.png
[15]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-02-vue-demo-mode-development.png
[16]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-02-vue-demo-mode-production.png
[17]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-02-vue-demo-empty-config-output-error.png
[18]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-02-vue-demo-empty-config-output-suc.png