---
title: Deep-Live-Cam之——Win环境搭建与运行(2)
categories:
  - AI
  - AI应用
  - AI视频
  - Deep-Live-Cam
tags:
  - Deep-Live-Cam
abbrlink: 4a7b1b8e
date: 2026-04-29 07:43:14
---
## 一 概述

```
本文介绍：
 - 环境要求
 - 安装步骤
 - 启动项目
```

<!--more-->

## 二 环境要求

先装 4 个必备工具（全部默认安装）

### 2.1 Python 3.11(必须这个版本)

```
1.下载地址
https://www.python.org/downloads/release/python-3110/

2.安装时 勾选 Add Python to PATH。
验证(PowerShell 输入)：python --version
```

### 2.2 Git

```
1.下载地址
https://git-scm.com/download/win

2.验证：
git --version
```

### 2.3 FFmpeg(视频处理)

```
1.PowerShell 一键安装：
winget install ffmpeg

2.验证：ffmpeg -version
```

### 2.4 Visual C++ 2022 运行库

```
1.下载
https://aka.ms/vs/17/release/vc_redist.x64.exe

2.双击安装
```

## 三 安装步骤

### 3.1 拉取代码

```
cd D:\
git clone https://github.com/hacksider/Deep-Live-Cam.git
cd Deep-Live-Cam
```

### 3.2 下载模型(必须放 models 文件夹)

```
1.新建 models 文件夹，放入 2 个文件：
GFPGANv1.4.pth
inswapper_128_fp16.onnx

2.下载地址（直接浏览器打开）：
https://huggingface.co/hacksider/deep-live-cam/tree/main/models

3.目录结构：
D:\Deep-Live-Cam
├─ run.py
└─ models
   ├─ GFPGANv1.4.pth
   └─ inswapper_128_fp16.onnx
```

### 3.3 安装依赖(虚拟环境，避免冲突)

```
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

看到 Successfully installed ... 即成功。
```

### 3.4 (NVIDIA 显卡)开启 GPU 加速(快很多)

```
pip uninstall onnxruntime onnxruntime-gpu
pip install onnxruntime-gpu==1.16.3

运行时用 GPU：
python run.py --execution-provider cuda


CPU 用户直接：
python run.py
```

## 四 如何使用

### 4.1 使用步骤

```
1.Select a face → 选亲人正脸照片（清晰、光线柔和）
2.Select a target → 选一段视频背景（风景 / 旧场景）
3.点 Live → 等待生成（10–30 秒）
4.导出视频，用剪映加怀旧音乐 + 文案
```

### 4.2 步骤演示

1.执行如下指令,打开页面

```
.\run-cuda.bat
```

图示
![][1]

2-选择被替换脸和要替换视频

```
1.生成视频
Select a face:要被替换上去的脸
刷新：切换网络照片(也可选择本地照片)
中间箭头 ↔ 切换人脸和目标的顺序，一般不用动
Select a target：被替换的照片或视频

2.调整
Keep fps：关掉（不锁帧率，更流畅）
Keep frames：关掉
Keep audio：打开（保留原视频的声音）
Face Enhancer：保持 GFPGAN（用来修复老照片的模糊，效果更好）
Transparency：拉到 80%-100%（人脸贴合度更高，不透明）
Sharpness：拉到 30%-50%（让脸更清晰，不糊）
Mouth Mask：拉到 20%-40%（嘴巴贴合更自然，不穿模）
```
图示

![][2]

3-开始转换

```
点 Start → 等待视频生成(会自动处理并保存)
```

![][3]

4-生成视频或照片(原视频和替换视频对比)

```
生成的视频会存在软件目录的 output 文件夹里，之后你就可以用剪映加 BGM 和文案了。
```

![][4]

## 五 参考

* [Github-Deep-Live-Cam](https://github.com/hacksider/Deep-Live-Cam)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/deep-live-2-1-open.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/deep-live-2-2-choose.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/deep-live-2-3-process.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/deep-live-2-4-output.png