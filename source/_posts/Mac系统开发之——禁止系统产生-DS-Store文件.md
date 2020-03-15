---
title: Mac系统开发之——禁止系统产生.DS_Store文件
categories:
  - 系统
  - Mac
tags:
  - DS_Store
abbrlink: 7722f97d
date: 2020-03-15 10:36:31
---
## 一 概述

Mac经常会产生`.DS_Store`的隐藏文件，虽然在Mac上看不到，但是有时用了人家的U盘或把U盘拿到Windows系统上用，就会看到，不但麻烦而且会泄露隐私，文件名都会历历在目。 

<!--more-->

## 二 什么是.DS_Store

.DS_Store(英文全称 Desktop Services Store)是一种由苹果公司的Mac OS X操作系统所创造的隐藏文件，目的在于存贮目录的自定义属性，例如文件们的图标位置或者是背景色的选择。相当于 Windows 下的 desktop.ini。

## 三 禁止`.DS_store`生成

打开 “终端” ，复制黏贴下面的命令，回车执行，重启Mac即可生效

```
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool TRUE
```

## 四 恢复`.DS_store`生成

```
defaults delete com.apple.desktopservices DSDontWriteNetworkStores
```

## 五 删除之前产生的`.DS_store`文件

```
sudo find / -name ".DS_Store" -depth -exec rm {} \;
```

## 六 参考

* [禁止Mac OS X系统产生.DS_Store文件的方法][1]
* [.DS_Store 文件删不掉？彻底删除不断复活的.DS_Store 文件][2]



[1]:https://www.jianshu.com/p/f49f6974f647
[2]:https://www.jianshu.com/p/314f73627fc7