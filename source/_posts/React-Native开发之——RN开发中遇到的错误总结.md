---
title: React Native开发之——RN开发中遇到的错误总结
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - RN错误总结
abbrlink: 7f5a97ab
date: 2018-03-22 18:08:49
---

# 前言 
本文主要是针对React Native开发中遇到的错误进行总结和纠正，实际开发中，经常会遇到这样或那样的问题，如果解决不了，下面的开发可能进行不了，善于纠错和总结也是学习的必备技能。本文会持续更新。    

<!--more-->

# 错误 

## npm ERR! Unexpected end of JSON input while parsing near '...native/download/react'
### 现象 
![][1]  
### 解决办法

	npm cache clean --force
### 过程 
#### 清除缓存
![][2]
#### 设置代理和安装react-native-cli
![][3]
#### 初始化项目
![][4]  



[1]: https://raw.githubusercontent.com/PGzxc/CDN/master/blog-image/rn-error-cache.png
[2]: https://raw.githubusercontent.com/PGzxc/CDN/master/blog-image/rn-error-clear-cache.png
[3]: https://raw.githubusercontent.com/PGzxc/CDN/master/blog-image/rn-error-set-registry.png
[4]: https://raw.githubusercontent.com/PGzxc/CDN/master/blog-image/rn-error-init.png
