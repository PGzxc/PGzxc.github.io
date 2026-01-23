---
title: Vue2.0开发之——webpack基础-SourceMap(11)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: 6fed886
date: 2022-11-02 12:23:30
---
## 一 概述

* 由项目异常引出Source Map
* 什么是Source Map
* Source Map的几种配置
* Source Map的最佳实践

<!--more-->

## 二 由项目异常引出SourceMap

1-将index.js中console修改为consle，执行npm run dev，查看错误

![][1]

2-webpack打包项目的错误与源代码错误对比(不是源代码行数)

| webpack打包项目 | 源代码错误 |
| :-------------: | :--------: |
|     ![][2]      |   ![][3]   |





## 三 什么是Source Map

* Source Map就是一个信息文件，里面存储着位置信息。
* 也就是说，Source Map文件中存储着压缩混淆后的代码，所对应的转换前的位置
* 有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码，能够极大的方便后期的调式

## 四 Source Map的几种配置

### 4.1 开发环境，eval-source-map(内存中)

开发环境下，推荐在`webpack.config.js`中添加如下的配置，即可保证运行时报错的行数与源代码的行数保持一致

```
module.exports = {
    devtool: 'eval-source-map',
    mode: 'development', //mode 用来指定构建模式。可选值有 development 和 production
}
```

![][4]

### 4.2 生产环境下的Source Map(去掉devtool)

在生产环境下，如果省略了devtool选项，则最终生成的文件中不包含Source Map。这能够防止原始代码通过Srouce Map的形式暴露给别有企图之人

| 网页错误 | 定位到源码 |
| :------: | :--------: |
|  ![][5]  |   ![][6]   |

### 4.3 只定位行数不暴露源码

在生产环境下，如果只向定位报错的具体行数，且不想暴露源码。此时可以将devtool的值设置为

```
nosources-source-map
```

| 只暴露行号 | 不爆露源码 |
| :--------: | :--------: |
|   ![][7]   |   ![][8]   |

## 五 Source Map的最佳实践

### 5.1 开发环境

* 建议把devtool的值设置为`eval-source-map`
* 好处：可以精确定位到具体的错误行

### 5.2 生产环境

* 建议关闭Source Map或将devtool的值设置为`nosource-source-map`
* 好处：防止源码泄露，提高网站的安全性

## 六 参考

* [webpack-Devtool][00]




[00]:https://webpack.js.org/configuration/devtool/
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-11-console-error-info.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-11-console-error-index-make.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-11-console-error-index-souce.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-11-console-error-eval-source-map.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-11-console-error-product-error.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-11-console-error-product-code.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-11-console-error-nosource-info.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue2-11-console-error-nosource-code.png