---
title: React Native开发之——相关指令(1)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
abbrlink: da7fe292
date: 2018-03-01 00:31:36
---
## 一 概述

本文介绍与React Native开发相关指令，包含

```
* Node
* Yarn
* React Native版本相关
* JDK
* Android配置
* 项目创建
* 运行
```

<!--more-->

## 二  Node

### 2.1 版本

指令

```
nod -v
```

显示

```
v18.18.2
```

### 2.2 查看源

```
npm config get registry
```

### 2.3 源切换

```
# 使用nrm工具切换淘宝源
npx nrm use taobao

# 如果之后需要切换回官方源可使用
npx nrm use npm
```

### 2.4 更新npm

```
npm install -g npm@latest
```

## 三 Yarn

### 3.1 安装

```
npm install -g yarn
```

### 3.2 yarn操作

安装

```
yarn add 替换npm install
```

卸载

```
yarn remove 替换npm uninstall
```

## 四  React Native版本相关

### 4.1 npm查看

```
* npm info react-native：查看react-native所有版本信息
* npm view react-native version：通过 npm 包管理器来查看 React Native 的最新版本
* npx react-native -version：用于查看本地安装的 React Native 版本
* npm uninstall react-native：卸载react-native
* npm install --save react-native@0.55.4：安装指定版本react-native
* npm install：安装最新版react-native
* npm update -g react-native-cli：更新版本命令
```

### 4.2 react-native查看

```
* npx react-native -h：查看react-native所有命令
* npx react-native -v：查看react-native版本号
* npx react-native --version：查看react-natie-cli版本号
* npx react-native@latest init AwesomeProject：创建项目
* npx react-native@x.xx.x init projectName --version x.xx.x：创建指定版本的react-native项目;
* npx react-native start：开启Metro Bundler（web服务器）服务
* npx react-native run-ios / run-android：构建App并运行到iOS或Android模拟器
* npx react-native new-library [options]：生成一个native-library
* npx react-native new-library -h：查看new-library的参数
* npx react-native bundle [options]：构建离线JavaScript bundle数据传递包
* npx react-native eject [options]：重新设置react-native-cli路径
* npx react-native install [options]：安装和连接本地环境
* npx react-native uninstall [options]：卸载和不连接本地环境
* npx react-native upgrade [options]：升级项目模版文件
* npx react-native log-android / log-ios [options]：启动Android / iOS日志输出
* npx react-native依赖项：安装环境信息列表
```

## 五 JDK

指令

```
java --version
```

显示

```
openjdk 11.0.19 2023-04-18
```

## 六 Android配置

### 6.1 Android SDK Build-Tools

```
33.0.0
```

### 6.2  配置 ANDROID_HOME

配置

```
D:\SoftWare\DevTools\Android\SDK
```

### 6.3 环境变量

```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\emulator
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
```

## 七 项目创建

### 6.1 卸载旧的react-native-cli指令

```
npm uninstall -g react-native-cli @react-native-community/cli
```

### 6.2 创建项目

```
npx react-native@latest init AwesomeProject
```

### 6.3 项目依赖

查看过时依赖

```
npm outdated
yarn outdated
```

更新过时依赖

```
npm update
yarn upgrade
```

## 八 运行

指令

```
yarn android
# 或者
yarn react-native run-android
```

## 九  参考

* [知乎—细说包管理器yarn和npm](https://zhuanlan.zhihu.com/p/446995365)