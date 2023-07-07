---
title: React Native开发之——安装及开发中出现的问题及解决办法
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

