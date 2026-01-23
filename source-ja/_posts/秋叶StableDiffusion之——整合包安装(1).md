---
title: 秋叶StableDiffusion之——整合包安装(1)
categories:
  - 开发
  - Q-AI
  - 秋叶StableDiffusion
tags:
  - 秋叶StableDiffusion
abbrlink: b47af6b3
date: 2024-08-09 08:25:19
---
## 一 概述

* 整合包介绍
* 电脑配置要求
* 软件下载
* 启动及配置
* 使用初体验

<!--more-->

## 二 整合包介绍

### 2.1 何谓整合包

* 整合包是基于开源项目stable diffusion webui制作的套件
* 整合包打包了运行必须的Python、git环境，并且预置好模型，添加常用插件
* 自己部署可能遇到问题较多，秋叶大神整合部署了整合包

### 2.2 整合包适用人群

* 零基础入门，没用过AI绘画的人
* 自己配置官方教程开源环境出错的人
* 不想自己动手的人

## 三 电脑配置要求

* 操作系统：Windows10以后
* CPU：不做强制要求
* 内存：推荐8G以上
* 显卡：必须是Nvidia独立显卡，显存最低4G，推荐20系以后A卡，核显只能用CPU跑
* 硬盘：推荐固态硬盘，提升模型加载速度

## 四 软件下载

### 4.1 网盘地址

* [百度网盘](https://pan.baiduwp.com/share/init?surl=a1wRL5_BZD9RMRyGTtuI1A&pwd=c6o3)
* [夸克网盘](https://pan.quark.cn/s/2c832199b09b#/list/share)

### 4.2 解压密码

```
bilibili@秋葉aaaki
```

## 五 启动及配置

### 5.1 网盘内容介绍及下载

![][1]

说明：

* 旧版本：sd-webui-aki的过期版本，不需要下载
* controlnet：ControlNet用的模型，可以不用下载(需要时再下载)
* sd-webui-aki-v4.8.7：整合包，下载后解压到不含中文路径的文件夹
* dotnet-6.0.11：启动器运行依赖，没用过启动器的需要下载(新手必备)

### 5.2 准备工作(dotnet)

1-双击`启动器运行依赖-dotnet-6.0.11.exe`，安装运行依赖

![][2]

2-下一步，等待安装完成

![][3]

### 5.3 启动软件

1-解压`sd-webui-aki-v4.8.7`，进入文件后双击`A绘世启动器`

![][4]

2-启动后，打开如图界面并点击底部的`一键启动`

![][5]

3-初始化完成后，跳转浏览器窗口

![][6]

## 六 使用初体验

1-切换到`文生图`，使用默认策略，生成图片

![][7]

2-稍等片刻，生成区可以看到效果图

![][8]

## 七 参考

* [GitHub-stable difusion webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)
* [Github-Stable Diffusion WebUI Forge](https://github.com/lllyasviel/stable-diffusion-webui-forge)
* [网站—秋叶 StableDiffusion 整合包](https://windofinsights.com/AI/StableDiffusion/qiuye-sd-download/)
* [sd-webui-aki整合包使用笔记](https://blog.csdn.net/ki1381/article/details/131445333)
* [B站—Stable Diffusion整合包v4.8发布](https://www.bilibili.com/video/BV1iM4y1y7oA/)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/sdwebui-1-download-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/sdwebui-1-dotnet-install-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/sdwebui-1-dotnet-install-finish-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/sdwebui-1-app-click-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/sdwebui-1-app-startui-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/sdwebui-1-app-startui-view-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/sdwebui-1-app-startui-prompt-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/sdwebui-1-app-startui-prompt-result-8.png