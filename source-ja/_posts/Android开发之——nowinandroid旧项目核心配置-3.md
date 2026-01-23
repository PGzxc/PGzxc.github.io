---
title: Android开发之——nowinandroid旧项目核心配置(3)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: a265ee17
date: 2025-08-05 09:29:09
---
## 一 概述

```
本文介绍Gradle构建模块的三个核心配置
-定义插件模块的元信息(group、version)
-配置版本目录(Version Catalog)
-定义插件容器(gradlePlugin.plugins)
```

<!--more-->

## 二 定义插件模块的元信息(group、version)

### 2.1 概念

```
group = "com.joker.coolmall.buildlogic"
version = "1.0.0"
```

### 2.2 作用

|  属性   |                      含义                       |                举例                 |
| :-----: | :---------------------------------------------: | :---------------------------------: |
|  group  | 插件模块的唯一组织标识(类似 Maven 的 `groupId`) | 如：`com.joker.coolmall.buildlogic` |
| version |    插件模块的版本号(类似 Maven 的 `version`)    |             如：`1.0.0`             |

### 2.3 说明

```
如果你要将插件发布到私有仓库或使用 includeBuild() 本地构建时，
它们会被当作 group:artifact:version 三元组识别。
```

## 三 配置版本目录(Version Catalog)

### 3.1 示例

```
versionCatalogs {
    create("libs") {
        from(files("../gradle/libs.versions.toml"))
    }
}
```

### 3.2 作用

```
引入主项目的版本定义文件（libs.versions.toml），
让构建逻辑模块（如插件模块）也能访问统一的版本配置。
```

### 3.3 `libs.versions.toml` 是什么？

```
1、说明
这是一个统一集中管理依赖版本的文件，位于主项目的 gradle/ 文件夹中，

2、示例：
[versions]
kotlin = "1.9.22"
hilt = "2.48"

[plugins]
ksp = { id = "com.google.devtools.ksp", version = "1.9.22-1.0.17" }

[libraries]
hilt-android = { module = "com.google.dagger:hilt-android", version.ref = "hilt" }

3、作用举例
在你写插件时可以这样
dependencies {
    implementation(libs.hilt.android)
}
不用手动写 com.google.dagger:hilt-android:2.48，统一来源、版本一致、升级方便。
```

## 四 定义插件容器(gradlePlugin.plugins)

### 4.1 示例

```
gradlePlugin {
    plugins {
        register("androidApplication") {
            id = "com.joker.coolmall.android.application"
            implementationClass = "com.joker.coolmall.AndroidApplicationPlugin"
        }
        register("androidCompose") {
            id = "com.joker.coolmall.android.compose"
            implementationClass = "com.joker.coolmall.AndroidComposePlugin"
        }
    }
}
```

### 4.2 作用

```
正式注册你在插件模块中实现的每一个插件，让它们在主项目中可以 id("...") 形式引用。
```

### 4.3 每一项的含义

|        字段         |                        说明                        |
| :-----------------: | :------------------------------------------------: |
|   register("xxx")   |    插件的逻辑名称（用于在 `plugins {}` 中引入）    |
|     id = "xxx"      |     插件的唯一 ID，模块中通过 `id("...")` 引用     |
| implementationClass | 插件实现类的完整路径，通常继承自 `Plugin<Project>` |

### 4.4 插件类示例

```
// src/main/kotlin/com/joker/coolmall/AndroidApplicationPlugin.kt
class AndroidApplicationPlugin : Plugin<Project> {
    override fun apply(project: Project) {
        project.pluginManager.apply("com.android.application")
        project.extensions.configure<com.android.build.gradle.AppExtension>("android") {
            compileSdkVersion(34)
            defaultConfig {
                minSdk = 24
            }
        }
    }
}
```

### 4.5 使用方式总结(模块引用)

```
主项目中引用你注册的插件如下
plugins {
    id("com.joker.coolmall.android.application")
    id("com.joker.coolmall.android.compose")
}

Gradle 会自动在 build-logic 的插件容器中查找并应用
```

## 五 总结

|      名称      |             代码片段             |            作用            |
| :------------: | :------------------------------: | :------------------------: |
| 插件模块元信息 | group = "xxx"` `version = "1.0"  |     定义模块 ID 和版本     |
|    版本目录    |     versionCatalogs { ... }      |      引入版本别名支持      |
|    插件容器    | gradlePlugin { plugins { ... } } | 注册多个插件供其他模块调用 |

