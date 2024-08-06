---
title: CodeFormer使用之——项目搭建(1)
categories:
  - 开发
  - Q-AI
  - CodeFormer
tags:
  - CodeFormer
abbrlink: 76257ba9
date: 2024-08-06 07:59:02
---
## 一 概述

* CodeFormer项目介绍
* 准备条件
* 克隆项目并安装
* 安装训练模型

<!--more-->


## 二 CodeFormer项目介绍

### 2.1 项目地址

CodeFormer：https://github.com/sczhou/CodeFormer

### 2.2 项目介绍

* 稳健的人脸修复软件
* 可对图像或视频进行修复

## 三 准备条件

### 3.1 当前环境

* python：3.12.4
* git：2.14.0

### 3.2 查看电脑cuda版本

命令行输入如下指令

```
nvidia-smi
```

查看结果(版本为：12.2)

```
+---------------------------------------------------------------------------------------+
| NVIDIA-SMI 537.70                 Driver Version: 537.70       CUDA Version: 12.2     |
|-----------------------------------------+----------------------+----------------------+
| GPU  Name                     TCC/WDDM  | Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |         Memory-Usage | GPU-Util  Compute M. |
|                                         |                      |               MIG M. |
|=========================================+======================+======================|
|   0  NVIDIA GeForce RTX 3060 Ti   WDDM  | 00000000:01:00.0  On |                  N/A |
| 32%   39C    P8               8W / 200W |    834MiB /  8192MiB |      0%      Default |
|                                         |                      |                  N/A |
+-----------------------------------------+----------------------+----------------------+
```

### 3.3 安装Pytorch 

1-打开Pytorch官网：https://pytorch.org/get-started/locally/#supported-windows-distributions

![][1]

2-复制指令并执行

```
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
```

安装过程

![][2]

## 四 克隆项目并安装

### 4.1 克隆项目并进入

```
git clone https://github.com/sczhou/CodeFormer
cd CodeFormer
```

### 4.2 安装Python依赖

```
pip install -r requirements.txt
```

### 4.3 安装图形界面

```
pip install gradio
```

### 4.4 继续安装

```
python basicsr/setup.py develop
```

## 五 安装训练模型

### 5.1 安装facelib

```
python scripts/download_pretrained_models.py facelib
```

### 5.2 安装CodeFormer pretrained model

```
python scripts/download_pretrained_models.py CodeFormer
```





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/codeformer-pytorch-cmd.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/codeformer-pytorch-cmd-install.png