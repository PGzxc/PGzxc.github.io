---
title: IOS开发之——音视频-音效介绍(01)
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
  - 音视频
abbrlink: d395c8c4
date: 2022-04-13 22:28:22
---
## 一 概述

* 音频分类：音效和音乐
* 常见音效格式
* 音频格式转换

<!--more-->

## 二 音频分类：音效和音乐

音频可以分为2类：音效和音乐

### 2.1 音效

* 又称“短音频”，通常在程序中的播放时长为1～2秒
* 在应用程序中起到点缀效果，提升整体用户体验

### 2.2 音乐

* 比如游戏中的“背景音乐”，一般播放时间较长

### 2.3 播放音频需要的2个框架

* AVFoundation
* AudioToolbox

## 三 常见音效格式

|    音频格式     | 硬件解码 | 软件解码 |
| :-------------: | :------: | :------: |
|       AAC       |   YES    |   YES    |
|      ALAC       |   YES    |   YES    |
|     HE-AAC      |   YES    |          |
|      iLBC       |          |   YES    |
|      IMA4       |          |   YES    |
|    Linea PCM    |          |   YES    |
|       MP3       |   YES    |   YES    |
| μ-law and a-law |          |   YES    |
|       CAF       |   YES    |   YES    |

## 四 音频格式转换

### 3.1 说明

* 在终端中使用系统自带的工具afconvert
* 按照音频转换语法规则可以完成音频格式转换

### 3.2 音频转换语法规则

转换aiff格式

```
afconvert -f AIFF -d I8 filename
```

转换caf格式

```
afconvert -f caff -d aac -b 32000 filename
```

批量转换

```
find . -name '*.mp3' -exec afconvert -f caff -d aac -b 32000 {} \;
```

### 3.3 音频转换示例

打开终端，进入要转换的文件路径

![][1]

执行如下指令，查看帮助指令

```
afconvert --help
```
![][2]

根据语法规则和帮助指令，将wav转换为aac

```
afconvert -f adts -d aac buyao.wav
```
![][3]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-av-01-terminal-cd-target.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-av-01-terminal-conver-help.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-av-01-terminal-conver-success.png
