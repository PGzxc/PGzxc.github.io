---
title: 鸿蒙面试题——ArkTS进阶题应用开发(4)
categories:
  - 面试相关
  - Harmony面试题
tags:
  - Harmony面试题
abbrlink: ace366a0
date: 2025-09-18 08:57:17
---
## 一 概述

```
本文介绍：
- ArkTS：基础/进阶/高频三部分
- 本小节：进阶题/应用开发
```

<!--more-->

## 二 应用开发(仅供参考)

### 2.1 UIAbility 生命周期？

```
1、onCreate
2、onWindowStageCreate 
3、onForeground 
4、onBackground 
5、onDestroy
```

### 2.2 Page 路由跳转？

```
-router.push({ url: 'pages/Detail' })
-router.replace()、
-router.back()
```

### 2.3 app.json5 和 module.json5 作用？

```
-app.json5：应用全局配置（包名、版本、权限）。
-module.json5：模块配置（入口 Ability、Page 路径）
```

### 2.4  数据存储方式？

```
-Preferences（KV 存储）
-RDB（结构化存储）
-文件系统
```

### 2.5 网络请求方式？

```
import http from '@ohos.net.http'
let task = http.createHttp()
task.request("https://example.com", {}, (err, data) => {})
```

### 2.6 调用系统能力需要注意什么？

```
-在 config.json5 声明权限，如：ohos.permission.CAMERA
-动态申请权限。
```

