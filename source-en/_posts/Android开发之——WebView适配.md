---
title: Android开发之——WebView适配
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - WebView
abbrlink: '36321e42'
date: 2019-03-03 13:22:23
---

## 前言
最近在做项目时发现，Android 6.0的平板在运行项目时，网页信息加载不出来(已设置addJavascriptInterface)。Android 6.0.1的平板可以正常显示。    
有问题平板的信息如下：  

![][1]

<!--more-->  

## 分析
在分析了：Android版本，网络等因素后，我怀疑是web浏览器的版本不兼容问题。      

### 如何查看Android手机Web浏览器的内核版本


## 如何查看手机浏览器的版本 

### 使用JavaScript函数

网上给出的较多的解答是使用``` javascript:alert(navigator.userAgent)```，参考了[如何查看android 内置浏览器内核版本][5]，但是没有测试成功。可能我的方法不正确，有成功的小伙伴可以告知我下。

### 使用Web浏览器的设置  

依次打开：浏览器——>设置——>关于——>浏览器标识(UA)    会弹出浏览器UA信息     

![][2]

### 通过WebView的方法获取
#### 布局配置文件信息
![][3] 
####  点击事件，获取webview的userAgentString    

	 webView.settings.userAgentString   

![][4]  

#### 显示效果  
![][5]

### 关于UA的知识补充
<table>
        <tr>
            <th>浏览器</th>
			<th>User-Agent</th>
		<tr>
		<tr>
            <th>Internet Explorer 6</th>
			<th>Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0; WOW64; Trident/4.0; SLCC1)</th>
		<tr>
		<tr>
            <th>Internet Explorer 10</th>
			<th>Mozilla/5.0 (MSIE 10.0; Windows NT 6.1; Trident/5.0)</th>
		<tr>
		<tr>
            <th>iPhone 6</th>
			<th>Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25</th>
		<tr>
		<tr>
            <th>Android KitKat</th>
			<th>Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36</th>
		<tr>
		<tr>
            <th>Windows Phone 8</th>
			<th>Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)</th>
		<tr>
		<tr>
            <th>Windows Firefox 33</th>
			<th>Mozilla/5.0 (Windows NT 6.1; WOW64; rv:33.0) Gecko/20120101 Firefox/33.0</th>
		<tr>
		<tr>
            <th>Opera 12.14</th>
			<th>Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14</th>
		<tr>
		<tr>
            <th>Mac Safari 7</th>
			<th>Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A</th>
		<tr>
<table>

## 浏览器过低的解决办法
### 给出升级提示
通过比较当前系统的userAgent和运行要求的最小userAgent，给出提示信息 

### 升级浏览器
通过GooglePlay商店，更新浏览器内核到最新版本。已达到满足程序运行的要求。  



## 参考

[如何查看android 内置浏览器内核版本][6]    
[有趣有历史的浏览器UA(user-agent)][7]
[浅谈Android 浏览器内核][8]


[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/emui-4_0.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/webview_user_agent.gif
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/webview-layout.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/webview-click-function.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/webview-userAgent.png


[6]: https://jingyan.baidu.com/article/ca2d939d4cd90ceb6c31ce22.html
[7]: https://blog.csdn.net/scholar_ii/article/details/80738194
[8]: https://blog.csdn.net/itluochen/article/details/53336460