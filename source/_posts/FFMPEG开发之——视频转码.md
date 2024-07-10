---
title: FFMPEG开发之——视频转码
categories:
  - 开发
  - H-音、视频开发
  - FFMPEG
tags:
  - FFMPEG
  - 转码
abbrlink: '422e0424'
date: 2022-04-09 22:40:24
---
## 一 概述

 多媒体视频处理工具FFmpeg有非常强大的视频转码功能：

* ts视频格式转换为mp4
* avi视频格式转换为mp4
* flv视频格式转换为mp4
* mkv视频格式转换为mp4
* mov视频格式转换为mp4
* mpg视频格式转换为mp4
* rmvb视频格式转换为mp4
* wmv视频格式转换为mp4

<!--more-->

## 二 工具说明

### 2.1 工具说明

* ffmpeg.exe：ffmpeg工具
* 各种批处理文件(.bat)：用于将同目录下的相应视频格式文件转换为mp4文件

### 2.2 FFMPEG下载

[Github-FFmpeg-Builds](https://github.com/BtbN/FFmpeg-Builds/releases)，下载解压后得到ffmpeg.exe文件

## 三 视频格式转换为mp4

### 3.1 批处理命令

####  ts视频格式转换为mp4(run-ts2mp4.bat)

```
echo off
cls
for %%a in ("*.ts") do .\ffmpeg -i "%%a" -f mp4 -codec copy "%%~na.mp4
pause
```

#### avi视频格式转换为mp4(run-avi2mp4.bat)

```
echo off
cls
for %%a in ("*.avi") do .\ffmpeg -i "%%a" -c:v libx264 -strict -2 "%%~na.mp4
pause
```

#### flv视频格式转换为mp4(run-flv2mp4.bat)

```
echo off
cls
for %%a in ("*.flv") do .\ffmpeg -i "%%a" -c:v libx264 -strict -2 "%%~na.mp4
pause
```

#### mkv视频格式转换为mp4(run-mkv2mp4.bat)

```
echo off
cls
for %%a in ("*.mkv") do .\ffmpeg -i "%%a" -c:v libx264 -strict -2 "%%~na.mp4
pause
```

#### mov视频格式转换为mp4(run-mov2mp4.bat)

```
echo off
cls
for %%a in ("*.mov") do .\ffmpeg -i "%%a" -c:v libx264 -strict -2 "%%~na.mp4
pause
```

#### mpg视频格式转换为mp4(run-mpg2mp4.bat)

```
echo off
cls
for %%a in ("*.mpg") do .\ffmpeg -i "%%a" -c:v libx264 -strict -2 "%%~na.mp4
pause
```

#### rmvb视频格式转换为mp4(run-rmvb2mp4.bat)

```
echo off
cls
for %%a in ("*.rmvb") do .\ffmpeg -i "%%a" -c:v libx264 -strict -2 "%%~na.mp4
pause
```

#### wmv视频格式转换为mp4(run-wmv2mp4.bat)

```
echo off
cls
for %%a in ("*.wmv") do .\ffmpeg -i "%%a" -c:v libx264 -strict -2 "%%~na.mp4
pause
```

### 3.2 转换完成后

![][1]

## 四 参考

* [Github-项目文件](https://github.com/PGzxc/Video2mp4)
* [知乎-如何将 .ts 转换成MP4格式](https://www.zhihu.com/question/68727244)
* [知乎-rmvb视频转MP4](https://zhuanlan.zhihu.com/p/107321992)
* [ffmpeg Documentation](https://ffmpeg.org/ffmpeg.html)
* [百度百科-ffmpeg](https://baike.baidu.com/item/ffmpeg/2665727)



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/ffmpeg-run-conver-mp4-finished.png