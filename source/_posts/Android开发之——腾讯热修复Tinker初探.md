---
title: Android开发之——腾讯热修复Tinker初探
date: 2017-12-27 09:38:14
categories: [开发,移动开发,Android,第三方库]
tags: [热修复]
---
热补丁修复框架，极大的方便了开发者热修复自己线上App的出现的bug和漏洞。之前已经尝试了阿里热修复SopHix和美团热修复Robust，现在尝试集成腾讯的热修复Tinker。  
<!--more-->

# 下载Tinker
Tinker官方地址： [https://github.com/Tencent/tinker][1]
## 解压到本地
![][2]
本次所使用的为tinker-sample-android
## 将tinker-sample-android导入androiid studio
![][3]   
导入后，build项目时会出现一系列问题，下文将讲述如何解决这些问题
# Tinker集成时问题
Tinker导入项目后，不能直接运行，需要稍作修改，下面的本人集成过程中出现的问题，如果你遇到的问题与我不同，欢迎留言。
## tinkerId is not set!!!
### 问题
![][4]
### 解决
在app的build.gradle中搜索tinkerId，并将tinkerId=getTinkerIdValue()修改为tinkerId="TinkerSample"(内容可以是其他)
![][5]
## Tinker does not support instant run mode   
### 问题  
![][6]
### 解决
依次打开File->setting->Build,Execution,Deployment->Instant Run，将Enable前的复选框去掉，并同步一下
![][7]
# 集成步骤
## 生成一个未修改之前的apk文件
- 点击右侧的Gradle，在展开的Gradle projects中选择app，并依次展开Tasks->build->assembleDebug   
![][8]
- 在assembleDebug上右键运行    
![][9]
- 在app/build/barApk下可以看到生成的apk文件    
![][10]
- 将此apk运行到手机上   
![][11]
## 修改代码或布局  
### 在主项目中新增一个按钮
![][12]
## 生成patch
### 在app下的build.gradle中配置如下  
![][13]
### gradle里面执行下tinkerpatchdebug
- 点击Gradle，依次展开tiner-sample-android->Task->tinker，选择tinkerPatchDebug    
![][14]
- 右键运行    
![][15]
- 在app/build/outputs/tinkerPatch下可以看到patch补丁    
![][16]
- 将patch补丁包放到手机根目录下   
![][17]

## 修复
### 点击load patch
![][18]
### 点击Kill self并重启
新下的按钮是新增的，修复已生效     
![][19]

参考：  
[tinker-sample-android][20]


[1]: https://github.com/Tencent/tinker
[2]: http://bolo-imgs.pgzxc.com/tinker-unzip.png
[3]: http://bolo-imgs.pgzxc.com/tinker-sample.png
[4]: http://bolo-imgs.pgzxc.com/tinker-not-set.png
[5]: http://bolo-imgs.pgzxc.com/tinker-id.png
[6]: http://bolo-imgs.pgzxc.com/tinker-instant.png
[7]: http://bolo-imgs.pgzxc.com/tinker-instant-enable.png
[8]: http://bolo-imgs.pgzxc.com/gradle-assem-debug.png
[9]: http://bolo-imgs.pgzxc.com/gradle-assem-debug-run.png
[10]: http://bolo-imgs.pgzxc.com/build-barapk-debug.png
[11]: http://bolo-imgs.pgzxc.com/tinker-sample-run.png
[12]: http://bolo-imgs.pgzxc.com/tinker-add-new.png
[13]: http://bolo-imgs.pgzxc.com/tinker-debug-config.png
[14]: http://bolo-imgs.pgzxc.com/tinker-tinker-patch.png
[15]: http://bolo-imgs.pgzxc.com/tinker-tinker-patch-run.png
[16]: http://bolo-imgs.pgzxc.com/patch-signed.png
[17]: http://bolo-imgs.pgzxc.com/patch-signed-7zip.png
[18]: http://bolo-imgs.pgzxc.com/patch-success.png
[19]: http://bolo-imgs.pgzxc.com/patch-new.png
[20]: https://github.com/PGzxc/tinker-sample-android