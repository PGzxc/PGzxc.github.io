---
title: Android开发之——App构建流程分析
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - app构建
abbrlink: 297b6664
date: 2017-11-16 22:30:15
---
转载声明：原文出处[Android App 构建流程分析][1]
## 一 序言 
我们平时在Android studio中点击run按钮，就能把代码编译成一个app文件并安装到手机上。那么这么过程中具体发生了什么？我们是怎么把代码和资源文件打包成一个app文件，并安装到手机上的呢？今天就详细分析一下这个流程。  
<!--more-->

## 二 APP构建基本流程 

### 2.1 简易构建流程
![简易流程][2]  

上图的Android官方提供的打包简略流程图。清晰地展示了一个Android Project 经过编译和打包后生成的apk文件，然后在经过签名，就可以安装得到设备上；  
我们将一个实际的apk文件后缀名改为zip并解压后，得到的内容如下：  
![解压apk][3]  
和上图的描述一致。apk包内容包括：    

- classes.dex 
- resources.arsc
- assets
- res
- AndroidMainfest.xml  
- res中图片，assets文件和raw文件下内容保持原样，res中其他xml文件内容均转化为二进制形式；
- res中的文件会被映射到R.java文件中，访问的时候直接使用资源ID即可即R.id.filename；assets文件夹下的文件不会被映射到R.java中，访问的时候需要AssetManager类；  

### 2.2 详细构建流程  
![详细构建1][4]  
或  
![详细构建2][5]   

详细流程：  

- 第一步：aapt打包资源文件，生成R.java和编译后的资源(二进制文件)
	- 检查AndroidManifest.xml，主要做一些检查并使用parsePackage初始化并设置一些attribute，比如package，miniSdkVersion，uses-sdk;
	- 添加被引用资源包；使用table.addincludeResources(bundle,assets)添加被引用资源包，比如系统的那些android:命名空间下的资源。
	- 收集资源文件，处理overlay(重叠包，如果指定的重叠包有何当前编译宝重名的资源，则使用重叠包的)；
	- 将收集到的资源文件加载到资源表(Resource Table);对res目录下的各个资源子目录进行处理，函数为makeFileResources:makeFileResources会对资源文件名做合法性检查，并将其添加到ResourceTable内；
	- 编译values资源并添加到资源表；上一步添加过程中，其实并没有对values资源进行处理，因为values比较特殊，需要经过编译之后，才能添加到资源表中。
	- 给bag资源分配id，在继续编译其他资源之前，我们需要先给bag资源(attrs，比如orientation这种属性的取值范围定义的子元素)分配id，因为其他资源可能会对他们有引用；
	- 编译xml资源文件；最后我们终于可以编译xml文件了，因为我们已经为它准备好了一切可能引用到的东西(value，drawable)进行编译，内部流程会对layout,anims,animators等逐一调用ResourceTable.cpp进行编译，内部流程又可以分为：解析xml文件，赋予属性名称资源id，解析属性值，扁平化二进制文件；
	- 编译AndroidMainfest.xml文件；拿到AndroidMainfest.xml文件，清空原来的数据，重新解析；处理package name 重载，把各种相对路径的名字改为绝对路径，编译mainfest.xml文件，生成最终资源表；
	- 生成R.java文件；

生成我们解压后看到的那个resources.arsc文件；  

- 第二步：AIDL  
 aidl，全名Android Interface Definition Language，即Android 接口定义语言；  
  输入：aidl后缀的文件；  
  输出：可用于进程通信的C/S端java代码，位于build/generated/source/aidl;  

- 第三步：java源码编译  
我们有了R.java和aidl生成的java文件，再加上工程的源代码，现在可以使用javac进行正常的java编译生成class文件了。  
输入：java source的文件夹(另外还包括了build/generated下的：R.java，aidl生成的java文件以及BuildConfig.java);  
输出：对于gradle编译，可以在build/intermediates/classes里，看到输出的class文件。  
源码编译之后，我们可能还会对其进行代码的混淆，混淆的作用是增加反编译的难度，同时
也将一些代码的命名进行了缩短，减少了代码的占用空间。混淆完成之后，会生成一个混淆前后的映射表，这个是用来反映我们的应用执行的时候的一些堆栈信息，可以将混淆后的信息转化为我们混淆前实际代码中的内容；  
- 第四步：dex   
调用dx.bat将所有的class文件(上一步生成的以及第三方库的)转化为class文件，dx会将class转化为Dalvik字节码，生成常量池，消除冗余数据等；  
- 第五步：apkbuilder  
打包生成apk文件。旧的apkbuilder脚本已经废除，现在都已经通过build.jar的ApkBuilder类进行打包了。  
输入：我们之前生成的包含resources.arcs的.ap_文件，上一步生成的dex文件以及其他资源如jni，jar包内的资源；  
 大致步骤为 
 以包含resources.arcs的.ap_文件为基础，new一个ApkBuilder，设置debugMode 
 apkBuilder.addZipFile(f);  
 apkBuilder.addSourceFolder(f);
 apkBuilder.addResourcesFromJar(f);  
 apkBuilder.addNativeLibraries(nativeFileList);  
 apkBuilder.seaApk();//关闭apk文件  
 generateDependencyFile(depFile,inputPaths,outputFile.getAbsoulutePath());  
- 第六步：Jarsigner  
 对apk文件进行签名。APK需要签名才能在设备上运行安装；很多时候我们在逆向改完后，会因为没有签名文件导致最后的apk无法正常使用，又细分为本地验证和服务器验证；  
- 第七步：zipalign    
调用buildtoolszipalign，对签名后的apk文件进行对齐处理，使apk中所有资源文件距离文件起始偏移为4字节的整数倍，从而在通过内存映射访问apk文件时会更快。同时也减少了在设备上运行时的内存消耗。  

这样我们的最终apk就生成了！

参考文档：   
[Android App 构建流程分析][1]  
[APK打包安装过程][6]














[1]: http://www.jianshu.com/p/4962634901fb
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-build-simple.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-apk-component.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-build-comple1.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/android-build-comple2.png
[6]: https://segmentfault.com/a/1190000004916563

