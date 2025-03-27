---
title: Android开发之——Android代码混淆(2)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 混淆
  - 安全
  - 工具
abbrlink: 397aa8da
date: 2017-11-16 16:36:01
---

## 一 概述

上一篇介绍了混淆的概念，Proguard的作用和原理。这篇简单介绍下ProGuard的配置和使用。

* 配置ProGuard
* 文件介绍
* 实例

<!--more-->

## 二 配置ProGuard
依次 Open Module Setting->App->Build Type(debug或release模式)->Minify Enable 中设置true 打开ProGuard，Minify Enalbe 为false关闭ProGuard
<!--more-->
![mini enable][1]
本例中debug和release都设置为true，配置如下图
![buildtype][2]

## 三文件介绍

执行 Build->Rebuild Project 待项目编译完成，app->build->outputs->mapping->debug或release下分别生成4个文件；
![mapping][3]    

- mapping.txt:  
表示混淆前后代码的对照表，这个文件非常重要。如果你的代码混淆后会产生bug的话，log提示中是混淆后的代码，希望定位到源代码的话就可以根据mapping.txt反推；
每次发布都要保留它方便该版本出现问题时调出日志进行排查，它可以根据版本号或是发布时间命名来保存或是放进代码版本控制中  
- dump.txt:  
 描述apk内所有class文件的内部结构。  
- seeds.txt:  
列出了没有被混淆的类和成员。  
- usage.txt:  
列出了源代码中被删除在apk中不存在的代码。  

## 四 实例  

	-ignorewarnings                     # 忽略警告，避免打包时某些警告出现  
	-optimizationpasses 5               # 指定代码的压缩级别  
	-dontusemixedcaseclassnames         # 是否使用大小写混合  
	-dontskipnonpubliclibraryclasses    # 是否混淆第三方jar  
	-dontpreverify                      # 混淆时是否做预校验  
	-verbose                            # 混淆时是否记录日志  
	-optimizations !code/simplification/arithmetic,!field/*,!class/merging/*        # 混淆时所采用的算法  
	  
	-libraryjars   libs/treecore.jar  
	  
	-dontwarn android.support.v4.**     #缺省proguard 会检查每一个引用是否正确，但是第三方库里面往往有些不会用到的类，没有正确引用。如果不配置的话，系统就会报错。  
	-dontwarn android.os.**  
	-keep class android.support.v4.** { *; }        # 保持哪些类不被混淆  
	-keep class com.baidu.** { *; }    
	-keep class vi.com.gdi.bgl.android.**{*;}  
	-keep class android.os.**{*;}  
	  
	-keep interface android.support.v4.app.** { *; }    
	-keep public class * extends android.support.v4.**    
	-keep public class * extends android.app.Fragment  
	  
	-keep public class * extends android.app.Activity  
	-keep public class * extends android.app.Application  
	-keep public class * extends android.app.Service  
	-keep public class * extends android.content.BroadcastReceiver  
	-keep public class * extends android.content.ContentProvider  
	-keep public class * extends android.support.v4.widget  
	-keep public class * extends com.sqlcrypt.database  
	-keep public class * extends com.sqlcrypt.database.sqlite  
	-keep public class * extends com.treecore.**  
	-keep public class * extends de.greenrobot.dao.**  
	
	-keepclasseswithmembernames class * {       # 保持 native 方法不被混淆  
		 native <methods>;  
	}  
	  
	-keepclasseswithmembers class * {            # 保持自定义控件类不被混淆  
	public <init>(android.content.Context, android.util.AttributeSet);  
	}  
	  
	-keepclasseswithmembers class * {            # 保持自定义控件类不被混淆  
	public <init>(android.content.Context, android.util.AttributeSet, int);  
	}  
	  
	-keepclassmembers class * extends android.app.Activity { //保持类成员  
	 public void *(android.view.View);  
	}  
	  
	-keepclassmembers enum * {                  # 保持枚举 enum 类不被混淆  
	public static **[] values();  
	public static ** valueOf(java.lang.String);  
	}  
	  
	-keep class * implements android.os.Parcelable {    # 保持 Parcelable 不被混淆  
	 public static final android.os.Parcelable$Creator *;  
	}  
	  
	-keep class MyClass;                              # 保持自己定义的类不被混淆  

## 五 参考：  
[Android proguard 详解][4]  
[Android 代码混淆(一)][5]  
[Android 代码混淆(二)][6]




[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-proguard-build-minify-enable.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-proguard-buidldtype.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-proguard-mapping.png
[4]: http://blog.csdn.net/dai_zhenliang/article/details/42423575
[5]: https://segmentfault.com/a/1190000006668933
[6]: https://segmentfault.com/a/1190000006679021
