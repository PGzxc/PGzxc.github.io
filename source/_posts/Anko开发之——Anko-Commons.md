---
title: Anko开发之——Anko Commons
categories:
  - 开发
  - B-高级语言
  - Anko
tags:
  - Anko Commons
abbrlink: dc8aeb00
date: 2018-03-13 15:56:32
---
# 前言 
最近的事情有点多，继上一篇[Anko初探][1]有一段时间了，本文将继续更新用Anko开发Android相关教程；关于Anko网上的资源有限，大部分是查看官网说明一点点摸索的，有需求的请查看官方地址：[Anko][2]，作者水平有限，难免有疏漏之处。欢迎留言探讨。    

本文将介绍Anko的第一部分——Anko组件，分以下四部分讲解： 

- Intents
- Dialogs and toasts
- Logging
- Resources and dimensions

<!--more-->  

# Anko组件
## 环境配置
### 在项目下的build.gradle中添加anko和kotlin支持  

	buildscript 
	{
    	ext.kotlin_version = '1.2.20'
    	ext.anko_version='0.10.4'
    	repositories 
		{
        	google()
        	jcenter()
    	}
    	dependencies 
		{
        	classpath 'com.android.tools.build:gradle:3.0.1'
        	classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"

        	// NOTE: Do not place your application dependencies here; they belong
        	// in the individual module build.gradle files
    	}
	}
	allprojects 
	{
    	repositories 
		{
        	google()
        	jcenter()
    	}
	}

	task clean(type: Delete) 
	{
    	delete rootProject.buildDir
	}
### 在app的build.gradle下添加模块类库 

	//log
    compile "org.jetbrains.anko:anko:$anko_version"
    compile "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    // Anko Commons
    compile "org.jetbrains.anko:anko-commons:$anko_version"
    compile "org.jetbrains.anko:anko-design:$anko_version" // For SnackBars
    // Anko Layouts
    compile "org.jetbrains.anko:anko-sdk25:$anko_version" // sdk15, sdk19, sdk21, sdk23 are also available
    compile "org.jetbrains.anko:anko-appcompat-v7:$anko_version"
    // Coroutine listeners for Anko Layouts
    compile "org.jetbrains.anko:anko-sdk25-coroutines:$anko_version"
    compile "org.jetbrains.anko:anko-appcompat-v7-coroutines:$anko_version"
    // Anko SQLite
    compile "org.jetbrains.anko:anko-sqlite:$anko_version"
    //Anko Coroutines
    compile "org.jetbrains.anko:anko-coroutines:$anko_version"

### 添加anko-support插件 
![][3] 

## Anko组件——Intents
### 检查依赖
使用本组件需要添加依赖支持，请检查环境配置中的步骤2，是否有下面的依赖库

	compile "org.jetbrains.anko:anko-commons:$anko_version"

### Intent一般开发

#### 使用Intent跳转和传值 
    startActivity<SecondActivity>("id" to "5")

#### 接收传值 
    text ="通过传值获得内容为:"+ui.owner.intent.extras.get("id")
#### 效果 
![][4]  
### Intent简易使用 
使用anko帮我们封装好的intent，简化开发步骤
#### 简易开发介绍 

- Make a call(打电话): makeCall(number) without tel:
- Send a text(发短信):sendSMS(number, [text]) without sms:
- Browse the web(浏览网页):browse(url)
- Share some text(分享文字):share(text, [subject])
- Send a email(发邮件):email(email, [subject], [text])

#### 效果 
![][5]  

## Anko组件——Dialogs and toasts

### 检查依赖
使用本组件需要添加依赖支持，请检查环境配置中的步骤2，是否有下面的依赖库  

	compile "org.jetbrains.anko:anko-commons:$anko_version"
    compile "org.jetbrains.anko:anko-design:$anko_version" // For SnackBars
### Dialogs and toasts
#### Toasts
	toast("Hi there!")
	toast(R.string.message)
	longToast("Wow, such duration")
#### SnackBars
使用时会有如下错误： 
 
	can't access class 'android.support.design.widget.Snackbar',check your module classpath for missing or conflicting dependencies

有知道原因的小伙伴可以私信或给我留言
#### Alerts(对话框)

	alert("Hi, I'm Roy", "Have you tried turning it off and on again?") 
	{
       yesButton { toast("Oh…") }
       noButton {}
     }.show()

#### Selectors(复选框)

	val countries = listOf("Russia", "USA", "Japan", "Australia")
	selector("Where are you from?", countries, { dialogInterface, i ->
    toast("So you're living in ${countries[i]}, right?")
	})
#### Progress(进度条)
	val dialog = progressDialog(message = "Please wait a bit…", title = "Fetching data"){
           	isIndeterminate=true
    	  }
    dialog.show()

### 效果图 
![][6]  

## Anko组件——Logging
日志组件，比较简单  
### 检查依赖
使用本组件需要添加依赖支持，请检查环境配置中的步骤2，是否有下面的依赖库
  
	compile "org.jetbrains.anko:anko-commons:$anko_version"

### 直接上效果图
![][7] 

## Anko组件——Resources and dimensions
### 检查依赖
使用本组件需要添加依赖支持，请检查环境配置中的步骤2，是否有下面的依赖库
  
	compile "org.jetbrains.anko:anko-commons:$anko_version"
### Resources and dimensions
#### Colors
![][8]  
#### Dimensions  
使用dp或sp标明属性的大小 
#### lparams
view后跟lparams对view的属性进行描述 

# 其他 
参考： [Github下载地址][11]


[1]: https://pgzxc.github.io/2017/11/27/Anko%E5%88%9D%E6%8E%A2/
[2]: https://github.com/Kotlin/anko
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/anko-support.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/anko-intents.gif
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/anko-intent-smart.gif
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/anko-dialog.gif
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/anko-debug.gif
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/anko-resource-color.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/anko-resource-dimens.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/anko-resource-lparams.png
[11]: https://github.com/PGzxc/AnkoDemo