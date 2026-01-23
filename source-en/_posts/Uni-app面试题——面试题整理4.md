---
title: Uni-app面试题——面试题整理4
categories:
  - 面试相关
  - Uni-app面试题
tags:
  - Uni-app面试题
abbrlink: 12c78157
date: 2024-03-22 10:56:01
---
## 一 面试题汇总

1. uniapp优缺点
2. 一句话总的形容一下uniapp与vue和微信小程序的异同点
3. uniapp的配置文件、入口文件、主组件、页面管理部分
4. Uniapp 中配置tabBar的方式及二级页面路径配置
5. Uniapp 中常见的组件(说几个即可) <!--more-->
6. 跨端适配— 条件编译
7. Uniapp 中常用的指令语句
8. Uniapp中的本地缓存
9. uni-app全局变量怎么定义，怎么获取
10. uni中生命周期
11. uniapp 中的跳转方式(navigator 标签、uni.navigateTo方法) 
12. uniapp项目页面之间传值
13. Uniapp 中组件的创建以及使用和传参方式
14. 关于uniapp项目中页面之间传递数据的三种方式

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

### 2.2 一句话总的形容一下uniapp与vue和微信小程序的异同点

```
简单来讲Uni-app就是   用着vue的指令和小程序的组件和API

1-vue和uni-app动态绑定一个变量的值为元素的某个属性的时候，会在属性前面加上冒号":";
2-小程序绑定某个变量的值为元素属性时，会用两个大括号{{}}括起来，如果不加括号，为被认为是字符串
```

### 2.3 uniapp的配置文件、入口文件、主组件、页面管理部分

```
1-pages.json 配置文件，全局页面路径配置，应用的状态栏、导航条、标题、窗口背景色设置等
2-main.js 入口文件，主要作用是初始化vue实例、定义全局组件、使用需要的插件如 vuex，
注意uniapp无法使用vue-router，路由须在pages.json中进行配置。
如果开发者坚持使用vue-router，可以在插件市场找到转换插件。
3-App.vue 是uni-app的主组件，所有页面都是在App.vue下进行切换的，是页面入口文件。
但App.vue本身不是页面，这里不能编写视图元素。除此之外，应用生命周期仅可在App.vue中监听，在页面监听无效。
4-pages 页面管理部分用于存放页面或者组件
5-manifest.json 文件是应用的配置文件，用于指定应用的名称、图标、权限等。
HBuilderX 创建的工程此文件在根目录，CLI 创建的工程此文件在 src 目录。
6-package.json 配置扩展。
```

### 2.4 Uniapp 中配置tabBar的方式及二级页面路径配置

pages.json中pages数组中第一项表示应用启动页

```
{
	//页面路径配置,未设置root则path默认完整路径
	"pages": [ 
		{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "首页",
				"enablePullDownRefresh": true
			}
		}
	],
	//二级页面，设置了root根文件路径，则path可以简写
	"subPackages": [{
		"root": "pages/test-sub",
		"pages": [
			{
				"path": "login/index",
				"style": {
					"navigationBarTitleText": "登录"
				}
			}
		]
	}],
	//全局样式配置
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "uni-app",
		"navigationBarBackgroundColor": "#F8F8F8",
		"backgroundColor": "#F8F8F8"
	},
	"tabBar": {
		//tab样式和选中后效果
		"color": "#7A7E83",
		"selectedColor": "#2BD3DE",
		"borderStyle": "black",
		"backgroundColor": "#F8F8F8",
		//tab页面配置，包括图标路径，tab名称、路径
		"list": [{
				"pagePath": "pages/index/index",
				"iconPath": "static/农场_24种子.png",
				"selectedIconPath": "static/农场_31花草.png",
				"text": "首页"
			},
			{
				"pagePath": "pages/user/index",
				"iconPath": "static/农场_36稻草人.png",
				"selectedIconPath": "static/农场_28蜜蜂.png",
				"text": "个人中心"
			},
			{
				"pagePath": "pages/test/index",
				"iconPath": "static/农场_36稻草人.png",
				"selectedIconPath": "static/农场_28蜜蜂.png",
				"text": "测试页面"
			}
		]
	}
}
```

