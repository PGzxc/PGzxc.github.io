---
title: React Native开发之——RN开发中遇到的错误总结(4)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - RN错误总结
abbrlink: 7f5a97ab
date: 2018-03-01 18:08:49
---

## 概述
```
主要是针对React Native开发中遇到的错误进行总结和纠正
本文会持续更新。    
```

<!--more-->

## 二 错误 

### 2.1 npm ERR! Unexpected end of JSON...

```
1、错误信息
npm ERR! Unexpected end of JSON input while parsing near '...native/download/react'

2、解决办法
2-1 清理缓存：
npm cache clean --force

2-2 设置代理和安装react-native-cli
 - 临时使用：npm install 包名 --registry=https://registry.npmmirror.com
 - 长期使用：npm config set registry https://registry.npmmirror.com
 - 验证配置：npm config get registry
 - 恢复成默认值：npm config set registry https://registry.npmjs.org
 - 安装react-native-cli:npm install -g react-native-cli
```







[1]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-error-cache.png
[2]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-error-clear-cache.png
[3]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-error-set-registry.png
[4]: https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-image/rn-error-init.png
