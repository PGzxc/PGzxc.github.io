---
title: Uni-app面试题——面试题整理6
categories:
  - 面试相关
  - Uni-app面试题
tags:
  - Uni-app面试题
abbrlink: fcc9e07b
date: 2024-03-22 12:04:13
---
## 一 面试题汇总

1. 谈谈你对uni-app的理解
2. uni中如何为不同的平台设置不同的代码
3. uni支持的文件类型
4. uniapp中封装接口请求相较于微信小程序有什么要注意的
5. uni-app 在非h5端上运行为什么要在架构上分为逻辑层和视图层？<!--more-->
6. 详细描述一下Uniapp的工作原理
7. 描述一下在Uniapp中如何实现跨平台开发
8. 在Uniapp中是否可以使用原生功能？如果可以，如何实现？
9. 在Uniapp中如何处理网络请求？
10. 描述一下在Uniapp中，组件和页面的区别。
11. Uniapp如何实现自定义组件？
12. 请列出Uniapp工程中有哪些可用的构建模式？
13.  描述一下Uniapp的几种布局方式
14. 如何在Uniapp中使用vuex来管理全局状态？
15. 在Uniapp中，如何使用原生SDK以及插件？
16. 描述一下在Uniapp中如何实现动态路由
17. 一句话总的形容uniapp与vue和微信小程序的区别
18. uni-app中的生命周期
19. uni-app 中的本地缓存
20. uni-app 的配置文件部分
21. uni-app路由与跳转
22. 全局变量 globalData 的理解
23. uni-app 跨端原理
24. 不同平台的 runtime 是怎么转义的？
25. uni-app 的编译器是如何特定编译的？

## 二  面试题解答(仅供参考)

### 2.1 谈谈你对uni-app的理解

uni-app是一个使用Vue.js开发所有前端应用的框架，开发者编写一套代码，可以发布到IOS、Android、Web（响应式）、以及各种小程序、快应用等多个平台。

```
1-uniapp真正做到一套代码多端发行，支持原生代码混写和原生sdk集成。
2-运行体验更好。组件、api与微信小程序一致，兼容 Weex 原生渲染。
3-通用技术栈，学习成本更低。Vue的语法，微信小程序的api，对于前端开发人员来说更容易上手。
4-开放生态，组件更丰富。支持通过npm安装第三方包；支持微信小程序自定义组件及sdk；兼容 mpvue 组件及项目；app端支持与原生混合编码；
```

### 2.2 uni中如何为不同的平台设置不同的代码

通过条件注释来为不同平台设置不同的代码：
条件注释的作用：实现跨端兼容
使用方法：以 #ifdef 或 #ifndef 加平台代值开头，以 #endif 结尾
#ifdef：if defined 如果是xx平台则运行代码块
#ifndef：if not defined 如果不是xx平台才运行代码块

```
H5	H5
MP-WEIXIN	微信小程序
APP-PLUS  app
MP  所有小程序
```

### 2.3 uni支持的文件类型

```
.vue
.js
.css
pages.json
各预编译语言文件，如：.scss、.less、.stylus、.ts、.pug
```

### 2.4 uniapp中封装接口请求相较于微信小程序有什么要注意的

```
uniapp和微信小程序都提供了网络请求API（uni.request(OBJECT) 和 wx.request(object)），
但 uniapp 为了实现跨端兼容，需要注意网络请求跨域问题，
微信小程序不用考虑多端兼容，也不会出现跨域问题。

uniapp中的跨域问题依然可以通过在 vue.config.js 中配置Proxy代理解决；
devServer ——> proxy ——> changeOrigin: true,  //是否跨域
```

### 2.5 uni-app 在非h5端上运行为什么要在架构上分为逻辑层和视图层？

```
主要原因是性能。web端都运行在webview里，js运算和界面渲染会抢资源导致卡顿，
而小程序和app，逻辑层都独立为了单独的 js 引擎，渲染层仍然是webvbiew（app也支持原生渲染）。
所以在小程序和app上不支持window，dom等API（app可以在渲染层操作window,dom）
```

### 2.6 详细描述一下Uniapp的工作原理

```
将Vue.js的模板语法转换为各个平台所支持的原生组件，再通过引擎的渲染器将其渲染到各个平台上。

同时，Uniapp还提供了平台API以及对各平台的配置文件支持，使得开发者能够方便地在同一份代码下实现对不同平台的适配。
```

### 2.7 描述一下在Uniapp中如何实现跨平台开发

```
在Uniapp中，使用Vue.js的语法开发，
同时通过Uniapp所提供的各平台API和配置文件适配各种平台的差异即可实现跨平台开发。
例如，在编写页面的时候，可使用Uniapp提供的原生组件替代HTML标签
，然后在编写样式时，可通过编写针对各平台的样式代码，使样式在各平台下呈现一致。
```

### 2.8 在Uniapp中是否可以使用原生功能？如果可以，如何实现？

```
是的，Uniapp支持使用原生功能。
具体实现方式是，可以使用Uniapp提供的API调用各平台的原生组件和接口，然后再将其渲染到对应的平台上。
比如，在调用原生摄像头时，可以通过调用Uniapp提供的API获取到原生摄像头组件，并在页面中进行渲染。
```

### 2.9 在Uniapp中如何处理网络请求？

```
在Uniapp中，可通过Uniapp提供的网络请求方法来处理网络请求。
具体实现方式是，在前端代码中编写网络请求代码，使用Uniapp提供的request方法发送请求，
并在回调函数中处理响应结果。
```

### 2.10 描述一下在Uniapp中，组件和页面的区别。

```
在Uniapp中，页面和组件的区别在于，
1-页面是一个具体的应用页面，拥有独立的路由地址和生命周期函数，
2-而组件是应用页面中的局部组件，包含在页面中，没有独立的路由地址和生命周期函数。
```

