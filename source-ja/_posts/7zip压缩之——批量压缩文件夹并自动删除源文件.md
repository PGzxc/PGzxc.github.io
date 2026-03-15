---
title: 7zip压缩之——批量压缩文件夹并自动删除源文件
categories:
  - 工具
  - 系统工具
  - 7zip
tags:
  - 7zip
abbrlink: 852a573c
date: 2026-03-15 09:58:22
---
## 一 概述

```
本文介绍：
1.Win/Mac下的压缩软件7zip
2.批量压缩文件夹并自动删除源文件
```

<!--more-->

## 二 为什么选择 7-Zip

### 2.1 介绍

```
-7-Zip 是一款非常优秀的压缩软件。
-官网：https://www.7-zip.org
-Mac 用户也可以使用：p7zip 或 7zz
```

### 2.2 优点

```
-免费开源
-压缩速度快
-支持 7z / zip / tar 等格式
-支持命令行自动化
-稳定处理 TB 级数据
```

### 2.3 使用场景

```
学习资料整理
视频课程归档
NAS 数据备份
大量文件夹批量压缩
```

## 三 Windows 批量压缩脚本

### 3.1 安装 7-Zip

```
下载安装：https://www.7-zip.org
假设安装路径：D:\SoftWare\压缩\7zip\7z.exe
```

### 3.2 创建脚本

1-在要压缩的目录创建脚本文件

```
compress.bat
```

2-内容如下：

```
@echo off
chcp 65001 >nul
title 批量压缩并删除源文件

set "ZIP=D:\SoftWare\压缩\7zip\7z.exe"

echo.
echo ===== 开始批量压缩 =====
echo.

for /d %%i in (*) do (
    
    if not exist "%%i.7z" (
        echo 正在压缩：%%i
        
        "%ZIP%" a -t7z "%%i.7z" "%%i\*" -mx=1 -mmt
        
        if exist "%%i.7z" (
            echo 压缩成功，删除源文件夹：%%i
            rd /s /q "%%i"
        ) else (
            echo 压缩失败，保留原文件夹：%%i
        )
        
        echo.
    ) else (
        echo 已存在压缩包，跳过：%%i
    )

)

echo.
echo ===== 全部完成 =====
pause
```

### 3.3 使用方法

```
1.目录结构：

Video
 ├ compress.bat
 ├ 课程A
 ├ 课程B
 ├ 课程C

2.双击运行：

compress.bat

3.自动生成：

课程A.7z
课程B.7z
课程C.7z

并删除原文件夹。
```

## 四 Mac 批量压缩脚本

### 4.1 安装 7-Zip

```
使用 Homebrew：brew install p7zip
```

### 4.2 创建脚本

1-创建文件：

```
compress.sh
```

2-脚本内容：

```
#!/bin/bash

echo "开始批量压缩..."

for dir in */ ; do

name=${dir%/}

if [ ! -f "$name.7z" ]; then

echo "正在压缩: $name"

7z a -t7z "$name.7z" "$name" -mx=1 -mmt

if [ -f "$name.7z" ]; then
echo "压缩成功，删除源目录: $name"
rm -rf "$name"
else
echo "压缩失败: $name"
fi

fi

done

echo "全部完成"
```

### 4.3 运行脚本

```
1.先赋予权限：
chmod +x compress.sh

2.运行：
./compress.sh
```

## 五 压缩参数推荐

### 5.1 参数

| 参数 |   含义   |
| :--: | :------: |
| mx=1 | 最快压缩 |
| mx=5 |   默认   |
| mx=9 | 最大压缩 |

### 5.2 如何选择

```
1.视频资料建议使用：-mx=1
2.视频文件(mp4/mkv/avi)：已经压缩，再压缩几乎不会变小。
3.因此：速度优先更合理
```

