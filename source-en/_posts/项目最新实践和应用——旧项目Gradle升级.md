---
title: 项目最新实践和应用——旧项目Gradle升级
categories:
  - 开发
  - U-项目实践
  - Android项目
tags:
  - Android项目
abbrlink: b871562a
date: 2025-08-26 10:19:31
---
## 一 概述

```
旧 Android 项目 Gradle 升级 其实是很多人踩坑的地方，
因为 AGP（Android Gradle Plugin）版本、Gradle 版本、JDK 版本 都要对应，否则容易编译失败。
下面我帮你整理一份清晰的升级步骤
```

<!--more-->

## 二 对照官方兼容表

### 2.1 Google 官方有 **AGP ↔ Gradle 对应表**（常见版本）

| AGP <br>(com.android.tools.build:gradle) | Gradle 版本要求 | JDK 要求 |
| :--------------------------------------: | :-------------: | :------: |
|                  4.1.x                   |   6.5 – 6.7.1   |  JDK 8   |
|                  4.2.x                   |   6.7.1 – 7.0   | JDK 8/11 |
|                  7.0.x                   |    7.0 – 7.2    |  JDK 11  |
|                  7.2.x                   |   7.2 – 7.3.3   |  JDK 11  |
|                  7.4.x                   |    7.5 – 7.6    |  JDK 11  |
|                  8.0.x                   |    8.0 – 8.1    |  JDK 17  |
|                  8.1.x                   |    8.2 – 8.3    |  JDK 17  |
|                  8.2.x                   |    8.4 – 8.5    |  JDK 17  |
|               8.3.x(最新)                |      8.6+       |  JDK 17  |

### 2.2 一般建议

```
如果项目还在维护 → 升级到 AGP 8.2.x / Gradle 8.5（稳定）
如果只是能跑 → 先升级到 AGP 7.0.x + Gradle 7.0+，过渡
```

## 三 当前状态及升级阶段说明

### 3.1 当前状态

```
1、配置
 Gradle: 4.1
 对应的 AGP (Android Gradle Plugin): 大概率是 3.0.x ~ 3.1.x
 对应 JDK: 只能用 JDK 8
 
2、说明
这个版本非常老（2017 年左右），如果直接跳到 Gradle 8.x + AGP 8.x 会报一堆错，需要 分阶段升级
```

### 3.2 升级阶段说明

```
阶段 1：过渡版本(升到)
 Gradle 6.7.1
 AGP 4.2.2
 JDK 8/11 都可
 
这样可以先把 compile → implementation、jcenter → mavenCentral 等大坑解决。 
 
 
阶段 2：迁移到 AGP 7(升到)
 Gradle 7.2
 AGP 7.0.4
 JDK 11 必须
 
需要改 settings.gradle，引入 pluginManagement，把所有库源迁到 google()/mavenCentral() 
 
阶段 3：最新稳定 (升到)
 Gradle 8.5
 AGP 8.2.2
 JDK 17 必须
 
这个阶段要升级 compileSdk → 34，并修复 AGP 8 的 breaking changes（比如非 transitive R class） 
```

## 四 Gradle 升级路线对照表

### 4.1 阶段 0(当前状态)

```
1、gradle-wrapper.properties
# gradle/wrapper/gradle-wrapper.properties
distributionUrl=https\://services.gradle.org/distributions/gradle-4.1-all.zip

2、根 build.gradle
dependencies {
    classpath "com.android.tools.build:gradle:3.0.1"
}

3、说明
 JDK: 8
 compileSdkVersion: 很可能 26–28
```

### 4.2 阶段 1：升级到 AGP 4.2.2 + Gradle 6.7.1

