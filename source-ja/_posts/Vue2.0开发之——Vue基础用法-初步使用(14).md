---
title: Vue2.0开发之——Vue基础用法-初步使用(14)
categories:
  - 开发
  - C-前端开发
  - Vue2
tags:
  - Vue2
abbrlink: a8b1d626
date: 2022-11-06 17:22:17
---
## 一 概述

* Vue的下载及安装
* Vue使用示例

<!--more-->

## 二 Vue的下载及安装

### 2.1 Vue使用前提(Node)

```
node --version
```

v18.8.0

### 2.2 Vue(2.7.10)下载

Vue下载地址：https://v2.cn.vuejs.org/v2/guide/installation.html 
![][1]

同理下载：

* dayjs.min.js：https://dayjs.fenxianglu.cn/category
* Bootstrap: https://www.bootcss.com/ 

### 2.3 Vue的配置(导入Vue的库文件)

```
<script src="./lib/vue-2.7.10.js"></script>
```

![][2]

## 三 Vue使用示例

1-在script中，创建vue的示例对象

```
const vm = new Vue();
```

![][3]

2-在body下，申请Vue控制下的div

```
<div id="app">
</div>
```

![][4]

3-在Vue实例内部，通过el属性接受一个选择器，指定要控制的区域

```
const vm = new Vue(){
    el:'#app'
};
```

4-在于el平级的data指定要渲染到页面上的数据

```
const vm = new Vue({
    el:'#app',
    data:{
        username:'zhangsan'
    }
})
```

![][5]

5-在渲染位置使用`{{}}`标明填充数据

```
<div id="app">{{username}}</div>
```

6-在浏览器中查看效果
![][6]

## 四 基本代码与MVVM的对应关系
![][7]

## 五 参考

* [Vue][00]
* [dayjs.js][01]
* [bootstrap][02]



[00]:https://v2.cn.vuejs.org/v2/guide/installation.html
[01]:https://dayjs.fenxianglu.cn/category
[02]: https://www.bootcss.com/

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-14-vue-download-site.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-14-vue-lib-import.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-14-vue-create-obj.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-14-vue-div-control.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-14-vue-data-username.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-14-vue-div-view.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-vue/vue02-14-vue-mvvm.png