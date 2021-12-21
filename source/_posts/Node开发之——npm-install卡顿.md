---
title: Node开发之——npm install卡顿
categories:
  - 开发
  - 后端
  - Node
tags:
  - Node
abbrlink: fed8096f
date: 2020-03-13 21:34:47
---
## 一 现象说明

在终端执行`npm install`时，依赖安装时，可能会出现卡顿不再执行的情况

* 原因：npm默认使用国外的服务器，比较慢，有时候可能无法访问
* 解决办法：解决这种情况的最有效途径是更换镜像网址(改为从国内的镜像下载)

<!--more-->

## 二 查看当前的镜像网址

```
npm get registry 
```
显示的结果为：

```
https://registry.npmjs.org/
```

## 三 修改为国内镜像

```
npm config set registry https://registry.npm.taobao.org 
```

查看`npm get registry `执行结果

```
https://registry.npm.taobao.org/
```

## 四 执行npm install

```
npm install
```

或者直接执行

```
npm install --registry=https://registry.npm.taobao.org
```

## 五 还原默认镜像

```
npm config set registryhttps://registry.npmjs.org
```

使用下面的语句检查你的当前NPM源：

```
npm get registry
```

