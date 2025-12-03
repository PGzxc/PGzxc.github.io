---
title: Cursor代码神器之——使用技巧(4)
categories:
  - 开发
  - R-AI开发助手
  - Cursor
tags:
  - Cursor
abbrlink: 3b9bfb5f
date: 2024-12-27 12:10:03
---
## 一 概述

本文介绍Cursor进行开发的使用技巧，提高开发效率。

<!--more-->

## 二 开发工具支持

Cursor为Vs Code的扩展，不支持jetbrains、Sublime等其他开发工具，界面中列出的只是键盘绑定

![][1]

## 三 开发技巧

### 3.1 源代码修改

#### 3.1.1 问题

1-Cursor生成的效果图没有轮播图片(对此进行修改)

![][2]

2-查看代码得知，没有本地图片(让Cursor用网络图片代替)

![][3]

#### 3.1.2 解决

1-将要修改的文件拖放到Composer或点击Composer左侧的+添加

![][4]

3-输入修改内容，并预览效果(未Accept接受前，不会被替换，Accept后会被替换)

```
将SliderImages 数组中的内容替换为网络图片
```

图示
![][5]

4-预览效果

![][6]

### 3.1.3 应用修改及修改记录

1-点击Accept应用修改，代码会被覆盖

![][7]

2-点击Composer上方的时钟图标，显示修改记录

![][8]

### 3.2 添加注释

#### 3.2.1 现象(代码中没有注释，不便于理解)

![][9]

#### 3.2.2 添加注释

1-将要修改的一个或部分代码添加到Composer

![][10]

2-在Composer中输入关键词

```
为代码添加注释
```

图示

![][11]

3-预览或确认无误后，Accept代码

![][12]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-4-keyboard-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-4-skill-noview-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-4-skill-no-image-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-4-skill-toggle-move-4.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-4-skill-toggle-modify-5.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-4-skill-replace-view-6.png
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-4-skill-accept-after-7.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-4-skill-accept-history-8.png
[9]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-4-skill-explain-no-9.png
[10]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-4-skill-explain-add-10.png
[11]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-4-skill-explain-modify-11.png
[12]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ai/cursor-4-skill-explain-accept-12.png