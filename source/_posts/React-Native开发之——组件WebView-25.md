---
title: React Native开发之——组件WebView(25)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - 组件WebView
abbrlink: c5c23d10
date: 2018-03-21 10:41:06
---
## 一 概述
```
在开发Android的时候，一般我们会有一些加载网页的需求，或者执行一些JavaScript，
我们都知道在Android中实现这个功能的控件是WebView,
在ReactNative中也有实现此类需求额的组件，它的名字也是WebView。

那么今天的这篇文章就来详细说说在ReactNative WebView的使用。  
```

<!--more--> 


## 二 WebView 属性和方法

### 2.1 主要属性

```
1、source：在 WebView 中载入一段静态的 html 代码或是一个 url（还可以附带一些 header 选项）
2、automaticallyAdjustContentInsets：设置是否自动调整内容。格式：bool
3、contentInset：设置内容所占的尺寸大小。格式：{top:number,left:number,bottom:number,right:number}
4、injectJavaScript：当网页加载之前注入一段 js 代码。其值是字符串形式。
5、startInLoadingState：是否开启页面加载的状态，其值为 true 或者 false。
6、bounces（仅iOS）：回弹特性。默认为 true。如果设置为 false，则内容拉到底部或者头部都不回弹。
7、scalesPageToFit（仅iOS）：用于设置网页是否缩放自适应到整个屏幕视图，以及用户是否可以改变缩放页面。
8、scrollEnabled（仅iOS）：用于设置是否开启页面滚动。
9、domStorageEnabled（仅Android）：用于控制是否开启 DOM Storage（存储）。
10、javaScriptEnabled（仅Android）：是否开启 JavaScript，在 iOS 中的 WebView 是默认开启的。
```

### 2.2 主要方法

```
1、onNavigationStateChange：当导航状态发生变化的时候调用。
2、onLoadStart：当网页开始加载的时候调用。
3、onError：当网页加载失败的时候调用。
4、onLoad：当网页加载结束的时候调用。
5、onLoadEnd：当网页加载结束调用，不管是成功还是失败。
6、renderLoading：WebView组件正在渲染页面时触发的函数，只有 startInLoadingState 为 true 时该函数才起作用。
7、renderError：监听渲染页面出错的函数。
8、onShouldStartLoadWithRequest（仅iOS）：
该方法允许拦截 WebView 加载的 URL 地址，进行自定义处理。
该方法通过返回 true 或者 falase 来决定是否继续加载该拦截到请求。
```

## 三 示例 

### 3.1 代码实例 

```
import React, { Component } from "react";
import { StyleSheet, View, Dimensions, WebView } from "react-native";
//获取设备的宽度和高度
var { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
type Props = {};
export default class App extends Component<Props> {
  render() {
    return;
    <View style={styles.container}>
      <WebView
        source={{ uri: "http://www.baidu.com", method: "POST" }}
        style={{ width: deviceWidth, height: deviceHeight }}
        onLoadEnd={this.onLoadEnd}
      ></WebView>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
```

### 3.2 效果
![][1]  

## 参考
参考：[Github下载][2] 

[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-webview.png
[2]: https://github.com/PGzxc/RN_WebView/