---
title: React Native开发之——安装及开发中出现的问题及解决办法(3)
categories:
  - 开发
  - F-跨平台
  - React Native
tags:
  - React Native
abbrlink: f852f443
date: 2018-03-01 16:14:52
---
## 一 概述

在安装React Native以及项目开发的过程中可能遇到各种各样的问题，本文加以记录并保持更新

<!--more-->

## 二 安装及配置过程中

### 2.1 ERR_REQUIRE_ESM

#### 现象

```
const open = require('open');
             ^
Error [ERR_REQUIRE_ESM]: require() of ES Module 
    at Object.<anonymous> (C:\Users\83422\AppData\Local\npm-cache\_npx\c3b18f2de609c2ae\node_modules\nrm\cli.js:9:14) {
  code: 'ERR_REQUIRE_ESM'
}
Node.js v18.16.0
```

#### 原因

```
应该使用 open 的 CommonJs规范的包 ，现在 open v9.0.0 是 ES Module 版本的包
```

#### 解决办法

```
npm install -g nrm open@8.4.2 --save
```

### 2.2 error Command failed with exit code 1: yarn install

#### 现象

```
error Command failed with exit code 1: yarn install
warning react-native > @react-native/codegen > jscodeshift > @babel/plugin-proposal-nullish-coalescing-operator@7.18.6: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-nullish-coalescing-operator instead.
```

#### 解决办法

```
yarn install
yarn react-native run-android或npx react-native start
```

### 2.3 React Native v0.72.4 is now available (your project is running on v0.71.8)

#### 现象

```
info React Native v0.72.4 is now available (your project is running on v0.71.8).
info Changelog: https://github.com/facebook/react-native/releases/tag/v0.72.4
info Diff: https://react-native-community.github.io/upgrade-helper/?from=0.71.8
info For more info, check out "https://reactnative.dev/docs/upgrading".
```

#### 解决办法

```
 查看react版本信息 yarn info react
 查看react-native版本信息 yarn info react-native 
 将package.json中的react-native从v0.71.8修改为"0.72.4"
```

### 2.4 Included build '....\node_modules\react-native-gradle-plugin' does not exist

#### 现象

```
FAILURE: Build failed with an exception.

* What went wrong:
Included build 'D:\Code\ReactNativeDode\RN_WanAndroid-master\node_modules\react-native-gradle-plugin' does not exist.

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.
```

#### [解决办法(android\settings.gradle)](https://github.com/facebook/react-native/issues/36643)

```
修改前
includeBuild('../node_modules/react-native-gradle-plugin')
修改为
includeBuild('../node_modules/@react-native/gradle-plugin')
```

### 2.5 关闭prettier—.eslintrc.js，并如下配置

```
module.exports = {
  root: true,
  extends: '@react-native',
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    //严格的检查缩进问题，不是报错，我们可以关闭这个检查规则,然后在终端输入npm run dev
    "indent": ["off", 2],
    //使用eslint时，严格模式下，报错Missing space before function parentheses的问题，意思是在方法名和扩号之间需要有一格空格。
    'space-before-function-paren': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    //关闭prettier
    'prettier/prettier': "off"
  }
};
```

### 2.6 Task :react-native-reanimated:configureCMakeDebug[arm64-v8a] FAILED

#### 错误现象

```
> Configure project :react-native-reanimated
Android gradle plugin: 7.4.2
Gradle: 8.0.1
WARNING:Software Components will not be created automatically for Maven publishing from Android Gradle Plugin 8.0. To opt-in to the future behavior, set the Gradle property android.disableAutomaticComponentCreation=true in the `gradle.properties` file or use the new publishing DSL.
```

#### 解决办法

在文件 `gradle.properties` 中启用 AGP 8.0 默认行为的预览时

```
android.disableAutomaticComponentCreation=true
```

### 2.7  Failed to transform react-android-0.72.3-debug.aar

#### 错误现象

```
Failed to transform react-android-0.72.3-debug.aar (com.facebook.react:react-android:0.72.3) to match attributes {artifactType=android-aar-metadata, com.android.build.api.attributes.BuildTypeAttr=debug, org.gradle.category=library, org.gradle.dependency.bundling=external, org.gradle.libraryelements=aar, org.gradle.status=release, org.gradle.usage=java-runtime}.

 Could not download react-android-0.72.3-debug.aar (com.facebook.react:react-android:0.72.3)
         > Could not get resource 'https://repo.maven.apache.org/maven2/com/facebook/react/react-android/0.72.3/react-android-0.72.3-debug.aar'.
            > Read timed out
```

#### 解决办法

1-复制下载链接下载：

```
https://repo.maven.apache.org/maven2/com/facebook/react/react-android/0.72.3/react-android-0.72.3-debug.aar
```

2-将react-android-0.72.3-debug.aar文件复制到如下内容

```
C:Users\用户名\.gradle\caches\modules-2\files-2.1\com.facebook.react\hermes-android\0.72.3有含有pom文件的文件夹
```

