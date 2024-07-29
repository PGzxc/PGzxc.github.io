---
title: LivePortrait开发之——使用教程(2)
categories:
  - 开发
  - Q-AI
  - LivePortrait
tags:
  - LivePortrait
abbrlink: e6ab2645
date: 2024-07-29 08:32:04
---
## 一 概述

* 项目目录介绍
* 图片输入生成视频
* 视频输入生成视频

<!--more-->

## 二 项目目录介绍

```
├─animations  //制作视频输出目录
├─assets      //源文件(输入和输出)
│  ├─docs
│  │  └─changelog
│  ├─examples
│  │  ├─driving  //参考视频目录
│  │  └─source   //源文件目录
│  └─gradio
```

说明：

* source源文件命名规范以s开头，后跟数字，可以为图片或视频
* animations为合成视频的输出文件夹

## 三 图片输入生成视频

### 3.1 选择输入源图片

![][1]

### 3.2 选择驱动参考视频

![][2]

### 3.3 点击Animate开始制作

![][3]

### 3.4 制作完成

![][4]

说明：左侧显示单独视频，右侧对比视频

## 四 视频输入生成视频

### 4.1 切换到Source Video视频选项卡，选择输入视频

![][5]

### 4.2 视频制作完成

![][6]

## 五 参考

* [在线体验地址](https://huggingface.co/spaces/KwaiVGI/LivePortrait)
* [LivePortrait 本地部署教程](https://www.freedidi.com/13044.html)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/liveportrait-2-image-choice.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/liveportrait-2-driving-video.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/liveportrait-2-image-animate.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/liveportrait-2-image-finish.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/liveportrait-2-video-choice.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/liveportrait-2-video-finish.png