### 2.5 Uniapp 中常见的组件(说几个即可)

```
view：视图容器。
icon：图标
text：文本组件。
button: 按钮
image：图片
swiper: 轮播图
```

### 2.6 跨端适配— 条件编译

写法：以 #ifdef *或* #ifndef 加 *%PLATFORM%* 开头，以 #endif 结尾。

```
1-#ifdef：if defined 仅在 某平台存在
2-#ifndef：if not defined 除了 某平台均存在
3-%PLATFORM%：平台名称
```

说明及示例

|  说明  |  示例  |
| :----: | :----: |
| ![][1] | ![][2] |

代码示例

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

### 2.7 Uniapp 中常用的指令语句

```
v-for：循环渲染 （注意加：key）
v-if ：控制元素的删除添加       
v-show：控制元素的显示隐藏
v-model：双向数据绑定
v-on：事件绑定（简写@）
v-bind：属性绑定（简写：）
```

### 2.8 Uniapp中的本地缓存

```
同步存储：uni.setStorageSync，获取：uni.getStorageSync
异步存储：uni.setStorage，获取：uni.getStorage
```

### 2.9 uni-app全局变量怎么定义，怎么获取

```
在app.js中设置globalData设置，在需要的地方的js文件
let app=getApp()
app.globalData.数据
```

### 2.10 uni中生命周期

界面和应用的生命周期采用的绝大多数是小程序的生命周期
组件的生命周期采用的是vue的生命周期

一、应用的生命周期

```
1.onLaunch——当uni-app 初始化完成时触发（全局只触发一次）
2.onShow——当 uni-app 启动，或从后台进入前台显示
3.onHide——当 uni-app 从前台进入后台
4.onError——当 uni-app 报错时触发
5.onUniNViewMessage——对 nvue 页面发送的数据进行监听，可参考 nvue 向 vue 通讯
6.onUnhandledRejection——对未处理的 Promise 拒绝事件监听函数（2.8.1+）
7.onPageNotFound——页面不存在监听函数
8.onThemeChange——监听系统主题变化 
```

二、页面的生命周期

```
1.onInit——监听页面初始化，其参数同 onLoad 参数，为上个页面传递的数据，参数类型为 Object（用于页面传参），触发时机早于 onLoad
2.onLoad——监听页面加载，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参），参考示例
3.onShow——监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
4.onReady——监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
5.onHide——监听页面隐藏
6.onUnload——监听页面卸载
7.onResize——监听窗口尺寸变化
```

三、组件的生命周期

```
uni-app 组件支持的生命周期，与vue标准组件的生命周期相同

1.beforeCreate——在实例初始化之后被调用。
2.created——在实例创建完成后被立即调用。
3.beforeMount——在挂载开始之前被调用。
4.mounted——挂载到实例上去之后调用。详见 注意：此处并不能确定子组件被全部挂载，如果需要子组件完全挂载之后在执行操作可以使用$nextTickVue官方文档
5.beforeUpdate——数据更新时调用，发生在虚拟 DOM 打补丁之前。
6.updated——由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
7.beforeDestroy——实例销毁之前调用。在这一步，实例仍然完全可用。
8.destroyed——Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
```

### 2.11 uniapp 中的跳转方式(navigator 标签、uni.navigateTo方法) 

```
1-标签法：
<navigator url="/pages/about/about"></navigator>
跳转tabBar页面加open-type="switchTab"

2-页面跳转
uni.navigateTo({url: “/路径?参数=参数值”})    保留当前页面，只能打开非 tabBar 页面。uni.redirectTo({})关闭卸载当前页面，只能打开非 tabBar 页面

3-tabBar跳转
uni.switchTab关闭所有非tabbar页面， 只能打开 tabBar 页面，不能url传参
uni.reLaunch({})关闭卸载所有页面，可以打开任意页面
```

### 2.12 uniapp项目页面之间传值

一、传单个或多个参数(方法：直接在地址后面拼接)

