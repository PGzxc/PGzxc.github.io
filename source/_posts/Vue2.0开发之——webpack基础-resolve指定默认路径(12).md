---
title: Vue2.0开发之——webpack基础-resolve指定默认路径(12)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 2a97c34e
date: 2022-11-03 10:47:15
---
## 一 概述

* resolve的作用与配置
* 使用resolve前后，文件路径的配置

<!--more-->

## 二 resolve的作用与配置

### 2.1 resolve的作用

* 这个选项更改模块的解析方式，webpack提供了合理的默认值
* 创建别名以更容易地导入或要求某些模块。例如，为一组常用的src指定别名

### 2.2 resolve的配置(webpack.config.js)

```
module.exports = {
    resolve:{
        alias:{
            //告诉webpack，程序员写的代码中，@符号表示sr这一层目录
            '@':path.join(__dirname,'./src/')
        }
    }
}
```

## 三 使用resolve前后，文件路径的配置(index.js文件为例)

|        resolve前        |        resolve后         |
| :---------------------: | :----------------------: |
| import './css/index.css | import '@/css/index.css' |

说明：

* 使用@代替webpack.config.js中设置的src这一层路径
* 从src这一层开始，配置文件路径

## 四 参考

* [webpack-Resolve][1]

[1]:https://webpack.js.org/configuration/resolve/

