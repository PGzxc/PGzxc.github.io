---
title: Android开发之——打包发布及其优化
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 混淆
  - 打包
abbrlink: aed8c2b0
date: 2018-09-03 23:05:04
---
# 前言
项目开发中，不可避免会使用到Google官方类库或第三方类库，如何管理维护使用起来更加有效？打包发布时，如何混淆，规则是什么？混淆后的包体积更小、不会被破解；如何打渠道包等等；本文将通过实例讲解，为你一一解答。


<!--more-->

# 打包实战
## 类库引入
### 类库引用说明
在使用类库引用时，可能会用到一下几个关键字：

1. provider
2. compile 
3. implementation 
4. api
5. testImplementation
6. androidTestImplementation
7. testcompile
8. androidtestcompile


### 一般类库引用
	
![][1]
### 优化类库引用

1. 使用config.gradle文件配置第三方和本地库
	
	![][2] 
2. 在项目根目录的build.gradle中导入
	
	![][3]  
3. 在app目录下的build.gradle中定义并使用
	
	![][4]  
	![][5] 

## 依赖冲突
引用第三方提供的依赖和类库，如果含有相同依赖的类库被我们引用时，而他们的版本又不相同，就有可能会导致一系列问题和异常。关于依赖冲突的问题，之前已经讲过，这里简要阐述。  

### 问题

![][6]  
### 解决方案

![][7]

## 混淆
### 如何开启混淆
	
	release
		{
            minifyEnabled true//是否启动混淆 ture:打开   false:关闭
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
### 混淆中常用关键字
1. dontwarn
2. keep
3. keepnames
4. keepclassmembers
5. keepclassmembernames

### 混淆后文件
1. dump.txt
2. mapping.txt
3. seeds.txt
4. usage.txt
5. resources.txt

## 混淆(第三方类库)
本节主要讲述android-proguard-snippets的使用    
1. 将需要混淆的类库文件建立一个对应的.pro文件    
	
	![][8]

2. 使用如下方法引入需要混淆的类库
	
	![][9]
## 签名
1.  生成签名文件
	
	依次执行：build->Generate Signed APK->填写签名信息->生成.jks签名文件
2. 要输入apk文件，必须有签名文件；按照如图所示，配置签名信息
	
	![][10]
3. 在app目录下的build.gradle中配置签名信息
	
	![][11] 
4. 签名信息配置在gradle.properties中
	
	![][12]
5. 签名信息存储在config.gradle中
	
	![][13] 

## 多渠道包
1.  配置productFlavors

	productFlavors      
	{  
			xiaomi {}    
        	tencent { //腾讯}   
        	qihu360 { //360}   
    }          
    productFlavors.all 
	{   
        flavor -> flavor.manifestPlaceholders = [CHANNEL_VALUE: name]    
    }   
2. AndroidManifest.xml 配置CHANNEL_VALUE

	<meta-data android:name="CHANNEL" android:value="${CHANNEL_VALUE}" />
3. apk 生成规则
	
	![][14]  
4. mapping.xml生成规则(如umeng统计时会用到)
	
	![][15] 
5. 生成apk文件    
	
	![][16]


## 打包优化
主要介绍AndResGuard的使用，AndResGuard是腾讯开源的资源混淆工具。
1. 在项目根目录下的build.gradle中引用

	classpath 'com.tencent.mm:AndResGuard-gradle-plugin:1.2.14'

	![][17]

2. 将优化混淆规则放到and_res_guard.gradle文件夹中

	![][18]

3. 在app的build.gradle中引用and_res_guard.gradle文件

	![][19]
4. 在gadle构建任务下可以看到新生成的task任务

	![][20]  
5. 可以看到优化后的apk文件

	![][21]   
6. 使用反编译工具解压后可以看到
	
	![][22]






[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-dependencies-normal.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-dependencies-optimize.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-dependencies-optimize-build.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-dependencies-optimize-import.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-dependencies-optimize-use.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-depend-exception.gif
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-depend-configuration.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-proguard-files.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-proguard-use.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-sign.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-sign-buildgradle.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-sign-gradle-properties.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-sign-config-gradle.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-apk.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-mapping-xml.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-apk-release.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-andresguard-build-gradle.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-resguard-file.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-and-res-import.png
[20]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-andresguard-task.png
[21]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-apk-aligned.png
[22]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/package-analysis.png