```
1、在将要跳转的页面上地址后面拼接要传递的参数，传递多个时用&符拼接

//任务列表页传递id  跳转到相应的任务详情页
gettaskList（id）{
    //传递多个参数时直接用&符拼接
	uni.navigateTo({
		url:'gettaskList?id=${id}'
	})
	
2、接收时，在页面的onload函数中接收传递过来的参数
// 任务详情页通过 onLoad 生命周期中接传递过来的参数 id
onLoad(option){
   console.log('上一个页面传递过来的参数', option)
   console.log('id', option.id)
   console.log('item', option.item)
   // 接下来就是你需要该id做些什么，比如通过id查询到该详情等
}

```

二、传递对象

```
1-如需要传递的参数有很多时，由于uniapp跳转页面api 的 url 有长度限制，使用以下数据传递：
// item 为该列表的每一项的数据对象；encodeURIComponent 为uniapp 提供的api
getTaskList(item) {
	uni.navigateTo({
		 url: `getTaskList?item=${encodeURIComponent(JSON.stringify(item))}`,
	});
}
2-接收时
// 同样onLoad 生命周期中进行接收， decodeURIComponent 为uniapp 提供的api
onLoad(option) {
	const item = JSON.parse(decodeURIComponent(option.item));
	console.log('上一个页面传递过来的参数对象'，item );
	// 接下来就是你需要该对象数据做些什么，当然这里你可以直接赋值给data绑定的数据
	this.objData = item;
}
注意：传递数据的时候必须使用 JSON.stringify 将其转为 JSON 字符串，然后接收的时候也必须使用 JSON.parse 来进行解析！
操作数组也是一样的，因为数组也是对象
```

### 2.13 Uniapp 中组件的创建以及使用和传参方式

```
1-创建：在uni-app中，可以通过创建一个后缀名为vue的文件，即创建一个组件成功
2-使用：其他组件可以将该组件通过impot的方式导入，在通过components进行注册即可
3-传参方法：父传子，子传父，全局，事件总线
```

### 2.14 关于uniapp项目中页面之间传递数据的三种方式

#### 第1种（在跳转页面时使用URL编程式传参)

1-单向传递

```
只能上级页面传递到下级页面
```

2-**双向传递**：上级页面可以传递给下级页面，下级页面也可以传递给上级页面

```
1-上级页面（使用events，利用下级页面向上级页面传递数据的变量名获取传递的参数）
 preserveRevise(){
				uni.navigateTo({
					url:'/pages/addressMange/addressMange?id=1',
					events:{
						//获取下级页面传递回来的参数
						sonPageData:data=>{
							console.log(data);
						}
					}
				})
			}
2-下级页面（利用this.getOpenerEventChannel().emit向上级页面传递参数的变量名和变量值）
onLoad(e){
	console.log(e.id);
	this.getOpenerEventChannel().emit('sonPageData',"我是第二个页面传递回来的数据")
}
```

#### 第二种 利用uni.setStorageSync和uni.getStorageSync进行数据的缓存和取出以及最后对缓存数据的销毁

```
1-上级页面（对需要传递的数据进行数据缓存）注意：缓存的数据必须为字符串形式，对象或数组需要先进行转换
let item = JSON.stringify(this.userInfo[e])
uni.setStorageSync('userInfo',item)

2-下级页面（对缓存的数据进行取出并且进行销毁）
onLoad() {
	console.log("进入了编辑地址页面");
	var data = uni.getStorageSync('userInfo')//取出缓存数据
	var res = JSON.parse(data)
	this.userInfo = res
	uni.removeStorageSync('userInfo')
	var data = uni.getStorageSync('userInfo')//销毁缓存数据
	console.log(data);
}
```

### 第三种 利用uni.$emit 和 uni.$on进行跨页面传值

```
1-传递值页面（使用uni.$emit传递值的变量名和变量值）
uni.$emit('addUserInfo',this.userInfo)

2-接收值页面（在onload周期中使用uni.$on接收已经传递的参数）
uni.$on('addUserInfo',res=>{
	console.log(res);
})

注意：uni.$emit 和 uni.$on属于全局跨页面传参，在接收值页面要在onUnload周期添加移除监听时间
onUnload() {
	uni.$off('addUserInfo')
}
```

## 三 参考

* [CSDN-uniApp 面试题](https://blog.csdn.net/admin12345671/article/details/130178630)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/uni-app-interview-md4-ifdef.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/uni-app-interview-md4-ifdef-sample.png