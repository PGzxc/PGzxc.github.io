---
title: NAS入门之——My Cloud EX2之SSH相关操作
categories:
  - 开发
  - J-NAS
  - My Cloud EX2
tags:
  - My Cloud EX2
  - SSH
abbrlink: 977a4f2d
date: 2026-03-02 10:51:41
---
## 一 概述

```
本文介绍 WD My Cloud EX2 Ultra通过SSH登陆到终端相关操作：
1.文件同步(rsync)
2.文件移动(mv)
3.文件夹删除(rmdir / rm -rf)
4.文件夹重命名(mv 重命名)
5.新手安全操作流程
6.统一使用 SSH /shares/ 路径
```

<!--more-->

## 二 路径说明

### 2.1 Mac路径挂载与真实路径

```
1.Mac 显示：
smb://MyCloudEX2Ultra._smb._tcp.local/temp

2.在 NAS 内部实际路径是：
/shares/temp
```

### 2.2 总结

|  方式   |   路径   |
| :-----: | :------: |
| SMB访问 |  smb://  |
| SSH操作 | /shares/ |

说明：在 SSH 中 **只能使用 /shares/

## 三 相关操作

### 3.1 文件同步

```
1.适用于：
-数据量大
-想保留源文件
-想防止误删

2.基本命令
rsync -av 源目录/ 目标目录/

3.示例
rsync -av "/shares/temp/2-电影/" "/shares/temp/电影备份/"

4.同步完成后删除源目录(可选) 删除前必须确认内容已完整复制。
rm -rf "/shares/temp/2-电影"
```

### 3.2 文件移动(快速整理)

```
1.适用于：
-同一硬盘内移动
-快速整理目录结构

2.移动所有内容
mv "源目录"/* "目标目录/"

3.示例
mv "/shares/temp/usb-nas-1/NAS盘/2-电影"/* "/shares/temp/2-电影/"

4.只移动文件夹
mv "源目录"/*/ "目标目录/"
```

### 3.3 文件夹重命名

```
1.说明：在 Linux 系统中：
重命名 = 使用 mv

2.基本格式
mv 原名称 新名称

3.示例 1：修改文件夹名称
mv "/shares/temp/2-电影" "/shares/temp/电影"

4.示例 2：重命名单个文件
mv "/shares/temp/test.mp4" "/shares/temp/测试视频.mp4"

5.注意：
-必须在同一目录下才是重命名
-不加路径会按当前目录执行
```

### 3.4 删除目录

```
1.删除空目录（安全方式）
rmdir "目录路径"

2.示例：
rmdir "/shares/temp/usb-nas-1"

3.强制删除（危险操作）
rm -rf "目录路径"

4.示例：
rm -rf "/shares/temp/usb-nas-1"

5.说明：
不可恢复，必须确认路径正确
```

## 四 安全整理推荐流程(实战案例)

```
假设你插入移动硬盘：/shares/temp/usb-nas-1/
想整理电影到：/shares/temp/2-电影/
```

### 4.1 步骤 1：查看内容

```
ls "/shares/temp/usb-nas-1"
```

### 4.2 步骤 2：同步(推荐)

```
rsync -av "/shares/temp/usb-nas-1/2-电影/" "/shares/temp/2-电影/"
```

### 4.3 步骤 3：确认数据

```
ls "/shares/temp/2-电影"
```

### 4.4 步骤 4：删除旧目录

```
rm -rf "/shares/temp/usb-nas-1"
```

## 五 常用检查命令

### 5.1 查看目录大小

```
du -sh "目录路径"
```

### 5.2 查看目录内容

```
ls -la "目录路径"
```

## 六 总结对照表

|    操作    |   命令    |
| :--------: | :-------: |
|    同步    | rsync -av |
|    移动    |    mv     |
|   重命名   |    mv     |
| 删除空目录 |   rmdir   |
|  强制删除  |  rm -rf   |