```
1、说明
这是 Google 官方建议的过渡版本，改动相对少

2、gradle-wrapper.properties
# gradle-wrapper.properties
distributionUrl=https\://services.gradle.org/distributions/gradle-6.7.1-all.zip

3、根 build.gradle
dependencies {
    classpath "com.android.tools.build:gradle:4.2.2"
}

4、修改点
compile → 改成 implementation 或 api
testCompile → 改成 testImplementation
androidTestCompile → 改成 androidTestImplementation
jcenter() → 全部换成 mavenCentral()
```

### 4.3 阶段 2：升级到 AGP 7.0.4 + Gradle 7.2

```
1、gradle-wrapper.properties
# gradle-wrapper.properties
distributionUrl=https\://services.gradle.org/distributions/gradle-7.2-all.zip

2、根 build.gradle
dependencies {
    classpath "com.android.tools.build:gradle:7.0.4"
}
3、settings.gradle（AGP 7+ 新写法）
// settings.gradle（AGP 7+ 新写法）
pluginManagement {
    repositories {
        gradlePluginPortal()
        google()
        mavenCentral()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
rootProject.name = "你的项目名"
include(":app")

4、修改点
 必须用 JDK 11(需要 JDK 11。此阶段必须修改 settings.gradle)
 Kotlin 插件升级到 1.5+
 compileSdkVersion 建议升级到 31+
```

### 4.4 阶段 3：升级到 AGP 8.2.2 + Gradle 8.5

```
1、gradle-wrapper.properties
# gradle-wrapper.properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.5-all.zip

2、根 build.gradle
plugins {
    id "com.android.application" version "8.2.2" apply false
    id "org.jetbrains.kotlin.android" version "1.9.22" apply false
}

3、app/build.gradle
plugins {
    id "com.android.application"
    id "org.jetbrains.kotlin.android"
}

android {
    namespace "com.example.app"
    compileSdk 34

    defaultConfig {
        applicationId "com.example.app"
        minSdk 21
        targetSdk 34
        versionCode 1
        versionName "1.0"
    }

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}

4、修改点
 必须用 JDK 17(这是当前最新稳定版，需要 JDK 17)
 namespace 必须写在 android {} 里（AGP 8 要求）
 删除 buildToolsVersion（AGP 8 自动管理）
 建议 compileSdk = 34、targetSdk = 34
```

## 五 升级时可能遇到的问题

### 5.1 依赖库太旧

```
一些第三方库只支持 jcenter → 需要找 fork 版本或迁到 MavenCentral
```

### 5.2 Kotlin 插件版本过低

```
AGP 7+ 需要 Kotlin 至少 1.5+，AGP 8 推荐 1.9.x
```

### 5.3 Java 语法限制

```
1、说明
 AGP 8 默认开启 Java 11+ 语法，需要在 compileOptions 配置
 
2、配置
android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_11
        targetCompatibility JavaVersion.VERSION_11
    }
}
```

## 六 总结

### 6.1 常见兼容性问题

```
1、compileSdkVersion 太低
 升级到 33 或 34，否则新库不兼容。

2、compile 已废弃 → 改为 implementation / api
3、jcenter() 已停用 → 换 mavenCentral()
4、buildToolsVersion 可删掉，新版自动选择。
5、Kotlin 插件 也要升级，比如
plugins {
    id "org.jetbrains.kotlin.android" version "1.9.22" apply false
}
```

### 6.2 升级策略

```
1、逐步升级：
 不要从 AGP 4.1 一口气升到 8.x，建议 4.1 → 7.0 → 8.2。

2、开分支升级：
 避免破坏旧项目，先拉一个 upgrade-gradle 分支。

3、遇到 API 变化：
 用 Android Studio 的 Refactor → Migrate to AndroidX / Replace Deprecated 工具辅助
```

### 6.3 升级步骤

```
1、第一步：Gradle 6.7.1 + AGP 4.2.2（最平稳）
2、第二步：Gradle 7.2 + AGP 7.0.4（迁移 JDK 11）
3、第三步：Gradle 8.5 + AGP 8.2.2（迁移 JDK 17，namespace 等新特性）
```

