---
title: Mac系统开发之——应用重置或初始化
categories:
  - 系统
  - Mac
tags:
  - Mac
abbrlink: edbd1d02
date: 2025-11-23 18:51:43
---
## 一 概述

```
本文介绍：mac如何重置软件数据或恢复初始化配置
1.重置应用设置(Preferences)
2.重置设置 + 缓存(多数应用够用)
3.完全初始化
4.用工具一键重置
```

<!--more-->

## 二 最常用方法：删除偏好设置(Preferences)

### 2.1 保存位置

```
Mac 的应用设置通常保存在：~/Library/Preferences
```

### 2.2 步骤

```
1、打开 Finder
2、按 Command + Shift + G 打开“前往文件夹”
3、输入：~/Library/Preferences
4、找到对应的 plist 文件，一般命名为：com.应用名.软件名.plist
```

### 2.3 示例

```
com.apple.Safari.plist
com.microsoft.VSCode.plist

删除这个文件
重启 App（会以默认配置重建设置）
✔ 清除应用所有“设置或配置”
✖ 不会删除用户数据（如文档、下载内容）
```

## 三 彻底重置 App(删除所有相关文件)

### 3.1 说明

```
把一个应用完全初始化（最干净的方法）
```

### 3.2 要删除内容(路径列表)

|               路径                |                说明                |
| :-------------------------------: | :--------------------------------: |
|       ~/Library/Preferences       |             应用的设置             |
|   ~/Library/Application Support   |          应用数据（最多）          |
|         ~/Library/Caches          |                缓存                |
|       ~/Library/Containers        | 沙盒应用数据（App Store 版本重点） |
| ~/Library/Saved Application State |            上次退出状态            |

### 3.3 操作步骤

```
1、依次前往(Command + Shift + G):~/Library/Preferences
2、删除相关 plist 文件(Command + Shift + G)：~/Library/Application Support
3、删除应用相关文件夹(Command + Shift + G):~/Library/Caches
4、删除缓存文件夹(Command + Shift + G)：~/Library/Containers
5、删除 App Store 版本应用数据(Command + Shift + G):~/Library/Saved Application State
6、删除应用状态
```

### 3.4 效果

```
完成后 = 完全恢复到“刚安装”的状态
下一次启动应用，会像第一次打开一样
```

## 四 如果你使用的是 App Store 应用(沙盒)

```
许多 App Store 程序的数据都在：
~/Library/Containers
~/Library/Group Containers

如果只删 Preferences 不够，需要同时删除这些文件夹才能真正重置。
```

## 五 最快速的方法（适合大部分软件）

```
删除应用：
拖到废纸篓
删除以下目录中和该应用有关的文件：
~/Library/Preferences
~/Library/Application Support
~/Library/Caches
~/Library/Containers
重新安装应用
```

## 六 使用工具类软件一键重置（最简单）

```
1、AppCleaner（免费）
自动查找所有相关文件，并支持 Reset / 清理残留。

2、CleanMyMac（付费）
一键重置 App，很方便，但不如 AppCleaner 纯净。
```

