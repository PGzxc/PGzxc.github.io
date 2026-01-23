---
title: Android开发之——美团Robus热修复
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - 热修复
abbrlink: '86500645'
date: 2017-12-26 21:10:23
---
介绍热修复之前，我们先看下InstantRun 
## 一 InstantRun
不得不说InstantRun真是个好东西。目前主流的热修复框架都有或多或少的参考InstantRun的某些技术点。
我们知道，InstantRun对应三种更新机制：

- 冷插拔：我们称之为重启更新机制
- 温插拔：我们称之为重启Activity更新机制，在重启的时候替换Application的classLoader来加载dex
- 热插拔：我们称之为热更新机制是新建classLoader来加载dex

Robus，其热修复的关键技术点就是采用了InstantRun中的热更新机制，对应于多ClassLoader的动态加载方案，即一个dex文件对应一个新建ClassLoader
<!--more-->
## 二 优势
- 支持Android2.3-7.x版本
- 高兼容性，高稳定性，修复成功率高达三个九
- 补丁下发立即生效，不需要重新启动
- 支持方法级别的修复，包括静态方法
- 支持增加方法和类
- 支持ProGuard的混淆、内联、优化等操作

## 三 流程

### 3.1 集成流程图

我们先看集成流程图
![robust-fix][1]
美团热修复官方地址：[Robust][0]

### 3.2 集成过程
#### 把项目下载到本地并解压  
![][6]
#### 在整个项目的build.gradle加入classpath

```
classpath 'com.meituan.robust:gradle-plugin:0.4.72'
classpath 'com.meituan.robust:auto-patch-plugin:0.4.72'
```

![][2]
#### 在App的build.gradle，加入如下依赖

```
compile 'com.meituan.robust:robust:0.4.72'
```
![][3]

同时添加：

```
//apply plugin: 'auto-patch-plugin'
apply plugin: 'robust'
```

#### 项目发release版本,把签名文件在gradle中写好
![][4]
### 开启proguard混淆开关，robust做了混淆文件和代码的映射 
![][5]
#### 将robust项目源码中的app/src/robust.xml拷贝到自己项目下的app/src路径下 
![][7]
#### 打开robust.xml，将要修改的包名换成自己的包名
![][8]
#### 执行gradle命令
```
./gradlew clean  assembleRelease --stacktrace --no-daemon
```
![][9]
#### 在app下新建robust目录，并将app/build/outputs文件夹下会生成mapping.txt,methodsMap.robust文件，将他们拷贝到app/robust文件夹中保存
![][10]
methodMap.robust，该文件在打补丁的时候用来区别到底哪些方法需要被修复，所以有它才能打补丁。而上文所说的还有mapping.txt文件，该文件列出了原始的类，方法和字段名与混淆后代码间的映射。   

### 3.2 修改
#### 先看下热修复之前的情况
![][11]
功能很简单，第二个按钮跳转到第二个Activity。第一个按钮加载一会儿生成的patch文件。跳转代码如下 

```
findViewById(R.id.btn_load_patch).setOnClickListener(view->
                new PatchExecutor(this,new PatchManipulateImp(),new RobustCallBackSample()).start());
findViewById(R.id.btn_start_second).setOnClickListener(view->startActivity(new Intent(this, SecondActivity.class)));
```

其中，PatchManipulateImp和RobustCallBackSample都是从解压文件拷贝过来的。
![][12]
这里一定要注意: 
PatchesInfoImpl类中的setPatchesInfoImplClassFullName包名要和robust.xml中<package>节点下的包名对应

```
patch.setPatchesInfoImplClassFullName("com.example.robustsample.PatchesInfoImpl");
```

#### 修改第二个Activity中代码
修改前 
![][13]
修改后  
![][14]
### 3.3 生成Patch文件

#### 在app的build.gradle中，注释掉robust插件，打开auto-patch-plugin插件
![][15]
#### 再一次执行打包命令

```
gradlew clean  assembleRelease --stacktrace --no-daemon
```
![][16]
看到build false，但是patch已经成功，patch文件的路径为：  
![][17]

#### 在sd卡下新建robust文件夹，用于存放patch补丁文件
![][18]
#### 执行push命令，将本地patch放入手机新建的robust文件夹内

```
adb push app/build/outputs/robust/patch.jar /sdcard/robust
```
![][19]
![][20]
当然也可以拖动到Download，再移动到指定目录下  
### 3.4 结果
#### 最后一步，点击第一个按钮，再点击跳转到第二个按钮。先看效果，显示的内容会发生变化   
![][21]   
其中点击加载patch文件时，返回true，表示已修复成功
![][22]


## 四 参考：  
[robustDemo][23]   
[RobustSample][24]


[0]: https://github.com/Meituan-Dianping/Robust
[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/robust-fix.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/robust-build-classpath.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/robust-app-compile.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/robust-sign-config.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/robust-minify.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/robust-app.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/robust-xml.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/robust-package.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/robust-gradlew-clean.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/new-robust.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/robust-before.gif
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/robust-coppy.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/robust-modity-before.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/robust-modity-after.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/app-plug-patch.png
[16]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/robust-patch-succes.png
[17]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/robust-patch-jar.png
[18]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/robust-sdcard-robust.png
[19]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/adb-push.png
[20]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/patch-already.png
[21]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/robust-hot-after.gif
[22]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/click-patch.png
[23]: https://github.com/xingege662/robustDemo
[24]: https://github.com/PGzxc/RobustSample
