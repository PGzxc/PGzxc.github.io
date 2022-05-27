---
title: React Native开发之——组件DrawerLayoutAndroid
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件DrawerLayoutAndroid
abbrlink: 6d70d8b3
date: 2018-03-22 23:42:18
---
# 前言 
封装了平台DrawerLayout（仅限安卓平台）的React组件。抽屉（通常用于导航切换）是通过renderNavigationView方法渲染的，并且DrawerLayoutAndroid的直接子视图会成为主视图（用于放置你的内容）。导航视图一开始在屏幕上并不可见，不过可以从drawerPosition指定的窗口侧面拖拽出来，并且抽屉的宽度可以使用drawerWidth属性来指定。(借鉴于React Native中文官网)  

<!--more-->

# 组件DrawerLayoutAndroid
## DrawerLayoutAndroid属性 

### drawerPosition enum(DrawerConsts.DrawerPosition.Left, DrawerConsts.DrawerPosition.Right)

指定 drawer 将从屏幕的一侧滑动。
### drawerWidth number
指定 drawer 的宽度，即从窗口的边缘拉到视图更精确的宽度。
### keyboardDismissMode enum('none', "on-drag")
确定键盘是否响应拖动被驳回。

- 'none' (默认值), 拖动不影响键盘。
- 'on-drag', 拖动开始，键盘被驳回。

### onDrawerClose 函数
导航视图关闭时调用函数。
### onDrawerOpen 函数
导航视图打开时调用函数。
### onDrawerSlide 函数
与导航视图交互时调用函数。
### onDrawerStateChanged 函数
当 Drawer 状态发生变化时调用函数，drawer 有 3 种状态:

- idle, 表示与导航视图没有交互
- dragging,表示目前有与导航视图的交互 
- settling, 表示有与导航视图的交互，并且导航视图正在的关闭或打开。

### renderNavigationView 函数
导航图将被渲染到屏幕的一侧，并且可以拉出。

## 实例代码 

	import React, {Component} from 'react';
	import 
	{
    	StyleSheet,
    	Text,
    	View,
    	DrawerLayoutAndroid
	} from 'react-native';

	type Props = {};
	export default class App extends Component<Props> 
	{
    	render() 
		{
        	var navigationView = 
			(
            	<View style={{flex: 1, backgroundColor: '#ff0'}}>
                	<Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
            	</View>
        	);
        	return 
			(
                <DrawerLayoutAndroid
                    drawerWidth={300}
                    drawerPosition={DrawerLayoutAndroid.positions.left}
                    renderNavigationView={() => navigationView}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
                        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
                    </View>
                </DrawerLayoutAndroid>
        	);
    	}
	}
## 效果图 
![][1]  
# 其他 
参考：[Github下载][2]

[1]: https://fastly.jsdelivr.net/gh/PGzxc/CDN@master/blog-image/rn-drawerLayoutandroid.gif
[2]: https://github.com/PGzxc/RN_DrawerLayoutAndroid

