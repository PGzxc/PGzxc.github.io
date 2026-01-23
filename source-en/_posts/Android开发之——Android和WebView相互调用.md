---
title: Android开发之——Android和WebView相互调用
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: '9e619260'
date: 2021-06-29 17:04:26
---
## 一 概述

当游戏页面使用html书写，并用WebView加载与android应用进行信息交互时

* 进入游戏时，把用户信息传递到webview(js调用android)
* 游戏结束后，将游戏的结果传递给andriod处理(android调用js)

<!--more-->

## 二 html页面

### 2.1 index.html

```
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>demo</title>
</head>
<body>
    <div id="js_content"></div>
    <button type="button" onclick="androidCallJs()">android调用js代码</button>
    <button type="button" onclick="androidCallJsWithArgs('js')">android调用js代码并传递参数</button>
    <button type="button" onclick="jsCallAndroid()">JS调用android代码</button>
    <button type="button" onclick="jsCallAndroidWithArgs('android')">JS调用android代码并传递参数</button>
    <script>
		//安卓调用js代码无参数
        function androidCallJs() {
            document.getElementById('js_content').innerHTML = 'hello js';
            Android.androidCallJs();
        }

       //安卓调用js代码带参数
        function androidCallJsWithArgs(name) {
            document.getElementById('js_content').innerHTML = `hello withArgs ${name}`;
            Android.androidCallJsWithArgs(name);
        }
		//js调用安卓代码无参数
		function jsCallAndroid(){
		    var jsCallAndroidResult=Android.jsCallAndroid();
			document.getElementById('js_content').innerHTML = `hello ${jsCallAndroidResult}`;
		}
		//js调用安卓代码有参数
		function jsCallAndroidWithArgs(name){
		    var jsCallAndroidWithArgsResult=Android.jsCallAndroidWithArgs(name);
			document.getElementById('js_content').innerHTML = `hello withArgs ${jsCallAndroidWithArgsResult}`;
		}

    </script>
</body>
</html>
```

### 2.2 页面路径

将index.html页面放到如下路径下

```
AndroidWebView\app\src\main\assets\www\index.html
```

WebViewManager根据传入的文件名(index)获取url路径

```
object WebViewManager {
    fun getWebUrl(name: String): String {
        return "file:///android_asset/www/${name}.html"
    }
}
```
## 三 WebView处理

### 3.1 页面中添加WebView

```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <WebView
        android:id="@+id/webview"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### 3.2 初始化WebView，并加载Url

```
webView = findViewById(R.id.webview)
var url = WebViewManager.getWebUrl("index");
webView.loadUrl(url);
```

### 3.3 启用 JavaScript

JavaScript 在 `WebView` 中默认处于停用状态。您可以通过附加到 `WebView` 的 `WebSettings` 启用 JavaScript。您也可以使用 `getSettings()` 检索 `WebSettings`，然后使用 `setJavaScriptEnabled()` 启用 JavaScript

```
webView.settings.javaScriptEnabled = true
```

## 四 android和WebView相互调用

### 4.1 JavascriptInterface回调类为当前Activity

#### 4.1.1 WebView的addJavascriptInterface中Object为当前Activity

```
webView.addJavascriptInterface(this, "Android")
```

* this：代表当前Activity
* "Android"：是固定写法

#### 4.1.2 当前Activity中实现js中定义的方法

```
    /**
     * @description：android调用js无参函数
     */
    @JavascriptInterface
    fun androidCallJs() {
        Toast.makeText(this, "androidCallJs", Toast.LENGTH_LONG).show()
    }
    /**
     * @description：android调用js带参函数
     */
    @JavascriptInterface
    fun androidCallJsWithArgs(name: String) {
        Toast.makeText(this, "androidCallJsWithArgs:$name", Toast.LENGTH_LONG).show()
    }

    /**
     * @description：js调用android无参函数
     */
    @JavascriptInterface
    fun jsCallAndroid(): String {
        return "jsCallAndroid"
    }
    /**
     * @description：js调用android带参函数
     */
    @JavascriptInterface
    fun jsCallAndroidWithArgs(name: String): String {
        return "jsCallAndroidWithArgs=$name"
    }
```

#### 4.1.3 JS中相应的方法调用Android.JavascriptInterface对应的方法

```
 function androidCallJs() {
      Android.androidCallJs();
  }
```

点击JS中的第一个按钮，调用` androidCallJs();`方法，执行`Android.androidCallJs();`，会回调android Activity中相应的androidCallJs()方法

### 4.2 将JS中的方法放到单独的类中实现(WebAppInterface)

#### 4.2.1 定义WebAppInterface

```
class WebAppInterface(private val mContext: Context) {

    /**
     * @description：android调用js无参函数
     */
    @JavascriptInterface
    fun androidCallJs() {
        Toast.makeText(mContext, "androidCallJs", Toast.LENGTH_LONG).show()
    }

    /**
     * @description：android调用js带参函数
     */
    @JavascriptInterface
    fun androidCallJsWithArgs(name: String) {
        Toast.makeText(mContext, "androidCallJsWithArgs:$name", Toast.LENGTH_LONG).show()
    }

    /**
     * @description：js调用android无参函数
     */
    @JavascriptInterface
    fun jsCallAndroid(): String {
        return "jsCallAndroid"
    }

    /**
     * @description：js调用android带参函数
     */
    @JavascriptInterface
    fun jsCallAndroidWithArgs(name: String): String {
        return "jsCallAndroidWithArgs=$name"
    }
}
```

#### 4.2.2 WebView设置JS接口监听

```
webView.addJavascriptInterface(WebAppInterface(this), "Android")
```

### 4.3 效果图
![][1]
## 五 参考
* [Google官网-在 WebView 中编译 Web 应用](https://developer.android.google.cn/guide/webapps/webview#kotlin)
* [源码](https://download.csdn.net/download/Calvin_zhou/19895094)


[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-webview-javaScriptEnabled.gif


