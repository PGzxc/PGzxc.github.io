---
title: Uni-app面试题——面试题整理5
categories:
  - 面试相关
  - Uni-app面试题
tags:
  - Uni-app面试题
abbrlink: 65c0b1c1
date: 2024-03-22 11:33:42
---
## 一 面试题汇总

1. 简单介绍一下uniapp， 及与vue和小程序之间的关系
2. uniapp的优缺点
3. 说几个uniapp中常见的组件
4. uniapp中的指令有哪些
5. uniapp如何实现本地缓存 <!--more-->
6. uniapp中的有那些页面跳转方式
7. 列举uniapp应用的生命周期
8. 列举uniapp页面的生命周期
9. 列举uniapp组件的生命周期
10. uniapp如何实现跨端适配
11. vue、uni-app、小程序的页面传参方式区别
12. uni-app的手机端用户体验如何？
13. uniapp打包发布时如何处理请求跨域问题
14. uniapp开发需要注意哪些问题

## 二  面试题解答(仅供参考)

### 2.1 简单介绍一下uniapp， 及与vue和小程序之间的关系

```
uniapp简单来说就是vue和小程序的结合体, 
它使用vue的结构、指令、语法,和小程序的组件、API, 
它既能编写各种小程序，又能实现vue移动端网站及APP
```

### 2.2 uniapp的优缺点

```
1-优点
一套代码可以生成多端应用,降低了开发成本
语法是vue的,组件是小程序的,学习成本低
扩展能力强,使用HBuilderX开发,插件库丰富
突破了系统对H5调用原生能力的限制

2-缺点:
问世时间短,很多地方还不完善
社区不大
官方对问题的反馈不及时
在安卓平台上的运行效率比小程序和iOS差
文件命名受限
```

### 2.3 说几个uniapp中常见的组件

```
uniapp中的组件和小程序组件是一致的， 如
view视图容器，
icon图标，
text文本，
button按钮，
image图片，
map地图，
camera相机，
swiper轮播图 等等
```

### 2.4 uniapp中的指令有哪些

```
uniapp的指令系统和vue指令是一致的，有
v-for循环，
v-if/v-show条件渲染，
v-model双向绑定，
v-on事件绑定，
v-bind属性绑定 等等
```

### 2.5 uniapp如何实现本地缓存

```
uniapp的本地存储和小程序类似，
1-使用uni.setStorage()存数据，
2-使用uni.getStorage()取数据
```

### 2.6 uniapp中的有那些页面跳转方式

```
uniapp中的路由系统和小程序一致，可以使用navigator组件跳转 或者使用编程式API跳转
uni.navigatTo() 只能跳转非tabbar页面,不会关闭当前页,可以返回
uni.redirectTo() 只能跳转非tabbar页面,会关闭当前页
uni.releanch()  关闭所有已打开的页面, 跳转到任意页面
uni.switchTab()   只能从tab页面切换到tab页面
```

### 2.7 列举uniapp应用的生命周期

```
onLaunch——当uni-app 初始化完成时触发（全局只触发一次）
onShow——当 uni-app 启动，或从后台进入前台显示
onHide——当 uni-app 从前台进入后台
onError——当 uni-app 报错时触发
onUniNViewMessage——对 nvue 页面发送的数据进行监听，可参考 nvue 向 vue 通讯
onUnhandledRejection——对未处理的 Promise 拒绝事件监听函数（2.8.1+）
onPageNotFound——页面不存在监听函数
onThemeChange——监听系统主题变化
```

### 2.8 列举uniapp页面的生命周期

```
uniapp页面的生命周期与小程序页面生命周期保持一致

onLoad, 
onReady, 
onShow, 
onHide, 
onUnload, 
onResize
```

### 2.9 列举uniapp组件的生命周期

```
uniapp组件的生命周期与vue组件生命周期保持一致

beforeCreate,  created,  beforeMount,  mounted,
beforeUpdate,  updated,  beforeDestroy,  destroyed
```

### 2.10 uniapp如何实现跨端适配

```
我们按照 uni-app 规范开发即可保证多平台兼容，大部分业务均可直接满足。

但每个平台有自己的一些特性，因此会存在一些无法跨平台的情况。此时可以使用条件编译模式，它可以实现js逻辑代码，template和css样式在某个环境中生效，在其他环境不生效

条件编译 以 #ifdef+环境名 开头  以#endif 结尾, 限制一段代码只在某个平台存在
以 #ifndef+环境名 开头  以#endif 结尾, 限制一段代码除了某平台均存在
```

### 2.11 vue、uni-app、小程序的页面传参方式区别

```
vue页面传参: 通过router-link标签或router对象路由跳转传参, url拼接传值 ,动态url传值, query对象传值,命名路由params传值 这四种传值方式

uniapp和小程序页面传参: 通过跳转路径后面拼接参数进行传值
```

### 2.12 uni-app的手机端用户体验如何？

```
使用uni-app开发的微信小程序，和直接开发微信小程序相比性能没有明显差别，因为uni-app输出到微信时也是编译为wxml格式。uni-app编译到微信使用的是mpvue框架，这个是业内广泛使用的成熟框架。

uni-app打包成App后的体验和微信小程序一样好，在某些场景下更好；微信小程序的Hybrid应用框架是业内体验上的标杆，这种体验足以承载一线互联网开发商获得上亿用户。

uni-app内置预载机制，加载新页面速度极快，可实现无白屏极速渲染。

uni-app在App端还支持weex原生渲染（nvue），左右拖动长列表等复杂场景依然可实现高流畅性
```

### 2.13 uniapp打包发布时如何处理请求跨域问题

```
打包app(Android/iOS)不考虑跨域, 因为app内的数据请求不受跨域限制

打包小程序需要在小程序后台配置合法域名,

打包H5需要在上线服务器搭代理或者把打包后的项目上传至同源服务器
```

### 2.14 uniapp开发需要注意哪些问题

```
如果uniapp使用了自定义导航栏,打包小程序或app时,需要预留顶部手机顶部状态条高度
注意uniapp中的API在个平台的兼容性, 如背景音频API不支持H5端,不能在浏览器测试
dom元素信息通过API：uni.createSelectorQuery()获取，则兼容全部平台
为兼容多端运行，建议使用flex弹性布局进行开发
使用uniapp开发小程序时,注意代码包限制2M大小,必要时可使用分包
App端和H5端支持v-html,其他端不支持v-html
```

## 三 参考

* [掘金-uniApp 面试题](https://juejin.cn/post/7248987055052668988)


