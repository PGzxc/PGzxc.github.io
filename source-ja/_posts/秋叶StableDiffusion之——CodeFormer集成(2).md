---
title: 秋叶StableDiffusion之——CodeFormer集成(2)
categories:
  - 开发
  - Q-AI
  - 秋叶StableDiffusion
tags:
  - 秋叶StableDiffusion
abbrlink: '359e5407'
date: 2024-08-10 08:37:38
---
## 一 概述

* 未配置CodeFormer时问题
* 添加扩展
* 下载模型
* 配置模型
* 使用教程

<!--more-->

## 二 未配置CodeFormer时问题(切换到后期处理标签)

![][1]

说明：

* 直接点击`生成`无法处理图片问题
* 勾选`CodeFormer`后无法处理图片或出错

## 三 添加扩展

### 3.1 安装扩展

切换到`扩展`—>`从网址安装`—>`填写git仓库`地址

![][2]

### 3.2查看安装

![][3]

## 四 下载模型

### 4.1 CodeForm地址

地址：https://github.com/sczhou/CodeFormer

### 4.2 下载模型

1-跳转到`Quick Inference`

![][4]

2-下载CodeFormer和facelib模型

![][5]

## 五 配置模型

### 5.1 Codeformer配置

路径：

```
Stable Diffusion\sd-webui-aki-v4.8\models\Codeformer
```

示意图

![][6]

### 5.2 facelib配置

路径

```
Stable Diffusion\sd-webui-aki-v4.8\models\GFPGAN
```

示意图

![][7]

## 六 使用教程

1-切换到`后期处理`选项卡，`单张照片`下选择图片

![][8]

2-勾选相应选项`CodeForer`

![][9]

3-点击生成，查看效果

![][10]

## 七 参考

* [Github-CodeFormer](https://github.com/sczhou/CodeFormer)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/sdwebui-2-codeformer-error-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/sdwebui-2-codeformer-extends-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/sdwebui-2-codeformer-extends-install-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/sdwebui-2-codeformer-web-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/sdwebui-2-codeformer-share-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/sdwebui-2-codeformer-model-codeformer-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/sdwebui-2-codeformer-model-gfpgan-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/sdwebui-2-codeformer-deal-img-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/sdwebui-2-codeformer-deal-code-9.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/sdwebui-2-codeformer-deal-effect-10.png

