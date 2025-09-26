---
title: Android开发之——nowinAndroid项目spotless模块(10)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 1b05a633
date: 2025-09-26 16:59:14
---
## 一 概述

```
本文介绍:
 -NowinAndroid(NIA)项目下spotless模块
 -模块剖析:spotless
```

<!--more-->

## 二 项目结构

```
spotless/
 ├── copyright.kt
 ├── copyright.kts
 └── copyright.xml
```

## 三 文件列表与作用

|    文件名     |     类型      |                             作用                             |
| :-----------: | :-----------: | :----------------------------------------------------------: |
| copyright.kt  |    Kotlin     | 用于 Kotlin/Java 文件的版权声明规则配置，通常通过 Spotless DSL 在 Gradle Plugin 中引用。 |
| copyright.kts | Kotlin Script |   用于 Gradle Kotlin 脚本（*.gradle.kts）的版权声明配置。    |
| copyright.xml |      XML      |    用于 XML 文件（布局、资源文件等）的版权声明规则配置。     |

## 四 核心逻辑

### 4.1 版权声明统一管理

```
-每个文件类型有自己的模板或者规则。
-Spotless 在检查/格式化时，会在文件顶部加入或校验版权信息。
```

### 4.2 在插件中应用

```
SpotlessConventionPlugin.kt 会引用这些文件，根据文件类型调用相应规则：
spotless {
    kotlin {
        target("**/*.kt")
        licenseHeaderFile(rootProject.file("spotless/copyright.kt"))
    }
    kotlinGradle {
        target("**/*.gradle.kts")
        licenseHeaderFile(rootProject.file("spotless/copyright.kts"))
    }
    format("xml") {
        target("**/*.xml")
        licenseHeaderFile(rootProject.file("spotless/copyright.xml"))
    }
}
```

### 4.3 自动化效果

```
-新建或修改文件时，Spotless 会自动检查版权头是否存在。
-如果缺失或不符合模板，spotlessCheck 会报错，spotlessApply 可以自动修复。
```

## 五 总结

```
-spotless 模块不仅统一代码风格，还 统一版权声明。
-每种文件类型都有对应的版权模板文件：.kt、.kts、.xml。
-插件负责将这些规则应用到全项目的各模块中。
```

