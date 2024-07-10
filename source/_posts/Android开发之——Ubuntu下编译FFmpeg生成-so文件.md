---
title: Android开发之——Ubuntu下编译FFmpeg生成.so文件
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - FFmpeg
abbrlink: c5189b5e
date: 2018-06-02 22:03:19
---
# 前言
FFmpeg是一套可以用来记录、转换数字音频、视频，并能将其转化为流的开源计算机程序。多媒体视频处理工具FFmpeg有非常强大的功能包括视频采集功能、视频格式转换、视频抓图、给视频加水印等。市面上常见的播放器如：暴风影音、QQ影音、KMP、GOM Player、PotPlayer等都使用了该开源项目。   

<!--more--> 

# 编译
本文主要讲述在Ubuntu下，使用开源项目FFmpeg编译成.so文件。本文只讲实际动手操作，更多理论知识稍后补充或者自己搜索了解。    

##  使用前准备
1. make  
2. git
3. NDK(android-ndk-r14b-linux-x86_64.zip)
4. FFmpeg(ffmpeg-3.2.1.tar.gz)
5. Ubuntu系统

## 集成步骤
### 安装make
安装make，后面编译时会用到  
![][1]  
### 安装Git
习惯了使用Git，也可以使用Terminal操作  
![][2]  
### NDK 
我曾经使用过NDK R15C，编译不过，后来改为 NDK R14，为保证成功，建议使用 NDK R14  

#### NDK 下载
[下载地址][3]
#### NDK 解压
使用 unzip 指令解压NDK到指定目录  

### FFMPEG  
#### 下载FFmpeg
使用下面的指令下载ffmpeg3.2.1(我曾尝试过ffmpeg4.0版本，因为一些列元音未编译成功)  

	wget https://ffmpeg.org/releases/ffmpeg-3.2.1.tar.gz   

![][4] 

#### 解压FFmpeg  
使用解压指令解压FFmpeg  

	unzip ffmpeg-3.2.1.tar.gz   
![][5]
  
### 修改配置文件 
默认编译后的.so文件格式为：文件明+.so+三段版本号的格式比如libavformat.so.57.0.101。这样的文件格式不太符合我们的使用要求，而且即便是将这样的文件名称简单粗暴的删除.so后面的版本号，在实际使用时也无法编译。所以修改如下  

#### 修改前 

	SLIBNAME_WITH_MAJOR='$(SLIBNAME).$(LIBMAJOR)'
	LIB_INSTALL_EXTRA_CMD='$$(RANLIB) "$(LIBDIR)/$(LIBNAME)"'
	SLIB_INSTALL_NAME='$(SLIBNAME_WITH_VERSION)'
	SLIB_INSTALL_LINKS='$(SLIBNAME_WITH_MAJOR) $(SLIBNAME)' 


![][6]
#### 修改后
	SLIBNAME_WITH_MAJOR='$(SLIBPREF)$(FULLNAME)-$(LIBMAJOR)$(SLIBSUF)'
	LIB_INSTALL_EXTRA_CMD='$$(RANLIB)"$(LIBDIR)/$(LIBNAME)"'
	SLIB_INSTALL_NAME='$(SLIBNAME_WITH_MAJOR)'
	SLIB_INSTALL_LINKS='$(SLIBNAME)'



![][7]  

### 编写编译(.sh)脚本
#### 创建编译脚本 
在ffmpeg 跟目录下创建build_android.sh(名称随意)：   

![][8]
创建后，脚本如下所示：   
![][9]   
#### 创建build文件目录(android) 
android 文件夹用于存放build后的.so文件和其他文件
![][10]
#### 修改编译脚本内容 

	#!/bin/bash
	make clean
	#填写你具体的ndk解压目录
	export NDK=/android/ndk/android-ndk-r13b
	export SYSROOT=$NDK/platforms/android-9/arch-arm/
	export TOOLCHAIN=$NDK/toolchains/arm-linux-androideabi-4.9/prebuilt/linux-x86_64
	export CPU=arm
	#编译后的文件会放置在 当前路径下的android/arm／下
	export PREFIX=$(pwd)/android/$CPU
	export ADDI_CFLAGS="-marm"


	#./configure 即为ffmpeg 根目录下的可执行文件configure
	#你可以在ffmpeg根目录下使用./configure --hellp 查看 ./configure后可填入的参数。

	./configure --target-os=linux \
        --prefix=$PREFIX --arch=arm \
        --disable-doc \
        --enable-shared \
        --disable-static \
        --disable-yasm \
        --disable-symver \
        --enable-gpl \
        --disable-ffmpeg \
        --disable-ffplay \
        --disable-ffprobe \
        --disable-ffserver \
        --disable-doc \
        --disable-symver \
        --cross-prefix=$TOOLCHAIN/bin/arm-linux-androideabi- \
        --enable-cross-compile \
        --sysroot=$SYSROOT \
        --extra-cflags="-Os -fpic $ADDI_CFLAGS" \
        --extra-ldflags="$ADDI_CFLAGS" \
        $ADDITIONAL_CONFIGURE_FLAG
	make clean
	make
	make install

### 编译运行
#### 修改.sh脚本文件权限 
没有限权，后面的脚本命令无法执行  
![][11]  
#### 运行.sh脚本
![][12]  
#### 脚本执行过程
![][13] 
#### 编译完成 
编译时间较长 20分钟左右，之后在android目录下，可以看到生成的文件   
![][14]  
![][15]  



[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ffmpeg-make.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ffmpeg-git.png
[3]: http://www.androiddevtools.cn/
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ffmpeg-down-ffmp.png
[5]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ffmpeg-unzip-ff.png
[6]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ffmpeg-modify-config.png
[7]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ffmpeg-modify-config-after.png
[8]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ffmpeg-create-sh.png
[9]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ffmpeg-create-sh-after.png
[10]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ffmpeg-create-android.png
[11]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ffmpeg-change-x.png
[12]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ffmpeg-build-sh.png
[13]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ffmpeg-build-process.png
[14]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ffmpeg-build-file.png
[15]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ffmpeg-so.png