### 2.11 Uniapp如何实现自定义组件？

```
在Uniapp中，可通过Vue.js的组件机制实现自定义组件。
具体实现方式是，编写组件的基本结构和属性方法等，
并将组件注册到Vue.js的全局组件或局部组件中，
然后在需要使用组件的地方进行调用
```

### 2.12 请列出Uniapp工程中有哪些可用的构建模式？

```
Uniapp工程中可用的构建模式有：开发模式、生产模式、H5模式、跨平台模式等
```

### 2.13 描述一下Uniapp的几种布局方式

```
在Uniapp中，可实现的布局方式有Flex布局、Grid布局、绝对布局等。
这些布局方式可根据不同的场景来选择使用
```

### 2.14 如何在Uniapp中使用vuex来管理全局状态？

```
在Uniapp中，可通过vuex来管理全局状态。

具体实现方式是，在应用程序的入口文件中，注入vuex实例，
并在其中编写状态管理器，
然后在各组件中使用mapState、mapGetters、mapMutations等方法来访问和修改全局状态。
```

### 2.15 在Uniapp中，如何使用原生SDK以及插件？

```
在Uniapp中，可通过uni-app plus的方式来集成原生SDK和插件。
具体实现方式是，在manifest.json文件中添加对应的插件设置，
并在代码中调用相关API使用内置的SDK和插件。
```

### 2.16 描述一下在Uniapp中如何实现动态路由

```
在Uniapp中，可通过vue-router实现动态路由。
具体实现方式是，在定义路由时，使用动态路由参数设置路由的路径，
然后在组件中通过$route.params来获取路由参数，以便进行页面的动态渲染
```

### 2.17 一句话总的形容uniapp与vue和微信小程序的区别

```
uni-app就是用着vue的指令和小程序的组件和API
```

### 2.18 uni-app中的生命周期

#### 应用生命周期

```
onLanuch – uni-app 初始化完成时触发（全局只触发一次）
onShow – uni-app启动，或从后台进入前台显示
onHide – uni-app从前台进入后台
onError – 当uni-app 报错时触发
onUNiNViewMessage – 对 nvue 页面发送的数据进行监听
onUnhandledRejection – 对未处理的Promise拒绝事件监听函数
onPageNotFound – 页面不存在监听函数
onThemeChange – 监听系统主题变化
```

#### 页面生命周期

```
onInit – 监听页面初始化，参数同onLoad参数，为上个页面传递的数据，参数类型为Object，触发时机早于onLoad
onLoad – 监听页面加载，其参数为上个页面传递的数据，参数类型为Object
onShow – 监听页面显示，页面每次出现在屏幕上都触发，包括从下级页面返回露出当前页面
onReady – 监听页面初次渲染
onHide – 监听页面隐藏
onUnload – 监听页面隐藏
onResize – 监听窗口尺寸变化
```

#### 组件的生命周期

```
beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
beforeDestroy
destroyed
```

### 2.19 uni-app 中的本地缓存

```
同步存储：uni.setStorageSync,获取：uni.getStorageSync

异步存储：uni.setStorage,获取：uni.getStorage
```

### 2.20 uni-app 的配置文件部分

```
uniCloud —— 云空间目录
components —— 组件目录
comp-a.vue —— 可复用的a组件 
hybrid —— App端存放本地html文件的目录
platforms —— 存放各平台专用页面的目录
pages —— 业务页面文件存放的目录
static —— 存放本地静态资源
uni_modules —— 存放【uni_module】规范的插件
wxcomponents —— 存放小程序组件的目录
main.js —— Vue初始化入口文件
App.vue —— 应用配置，用来配置App全局样式以及监听
mainfest.json —— 配置应用名称，appid，logo，版本等打包信息
page.json —— 配置页面路由，导航条，选项卡等页面类信息
uni.scss —— uni-app内置的常用样式变量
```

### 2.21 uni-app路由与跳转

```
uni.navigateTo 跳转页面
uni.redirect 销毁当前页跳转到指定页面
uni.switchTab 跳转至tab页面
uni,reLaunch 销毁所有页面跳转至指定页面
uni.navigateBack 返回上一页
exit 退出小程序，target = "miniProgram"时生效
```

### 2.22 全局变量 globalData 的理解

```
globalDate 和微信小程序中一样，是定义在全局上的对象看，
他类似vuex，用来共享全局状态，
在组件和页面中可以使用getApp().globalData 来获取和修改全局变量
```

### 2.23 uni-app 跨端原理

```
uni-app 分编译器和运行时（runtime），
实现一套代码，多端运行主要是这两部分配合完成的 
编译器将开发者的代码进行编译，编译的输出物由每个平台各自的runtime进行解析。
```

### 2.24 不同平台的 runtime 是怎么转义的？

```
小程序端，使用小程序版的vue runtime ，页面路由，组件，api 等方面基本都是转义。
web 端，uni-app的runtime 相比普通的vue项目，多一套ui库，页面路由框架，uni对象。
App 端，uni-app的 runtime 更复杂，DCloud 有一套小程序引擎，打包app时将开发者的代码和DCloud 的小程序打包成apk或ipa
```

### 2.25 uni-app 的编译器是如何特定编译的？

```
在 web、app平台，将.vue 文件 编译成 js 代码，小程序则拆分生成wxml,wxss ,js等
如果涉及uts代码，安卓编译为kotlin代码，ios 编译成swift 代码。
vue2版本的编译器基于webpack实现，vue3通过 vite 实现，性能更快。
同时也支持条件编译，可以指定代码至编译到特定的终端平台。
```

## 三 参考

* [掘金-uni-app面试题汇总](https://juejin.cn/post/7254906121190080568)


