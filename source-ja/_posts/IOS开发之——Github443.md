---
title: IOS开发之——Github443
categories:
  - 开发
  - D-移动开发
  - IOS
tags:
  - IOS
abbrlink: 64ee454f
date: 2023-07-12 18:05:24
---
## 一 现象

![][1]

<!--more-->

## 二 原因

github无法正常访问

## 三 解决办法

### 3.1 解锁hosts文件—否则无法修改

#### 解锁etc文件夹

点击`前往`输入`private`，打开private文件夹

![][2]

在打开的private文件夹中，右键etc`显示简介`，打开窗口中点击右下角的解锁图表

![][3]

把名称下边“**wheel**”和“**everyone**”的权限改为“**读与写**”

![][4]

#### 同理，解锁etc下的hosts文件
![][5]

### 3.2 hosts文件添加github解析

```
#github
140.82.114.3 github.com www.github.com
#207.97.227.239 github.com www.github.com
207.97.227.252 nodeload.github.com
207.97.227.243 raw.github.com
204.232.175.78 documentcloud.github.com
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-github-443-prot-443.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-github-443-go-private.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-github-443-etc-lock.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-github-443-etc-read-write.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-ios/ios-github-443-etc-host-read-write.png