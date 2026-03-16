---
title: 7zip压缩之——批量解压7z压缩包
categories:
  - 工具
  - 系统工具
  - 7zip
tags:
  - 7zip
abbrlink: f56b5569
date: 2026-03-15 16:08:23
---
## 一 概述

```
本文介绍：
1.Win/Mac 下的解压缩软件 7zip
2.批量解压 7z 压缩包并自动删除压缩文件
3.批量解压 7z 压缩包并保留压缩文件
```

<!--more-->

## 二 为什么选择 7-Zip

### 2.1 介绍

```
-7-Zip 是目前最稳定、最常用的压缩工具之一
-官网：https://www.7-zip.org
-Mac 用户也可以使用：p7zip 或 7zz
-支持平台：Windows、Mac / Linux(p7zip 或 7zz)、NAS(Linux系统可使用 p7zip)
```

### 2.2 优点

```
-免费开源
-压缩速度快
-支持 7z / zip / tar 等格式
-支持命令行自动化
-稳定处理 TB 级数据
```

## 三 Windows 批量解压脚本

### 3.1 安装 7-Zip

```
下载安装：https://www.7-zip.org
假设安装路径：D:\SoftWare\压缩\7zip\7z.exe
```

### 3.2 批量解压并删除压缩包

1-创建脚本(在压缩包所在目录创建文件)

```
extract_delete.bat
```

2-脚本内容

```
@echo off
chcp 65001 >nul
title 批量解压并删除压缩包

set "ZIP=D:\SoftWare\压缩\7zip\7z.exe"

echo.
echo ===== 开始批量解压 =====
echo.

for %%i in (*.7z) do (

    echo 正在解压：%%i
    
    "%ZIP%" x "%%i" -o".\%%~ni" -y

    if exist "%%~ni" (
        echo 解压成功，删除压缩包：%%i
        del "%%i"
    ) else (
        echo 解压失败：%%i
    )

    echo.
)

echo ===== 全部完成 =====
pause
```

### 3.3 批量解压并保留压缩包

1-创建脚本

```
extract_keep.bat
```

2-脚本内容

```
@echo off
chcp 65001 >nul
title 批量解压7z压缩包

set "ZIP=D:\SoftWare\压缩\7zip\7z.exe"

echo.
echo ===== 开始批量解压 =====
echo.

for %%i in (*.7z) do (

    echo 正在解压：%%i
    
    "%ZIP%" x "%%i" -o".\%%~ni" -y

    echo.

)

echo ===== 解压完成 =====
pause
```

### 3.4 使用方法(删除压缩包为例)

```
1.目录结构：

Video
 ├ extract_delete.bat
 ├ 课程1.7z
 ├ 课程2.7z
 ├ 课程3.7z

2.双击运行：

extract_delete.bat
```

## 四 Mac 批量解压脚本

### 4.1 安装 7-Zip

```
使用 Homebrew：

brew install p7zip
```

### 4.2 批量解压并删除压缩包

1-创建脚本

```
extract_delete.sh
```

2-脚本内容：

```
#!/bin/bash

echo "开始批量解压..."

for file in *.7z
do

name="${file%.7z}"

echo "正在解压: $file"

7z x "$file" -o"$name" -y

if [ -d "$name" ]; then
    echo "解压成功，删除压缩包: $file"
    rm "$file"
else
    echo "解压失败: $file"
fi

done

echo "全部完成"
```

### 4.3 批量解压并保留压缩包

1-创建脚本

```
extract_keep.sh
```

2-脚本

```
#!/bin/bash

echo "开始批量解压..."

for file in *.7z
do

name="${file%.7z}"

echo "正在解压: $file"

7z x "$file" -o"$name" -y

done

echo "全部完成"
```

### 4.4 运行脚本(删除压缩包为例)

```
1.赋予权限：

chmod +x extract_delete.sh

2.运行：

./extract_delete.sh
```

## 五 解压命令说明

### 5.1 参数

| 参数 |       含义       |
| :--: | :--------------: |
|  x   | 按原目录结构解压 |
|  -o  |   指定输出目录   |
|  -y  |     自动确认     |

### 5.2 批量解压的使用场景

```
恢复学习资料
恢复视频课程
NAS 数据迁移
移动硬盘数据恢复
服务器自动化处理
```


