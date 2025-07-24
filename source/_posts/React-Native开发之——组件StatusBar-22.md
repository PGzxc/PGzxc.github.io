---
title: React Native开发之——组件StatusBar(22)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件StatusBar
abbrlink: f52d4829
date: 2018-03-16 10:56:14
---
## 一 概述
```
StatusBar 是 React Native 用来设置并动态改变设备的状态栏显示特性。
可以通过设置StatusBar的样式实现不同页面状态栏的显示。  

虽然 StatusBar 是跨平台组件，但其中有些属性是通用的，而有些则是 iOS 或 Android 独有的。
所以我们开发时要做好适配。
```

<!--more-->

## 二 StatusBar属性

### 2.1  通用属性

```
1、animated 
- 设置当状态栏的状态发生变化时，是否需要加入动画。
- 动画支持 backgroundColor、barStyle 和 hidden 属性的变化。

2、hidden 
设置状态栏是否隐藏。
```

### 2.2 iOS属性
```
1、barStyle
用于设置状态栏文字的颜色，其值是枚举类型: 

- default：黑色文字（默认） => dark-content
- light-content：白色文字

2、networkActivityIndicatorVisible
设定网络活动指示器(就是那个菊花)是否显示在状态栏

3、showHideTransition
通过 hidden 属性来显示或隐藏状态栏时所使用的动画效果，有两种选择：fade（默认值）、slide
```

### 2.3 仅支持Android的属性
```
1、backgroundColor 
Android 设备上状态栏的背景颜色
<StatusBar backgroundColor={'blue'} />

2、translucent
设置状态栏是否为透明，当状态栏的值为 true 的时候，应用将会在状态栏下面进行绘制显示。
这样在 Android 平台上面就是沉浸式的效果，可以达到 Android 和 iOS 应用显示效果的一致性。
该值常常同配置半透明效果的状态栏颜色一起使用。

3、StatusBar.currentHeight 
React Native 在 Android 平台为 StatusBar 组件提供了一个静态常量 currentHeight，
我们可以通过读取这个常量来得到 Android 手机状态栏的高度。
```

## 三 不同平台下状态栏的处理
### 3.1 Android 手机状态栏 

```
- 当状态栏呈现在 Andorid 手机屏幕顶部时，它会占用顶部这个空间，我们只能使用剩下的屏幕空间。
也就是说如果从第 0 行开始放置组件时，组件会紧贴着状态栏的下边沿显示。 

- 要想知道实际可用的屏幕高度，可以通过手机屏幕的高度减去状态栏高度得到。
```

### 3.2 iOS 手机状态栏 

```
- 在 iOS 平台上，取得的屏幕高度就是实际可使用的高度。 
- 如果从第 0 行开始排列组件时，组件会紧贴着手机屏幕的最上沿显示。如果状态栏没有被隐藏，它将覆盖在第 0 行组件的上方。
- 如果不想设置状态栏隐藏，则应当空出状态栏的显示区域。但可以为这个区域设置背景色，以使整个界面风格统一。
```

## 四 示例

### 4.1 实例代码 

	export default class App extends Component<Props> 
	{
		// 构造
	  	constructor(props) 
		{
	    	super(props);
	    	// 初始状态
	    	this.state = 
			{
	        	hidden:false
	    	};
	  	}
	render() 
	{
		return (
	  	<View style={styles.container}>
	      <StatusBar
	          animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
	          hidden={this.state.hidden}  //是否隐藏状态栏。
	          backgroundColor={'green'} //状态栏的背景色
	          translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
	          barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')
	      />
	    <TouchableOpacity style={{margin:30}} underlayColor={'#ccc'} onPress={this.onPress.bind(this,this.state.hidden)}>
	        <Text>显示隐藏状态栏</Text>
	    </TouchableOpacity>
	  </View>
	);
	}
		onPress(hidden)
		{
	      this.setState({hidden:!hidden})
		}
	}

### 4.2 效果图 
![][1]  

## 五 参考 

参考：[Github下载地址][2]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-statusbar.gif
[2]: https://github.com/PGzxc/RN_StatusBar


