---
title: CodeFormer使用之——使用教程(2)
categories:
  - 开发
  - Q-AI
  - CodeFormer
tags:
  - CodeFormer
abbrlink: e591f0c3
date: 2024-08-07 09:02:55
---
## 一 概述

* 项目目录介绍
* 单个人脸照片修复
* 多个人脸照片修复
* 照片着色
* 脸部着色
* 视频修复

<!--more-->

## 二 项目目录介绍

### 2.1 inputs文件夹放要修复内容

![][1]

说明：

* cropped_faces：裁剪过脸图片文件夹
* gray_faces：灰度图片文件夹
* masked_faces：面具脸文件夹(脸被面具覆盖)
* whole_imgs：多人照片

### 2.2 cropped_faces示例

![][2]

## 三 单个人脸照片修复

### 3.1 使用如下指令(文件夹或文件)

```
python inference_codeformer.py -w 0.5 --has_aligned --input_path D:\Code\CoderFormer\CodeFormer\inputs\cropped_faces
```

裁剪过程

![][3]

说明：

* input 裁剪照片尺寸为512x512
* 裁剪后的文件位于results/cropped_faces_0.5内

### 3.2 修复完成后

| 修复前 | 修复后 |
| :----: | :----: |
| ![][2] | ![][4] |

## 四 多个人脸照片修复

### 4.1 多人照片修复指令(文件夹或文件)

```
python inference_codeformer.py -w 0.7 --input_path D:\Code\CoderFormer\CodeFormer\inputs\whole_imgs
```

### 4.2 修复前后对比

| 修复前 | 修复后 |
| :----: | :----: |
| ![][5] | ![][6] |

## 五 照片着色

### 5.1 照片着色指令(文件夹或文件)

```
python inference_colorization.py --input_path D:\Code\CoderFormer\CodeFormer\inputs\gray_faces
```

## 六 脸部着色

### 6.1 脸部着色指令

```
python inference_inpainting.py --input_path D:\Code\CoderFormer\CodeFormer\inputs\masked_faces
```

## 七 视频修复

### 7.1 安装ffmpeg(管理员下)

```
conda install -c conda-forge ffmpeg
```

说明：先安装conda

### 7.2 视频修复指令

```
python inference_codeformer.py --bg_upsampler realesrgan --face_upsample -w 1.0 --input_path D:\Code\CoderFormer\CodeFormer\inputs\Video\c4ef3a.mp4
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/codeformer-2-input-view.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/codeformer-2-input-cropped.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/codeformer-2-image-crop.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/codeformer-2-image-crop-finish.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/codeformer-2-whole-image.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/codeformer-2-whole-image-result.png