---
title: Flutter开发之——重新创建android和ios目录(128)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: eddc9a0d
date: 2024-04-29 21:02:28
---
## 一 重新创建Android目录

```
# 进入工程目录，删除android目录
rm -rf android
 
# 重新创建java语言的android目录
flutter create -a java .
 
# 重新创建kotlin语言的android目录
flutter create -a kotlin .
```

<!--more-->

## 二 重新创建Ios目录

```
# 进入工程目录，删除ios
rm -rf ios 
 
# 重新创建指定swift语言的ios目录
flutter create -i swift .
 
# 重新创建指定objective-c 语言的ios目录
flutter create -i objc .  
```

