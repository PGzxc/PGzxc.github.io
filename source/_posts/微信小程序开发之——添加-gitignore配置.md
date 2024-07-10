---
title: 微信小程序开发之——添加.gitignore配置
categories:
  - 开发
  - F-跨平台
  - 微信小程序
tags:
  - 微信小程序
abbrlink: 48436e2a
date: 2021-11-16 15:57:33
---
## 一 概述

小程序添加git版本管理，每次添加编译路径，都会生成`project.private.config.json`文件，与项目没有直接关系，不用提交

![][1]

<!--more-->

## 二 查看忽略列表是否配置

依次点击：版本管理——>设置——>忽略列表，查看是否配置了忽略文件
![][2]

## 三 添加.gitignore文件

### 3.1 向项目中添加`.gitignore文件`，并添加忽略文件

```
project.private.config.json
```

### 3.2 删除远程仓库中的忽略文件

```
删除 project.private.config.json
```

### 3.3 查看版本控制中忽略文件
![][3]

### 3.4 添加编译模式，生成了`project.private.config.json`，工作区并没有记录
![][4]





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-gitignore-file-exist.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-gitignore-not-setting.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-gitignore-file-list.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-wechat/wechat-gitignore-workplace-no.png