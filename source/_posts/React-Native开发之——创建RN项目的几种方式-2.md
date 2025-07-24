---
title: React Native开发之——创建RN项目的几种方式(2)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
abbrlink: 946307b0
date: 2018-03-01 02:15:37
---
## 一 概述

本文介绍创建React Native项目的几种方式

```
* npx
* expo
* gluestack
```

<!--more-->

## 二  npx-官网示例 

### 2.1 项目创建

```
npx react-native@latest init AwesomeProject

说明：
* 支持：android、ios
* 创建完的项目，有android、ios
* 模拟器运行支持
```
### 2.2 项目运行

```
cd AwesomeProject
yarn android
# 或者
yarn react-native run-android
```

## 三 Expo

### 3.1 项目创建

```
npx create-expo-app expo-sample

说明：

* 支持：android、ios、web
* 创建完的项目，没有android、ios、web等model
```

### 3.2 安装Expo客户端

```
下载地址：https://expo.dev/client
```

### 3.3 运行或生成android、ios、web

1-web

```
1、安装web依赖
npx expo install react-native-web@~0.19.6 react-dom@18.2.0 @expo/webpack-config@^19.0.0

2、运行
npm run web
```

2-android

```
1、安装依赖
yarn

2、编译并生成android目录，并运行(模拟器运行不支持)
npx expo run:android

3、运行
npm run android
npm expo start
```
3-ios

```
编译并生成ios目录，并运行
npx expo run:ios
```

## 四 gluestack-ui

### 4.1 项目创建

```
npm create gluestack

说明：

* 执行指令后，选择`Web app`、`Mobile app(Expo+gluestack-ui)`、`Mobile app(React Native+gluestack-ui)`、`Universal app`并确认
* Expo创建完的项目，没有android、ios等目录
```

### 4.2 项目运行

```
1、expo方式
npx expo run:ios

2、yarn方式
yarn android
```

## 五 参考

* [React Native中文网-搭建开发环境](https://reactnative.cn/docs/environment-setup)
* [Expo-Docs](https://docs.expo.dev/guides/local-app-development/)
* [gluestack-ui](https://gluestack.io/ui/docs/guides/install-expo)