---
title: Uni-app面试题——面试题整理1
categories:
  - 面试相关
  - Uni-app面试题
tags:
  - Uni-app面试题
abbrlink: d2b99543
date: 2024-03-21 22:13:31
---
## 一 面试题汇总

1. uniapp优缺点
2. uniapp的配置文件、入口文件、主组件、页面管理部分
3. uni-app 基本开发流程
4. vue , 微信小程序 , uni-app属性的绑定
5. jQuery、vue、小程序、uni-app中的本地数据存储和接收 <!--more-->
6. 页面调用接口
7. 全局变量globalData
8. vue,小程序,uni-app的生命周期
9. 路由与页面跳转
10. 跨端适配—条件编译
11. uniapp上传文件时使用的api
12. 简述 rpx、px、em、rem、%、vh、vw的区别
13. jq、vue、uni-app、小程序的页面传参方式区别
14. 组件间通信
15. uni.request封装
16. uniapp下拉刷新上拉加载
17. scroll-view吸顶问题

## 二  面试题解答(仅供参考)

### 2.1 uniapp优缺点

```
优点:
	a. 一套代码可以生成多端
	b. 学习成本低,语法是vue的,组件是小程序的
	c. 拓展能力强
	d. 使用HBuilderX开发,支持vue语法
	e. 突破了系统对H5调用原生能力的限制
缺点:
	a. 问世时间短,很多地方不完善
	b. 社区不大
	c. 官方对问题的反馈不及时
	d. 在Android平台上比微信小程序和iOS差
	e. 文件命名受限
```

### 2.2 uniapp的配置文件、入口文件、主组件、页面管理部分

#### uni-app项目目录及文件

![][1]

项目文件说明

```
pages.json
配置文件，全局页面路径配置，应用的状态栏、导航条、标题、窗口背景色设置等
main.js
入口文件，主要作用是初始化vue实例、定义全局组件、使用需要的插件如 vuex，注意uniapp无法使用vue-router，路由须在pages.json中进行配置。如果开发者坚持使用vue-router，可以在插件市场找到转换插件。
App.vue
是uni-app的主组件，所有页面都是在App.vue下进行切换的，是页面入口文件。但App.vue本身不是页面，这里不能编写视图元素。除此之外，应用生命周期仅可在App.vue中监听，在页面监听无效。
pages
页面管理部分用于存放页面或者组件
manifest.json
文件是应用的配置文件，用于指定应用的名称、图标、权限等。HBuilderX 创建的工程此文件在根目录，CLI 创建的工程此文件在 src 目录。
package.json
配置扩展，详情内容请见官网描述package.json概述
```

### 2.3 uni-app 基本开发流程

```
1-新建一个工程项目，我们可以直接使用一些模板进行开发，这些模板会有一些基础的页面和配置，能够让我们减少前期的配置直接上手开发
2-安装插件 我们可以从工具里面—>插件安装—>安装新插件—>前往插件市场安装来安装自己所需要的插件和组件，能够快速提高开发效率
3-tab页面及二级页面路径配置 pages.json pages数组中第一项表示应用启动页
4-页面设计开发 基础设置完成后就可以直接在页面上开发了
```

### 2.4 vue , 微信小程序 , uni-app属性的绑定

```
vue和uni-app动态绑定一个变量的值为元素的某个属性的时候，会在属性前面加上冒号":";
小程序绑定某个变量的值为元素属性时，会用两个大括号{{}}括起来，如果不加括号，为被认为是字符串。
```

### 2.5 jQuery、vue、小程序、uni-app中的本地数据存储和接收

```
jQuery：
	存：$.cookie('key','value')
	取：$.cookie('key')

vue：
	存储：localstorage.setItem（‘key’，‘value’）
	接收：localstorage.getItem（‘key’）

微信小程序：
	存储：通过wx.setStorage/wx.setStorageSync写数据到缓存
	接收：通过wx.getStorage/wx.getStorageSync读取本地缓存，

uni-app：
	存储：uni.setStorage({key:“属性名”，data:“值”}) //异步 
		uni.setStorageSync(KEY,DATA) //同步
	接收：uni.getStorage({key:“属性名”,success(res){res.data}}) //异步
		uni.getStorageSync(KEY) //同步
	移除：uni.removeStorage(OBJECT) //从本地缓存中异步移除指定 key。
		uni.removeStorageSync(KEY) //从本地缓存中同步移除指定 key。
	清除：uni.clearStorage() //清理本地数据缓存。
		uni.clearStorageSync() //同步清理本地数据缓存。

```

