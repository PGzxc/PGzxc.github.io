---
title: HandBrake之——CLI自动化批量转码脚本(3)
categories:
  - 工具
  - HandBrake
tags:
  - HandBrake
abbrlink: 779cd9bc
date: 2025-11-16 09:12:37
---
## 一 概述

```
适用系统：Linux / NAS / Windows PowerShell
目标：让你在 NAS 或服务器自动批量转码视频
```

<!--more-->

## 二 命令行安装

### 2.1 Linux

```
sudo apt install handbrake-cli -y
```

### 2.2 macOS(使用 Homebrew)

```
brew install handbrake
```

### 2.3 Windows(需添加环境变量)

```
下载 HandBrakeCLI.exe → 放入系统 PATH 路径中
```

## 三 基本命令示例

### 3.1 单文件转码

```
1、指令
HandBrakeCLI -i "input.mp4" -o "output.mp4" -e x264 -q 20 -B 160

2、参数说明：
-i 输入文件
-o 输出文件
-e x264 使用 H.264 编码
-q 20 质量参数（18~22 为常用范围）
-B 160 音频比特率 160kbps
```

### 3.2 批量转码脚本（Linux / macOS）

```
#!/bin/bash
input_dir="/mnt/video/input"
output_dir="/mnt/video/output"

for file in "$input_dir"/*.mkv; do
  name=$(basename "$file" .mkv)
  HandBrakeCLI -i "$file" -o "$output_dir/$name.mp4" -e x264 -q 20 -B 160
done
```

### 3.3 批量转码脚本（Windows PowerShell）

```
$input = "D:\Video\Input"
$output = "D:\Video\Output"
Get-ChildItem $input -Filter *.mkv | ForEach-Object {
  $name = [System.IO.Path]::GetFileNameWithoutExtension($_.FullName)
  & "C:\Program Files\HandBrake\HandBrakeCLI.exe" -i $_.FullName -o "$output\$name.mp4" -e x264 -q 20 -B 160
}
```

## 四 自动化与定时任务

```
可以将脚本加入系统计划任务（cron / Task Scheduler），实现 NAS 自动转码：
 -每天扫描新文件夹自动转码
 -转换后自动移动到 Plex / Emby 媒体库
 -压缩旧视频以节省空间
```

