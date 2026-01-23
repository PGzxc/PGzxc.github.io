---
title: Ubuntu开发之——开机报错Error found when loading etc profile
categories:
  - 系统
  - Ubuntu
tags:
  - Ubuntu
abbrlink: e9322925
date: 2021-01-14 13:01:05
---
## 一 现象

* 操作系统：Ubuntu 20.04.1 LTS
* 现象：启动Ubutu后，界面上出现`Error found when loading /etc/profile`，稍后能正常进入系统

![][1]

<!--more-->

## 二 解决办法

### 2.1 解决前配置

```
# android
ANDROID_HOME=/Users/zxc/Library/Android/sdk  //android路径替换成自己的
export PATH=$ANDROID_HOME:$PATH
export PATH=$ANDROID_HOME/tools:$PATH
export PATH=$ANDROID_HOME/platform-tools:$PATH
```

### 2.2 解决办法

因为ANDROID后面添加了`//android路径替换成自己的`删除




[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-linux/ubuntu-error-loading-etc.png