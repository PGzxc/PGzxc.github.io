---
title: Windows应用之——文件批处理程序
categories:
  - 系统
  - Windows
tags:
  - Windows
  - 批处理指令
abbrlink: c045ad2d
date: 2023-10-02 21:01:40
---
## 一  概述

本文介绍Windows系统下与文件相关的批处理程序：

* 修改文件的类型
* 批量为当前目录下的文件添加前缀或后缀
* 视频文件格式转换
* 批量为文件创建同名文件夹并将文件移动到同名文件夹中

<!--more-->

## 二  修改文件的类型

### 2.1 批处理文件(修改文件类型.bat)

```
ren *.mkv2 *.mkv
```

### 2.2 如何使用

* 将bat批处理文件与要修改的文件放在同一个目录下
* 双击运行bat批处理文件

## 三 批量为当前目录下的文件添加前缀或后缀

### 3.1 批处理文件(文件添加前后缀.bat)

```
@echo off
setlocal enabledelayedexpansion

set /p prefix=请输入要添加的前缀：
set /p suffix=请输入要添加的后缀：

for %%F in (*) do (
    set filename=%%~nF
    set extension=%%~xF

    if not "%%~xF"==".bat" (
        ren "%%F" "!prefix!!filename!!suffix!!extension!"
    )
)

echo 操作完成！
pause
```

### 3.2 如何使用

* 将bat批处理文件与要修改的文件放在同一个目录下
* 双击运行bat批处理文件
* 在CMD终端中输入前缀(如有，没有按Enter)、后缀(如有，没有按Enter)

## 四 视频文件格式转换

### 4.1 批处理文件(avi2mp4.bat)

```
echo off
cls
for %%a in ("*.avi") do .\ffmpeg -i "%%a" -c:v libx264 -strict -2 "%%~na.mp4
pause
```

### 4.2 准备工作

* ffmpeg.exe
* avi2mp4.bat

### 4.3 如何使用

* 将bat批处理文件与要修改的文件放在同一个目录下
* 双击运行bat批处理文件

## 五 批量为文件创建同名文件夹并将文件移动到同名文件夹中(使用 PowerShell)

### 5.1 打开 PowerShell 

```
按下 `Win + X` 键，然后选择“Windows PowerShell”
```

### 5.2 导航到目标文件夹

```
使用 cd 命令导航到包含要创建文件夹的文件的目录。
```

### 5.3 执行命令：输入以下命令并按回车键

```
Get-ChildItem | ForEach-Object { 
    New-Item -ItemType Directory -Name $_.BaseName
    Move-Item -Path $_.FullName -Destination "$($_.BaseName)\$($_.Name)" 
}

```