### 2.6 页面调用接口

```
getApp() 函数 用于获取当前应用实例，一般用于获取globalData
getCurrentPages() 函数 用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
uni.emit(eventName,OBJECT)和uni.on(eventName,callback) ：触发和监听全局的自定义事件
uni.once(eventName,callback)：监听全局的自定义事件。事件可以由uni.emit 触发，但是只触发一次，在第一次触发之后移除监听器。
uni.$off([eventName, callback])：移除全局自定义事件监听器。
```

### 2.7 全局变量globalData

```
//app.vue
<script>  
    export default {  
        globalData: {  
            msg: 'hello world'  
        }
    }  
</script>

//在其他页面调用/修改全局变量
getApp().globalData.msg= 'hello world'

```

### 2.8 vue,小程序,uni-app的生命周期

```
vue：
	beforeCreate（创建前）
	created（创建后）
	beforeMount(载入前，挂载）
	mounted（载入后）
	beforeUpdate（更新前）
	updated（更新后）
	beforeDestroy（销毁前）
	destroyed（销毁后）
小程序/uni-app： 
	1. onLoad：首次进入页面加载时触发，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
	2. onShow：加载完成后、后台切到前台或重新进入页面时触发
	3. onReady：页面首次渲染完成时触发
	4. onHide：从前台切到后台或进入其他页面触发
	5. onUnload：页面卸载时触发
	6. onPullDownRefresh：监听用户下拉动作
	7. onReachBottom：页面上拉触底事件的处理函数
	8. onShareAppMessage：用户点击右上角转发
```

![][2]

### 2.9  路由与页面跳转

![][3]

```
uniapp的页面跳转和小程序是一样的，都是跳转配置好的页面路径， 并且tab页面也是需要使用switchTab才能实现跳转，总体上和小程序保持一致，对于熟练小程序的朋友上手没有难度，反之，当你习惯了uniapp的页面切换组件后上手小程序也很快
```

### 2.10 跨端适配—条件编译

