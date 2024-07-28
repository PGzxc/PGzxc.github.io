---
title: LivePortrait开发之——本地部署(1)
categories:
  - 开发
  - Q-AI
  - LivePortrait
tags:
  - LivePortrait
abbrlink: 107ddf29
date: 2024-07-28 09:09:48
---
## 一 概述

* LivePortrait介绍
* 自己下载安装
* 使用集成包(推荐)

<!--more-->

## 二 LivePortrait介绍

### 2.1 什么是LivePortrait

* 通过该项目可以将照片变为生动视频
* 表情转移模型，让静态肖像动起来

### 2.2 项目地址

```
https://github.com/KwaiVGI/LivePortrait
```

## 三 自己下载安装

### 3.1 准备工作

1-FFmpeg

下载地址

https://github.com/BtbN/FFmpeg-Builds/releases

添加环境变量并查看是否生效

```
ffmpeg -version
ffprobe -version
```

2-CONDA

下载地址

```
https://conda.io/projects/conda/en/latest/user-guide/install/index.html
```

添加环境变量

```
D:\SoftWare\DevTools\miniconda3\condabin
```

查看conda版本

```
conda --version
```

### 3.2 下载代码库

1-仓库地址

```
https://github.com/KwaiVGI/LivePortrait
```

2-克隆仓库并进入目录

```
git clone https://github.com/KwaiVGI/LivePortrait
cd LivePortrait
```

3- 使用conda创建env

```
conda create -n LivePortrait python=3.9
conda activate LivePortrait
```

指令如下：

```
Preparing transaction: done
Verifying transaction: done
Executing transaction: done
#
# To activate this environment, use
#
#     $ conda activate LivePortrait
#
# To deactivate an active environment, use
#
#     $ conda deactivate
```

4-安装依赖

```
pip install -r requirements.txt
```

### 3.3 下载预训练权重

```
# first, ensure git-lfs is installed, see: https://docs.github.com/en/repositories/working-with-files/managing-large-files/installing-git-large-file-storage
git lfs install
# clone and move the weights
git clone https://huggingface.co/KwaiVGI/LivePortrait temp_pretrained_weights
mv temp_pretrained_weights/* pretrained_weights/
rm -rf temp_pretrained_weights
```

说明：

解压并将它们放在 中`./pretrained_weights`

确保目录结构如下，或包含

```
pretrained_weights
├── insightface
│   └── models
│       └── buffalo_l
│           ├── 2d106det.onnx
│           └── det_10g.onnx
└── liveportrait
    ├── base_models
    │   ├── appearance_feature_extractor.pth
    │   ├── motion_extractor.pth
    │   ├── spade_generator.pth
    │   └── warping_module.pth
    ├── landmark.onnx
    └── retargeting_models
        └── stitching_retargeting_module.pth
```

## 四 使用集成包(推荐)

### 4.1 从 [HuggingFace](https://huggingface.co/cleardusk/LivePortrait-Windows/tree/main) or [BaiduYun](https://pan.baidu.com/s/1FWsWqKe0eNfXrwjEhhCqlw?pwd=86q2)下载集成包

![][1]

### 4.2 解压缩并启动项目

![][2]

### 4.3 启动后如无问题启动

![][3]

## 五 参考

* [FFmpeg](https://github.com/BtbN/FFmpeg-Builds/releases)
* [Conda](https://docs.conda.io/en/latest/)
* [CONDA下载](https://docs.conda.io/projects/conda/en/stable/user-guide/install/windows.html)
* [零度解说-LivePortrait 本地部署教程](https://www.freedidi.com/13044.html)
* [Github-LivePortrait](https://github.com/KwaiVGI/LivePortrait)





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/liveportrait-1-download-package.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/liveportrait-1-windows-run.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/liveportrait-1-start-work.png