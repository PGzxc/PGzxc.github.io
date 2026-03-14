---
title: NAS入门之——My Cloud EX2之硬盘更换同型号设备
categories:
  - NAS
  - B-NAS设备
  - WD MyCloud
tags:
  - My Cloud EX2
abbrlink: 6d625dc8
date: 2026-03-09 09:18:56
---
## 一 概述

```
本文介绍：My Cloud EX2 的硬盘(有数据)换到另一台同型号设备
```

<!--more-->

## 二 带数据硬盘更换设备操作指南

### 2.1 先确认硬盘状态

```
在更换设备之前，需要确认当前硬盘模式：
进入 EX2 后台查看：设置 → 存储 → RAID
```

常见情况

|     模式     |  是否可以直接迁移  |
| :----------: | :----------------: |
| JBOD / Basic |    可以单盘读取    |
|    RAID0     |    必须两盘一起    |
|    RAID1     | 两盘任意一盘可恢复 |
|   脱机硬盘   |  可能需要数据恢复  |

### 2.2 更换到另一台(EX2 或 EX2 Ultra)-操作步骤

```
1、关闭旧 NAS
2、取出硬盘(记住盘位)：建议标记：Disk1、Disk2
3、插入新 NAS 相同盘位

4、开机
系统会自动识别：
Existing Volume Found
Import Volume

5、点击 Import（导入）

即可恢复所有数据。
-用户
-共享文件夹
-文件数据
```

### 2.3 图示

| 1-开机导入警告 |     2-数据恢复     |
| :------------: | :----------------: |
|     ![][1]     | More Actions![][2] |



[1]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-ex2-replace-1-warn.png
[2]:https://cdn.jsdelivr.net/gh/pgzxc/cdn/blog-nas/nas-ex2-replace-2-inok.png