开发者按照 uni-app 规范开发即可保证多平台兼容，大部分业务均可直接满足。但每个平台有自己的一些特性，因此会存在一些无法跨平台的情况。因此就有了条件编译这个模式，不仅是js逻辑代码，template和css样式都可以设置成在某个环境中生效，在其他环境不生效 更多详细信息及平台适配请看[官方文档](https://uniapp.dcloud.io/tutorial/platform.html#跨端兼容)

```
//template
<!--  #ifdef  MP-WEIXIN -->
<!--  只在小程序中生效 -->
<view>我是微信小程序</view>
<!--  #endif -->

<!--  #ifdef  APP-PLUS -->
<!--  只在 app 中生效 -->
<view>我是 app </view>
<!--  #endif -->

//js
// #ifndef H5
// 表示只有 h5 不使用这个 api
uni.createAnimation(OBJECT)
// #endif

//css
/* #ifdef  MP-WEIXIN */
/*  只在小程序中生效  */
.header {
	color:red
}
/*  #endif  */

```

### 2.11 uniapp上传文件时使用的api

```
uni.uploadFile({
   		url: '要上传的地址',
       		fileType:'image',
        		filePath:'图片路径',
        		name:'文件对应的key',
        		success: function(res){
			console.log(res)
		},
    })
```

### 2.12 简述 rpx、px、em、rem、%、vh、vw的区别

```
rpx	相当于把屏幕宽度分为750份，1份就是1rpx
px	绝对单位，页面按精确像素展示
em	相对单位，相对于它的父节点字体进行计算
rem	相对单位，相对根节点html的字体大小来计算
%	一般来说就是相对于父元素
vh	视窗高度，1vh等于视窗高度的1%
vw	视窗宽度，1vw等于视窗宽度的1%
```

### 2.13 jq、vue、uni-app、小程序的页面传参方式区别

```
1、 jq传参
	通过url拼接参数进行传参。
2、 vue传参
	一、 vue可以通过标签router-link跳转传参，通过path+路径，query+参数
	二、 也可以通过事件里的this.$router.push（{}）跳转传参
3、 小程序/uniapp传参
	通过跳转路径后面拼接参数来进行跳转传参
```

### 2.14 组件间通信

在uni-app中，组件间通信可以通过事件监听、props属性传递、Vuex状态管理和全局事件总线等方式实现。以下是一些常见的组件间通信方式：

1. **事件监听**：组件可以通过监听其他组件触发的事件来实现通信。可以使用uni-app提供的事件监听机制，使用`$emit`来触发事件，然后在需要接收事件的组件中使用`$on`来监听事件。
2. **props属性传递**：通过在父组件中使用props属性向子组件传递数据。这种方式适用于父子组件之间的通信，通过在子组件中定义props属性，在父组件中传递数据给子组件。
3. **Vuex状态管理**：Vuex是uni-app中的状态管理工具，可以在整个应用的任何组件中共享状态。通过在组件中派发（dispatch）action来修改状态，然后在其他组件中订阅（subscribe）状态的变化，从而实现组件间通信。
4. **全局事件总线**：可以使用uni-app提供的`uni.$emit`和`uni.$on`方法创建一个全局事件总线，在任何组件中都能触发和监听事件，实现组件间的通信。

### 2.15 uni.request封装

通过封装 `uni.request` 函数来简化代码并提高可维护性。封装的过程可以这样描述：

1. **创建封装函数**：在你的项目中创建一个文件，例如 `api.js`，在这个文件中定义一个函数，比如 `makeRequest`，用于发送 HTTP 请求。
2. **设置基本配置**：在封装函数中，你可以设置基本的请求配置，比如 API 的基本 URL 地址、默认的请求方法、默认的请求头等。
3. **返回 Promise**：确保封装函数返回一个 Promise 对象，以便可以使用 `async/await` 或 `.then()` 语法来处理异步请求的结果。
4. **处理请求结果**：在封装函数内部，对请求成功和失败的情况进行处理，并根据 HTTP 响应状态码来判断请求的成功或失败。
5. **导出封装函数**：最后，将封装函数导出，以便在项目的其他地方可以导入并使用。

使用这种封装方式，你可以在项目中统一管理所有的 HTTP 请求，并可以轻松地对请求进行扩展和定制，比如添加请求拦截器、错误处理逻辑等

### 2.16 uniapp下拉刷新上拉加载

在 uni-app 中，实现下拉刷新和上拉加载可以增强用户体验，让应用更加流畅和易用。下面是关于下拉刷新和上拉加载的说明：

#### 下拉刷新 (`onPullDownRefresh`)

- **触发条件：** 当用户下拉页面顶部时，触发 `onPullDownRefresh` 生命周期函数。
- **作用：** 用于执行下拉刷新操作，通常用于重新加载最新数据。
- **示例用法：** 在 `onPullDownRefresh` 函数中执行重新加载数据的逻辑，并更新页面内容。
- **建议：** 下拉刷新应该加载最新的数据，避免重复数据或缓存数据。同时，为了更好的用户体验，通常会在下拉过程中显示一个加载动画或提示用户正在刷新数据。

#### 上拉加载 (`onReachBottom`)

- **触发条件：** 当页面滚动到底部时，触发 `onReachBottom` 生命周期函数。
- **作用：** 用于执行上拉加载更多数据的操作，通常用于加载更多的历史数据或分页数据。
- **示例用法：** 在 `onReachBottom` 函数中执行加载更多数据的逻辑，并将新数据追加到页面内容中。
- **建议：** 上拉加载应该在当前数据的基础上加载更多数据，避免覆盖或丢失已有数据。同时，为了提升用户体验，通常会在页面底部显示一个加载中的提示，告知用户正在加载更多数据。

### 2.17 scroll-view吸顶问题

```
问题：
 scroll-view 是常会用到的一个标签，我们可以使用 position:sticky 加一个边界条件例如top:0
属性实现一个粘性布局，在容器滚动的时候，如果我们的顶部标签栏触碰到了顶部就不会再滚动了，而是固定在顶部。但是在小程序中如果你在scroll-view元素中直接为子元素使用sticky属性，你给予sticky的元素在到达父元素的底部时会失效。

解决：
 在scroll-view元素中，再增加一层view元素，然后在再将使用了sticky属性的子元素放入view中，就可以实现粘贴在某个位置的效果了

```

## 三  参考

* [CSDN-uniapp基础掌握及面试题整理](https://blog.csdn.net/qq_45659769/article/details/119515064)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/uni-app-interview-md1-project.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/uni-app-interview-md1-life.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/uni-app-interview-md1-navigator.png