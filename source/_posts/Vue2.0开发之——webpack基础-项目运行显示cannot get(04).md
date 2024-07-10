---
title: Vue2.0开发之——webpack基础-项目运行显示cannot get(04)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: c1d8d70e
date: 2022-10-25 09:50:34
---
## 一 错误现象
![][1]
<!--more-->

## 二 错误原因
![][2]
打包路径问题，无法找到

## 三 解决办法

### 3.1 设置contentBase

```
devServer:{
        open:true,
        host:'localhost',
        port:8080,
        contentBase: './dist'
}
```

可能出现的问题(这个属性在新版的webpack-dev-server中被移除了, 取而代之的是devServer.static)
![][3]

### 3.2 [devServer.static][00]

```
devServer:{
        open:true,
        host:'localhost',
        port:8080,
        static: {
            directory: path.join(__dirname, './')
        },
    }
```




[00]: https://webpack.docschina.org/configuration/dev-server/#devserverstatic00
[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-04-canot-get-preview.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-04-canot-get-reason.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-04-canot-get-reason-solve-1.png

