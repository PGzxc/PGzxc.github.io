---
title: KMP面试题之——专家级之测试与发布(13)
categories:
  - 面试相关
  - KMP面试题
tags:
  - KMP面试题
abbrlink: d18b404b
date: 2025-10-19 09:01:34
---
## 一 概述

```
1.如何在 KMP 项目中进行多平台单元测试？
2.如何配置 commonTest、androidTest、iosTest？
3.如何使用 Ktor MockEngine 测试跨平台网络逻辑？
4.如何发布 KMP 库到 Maven Central？
5.如何在 CI/CD 流程中构建与验证多平台产物？
```

<!--more-->

## 二 面试题解答(仅供参考)

### 2.1 如何在 KMP 项目中进行多平台单元测试？

1、核心考点

```
测试架构、共享逻辑验证、平台差异处理
```

2、解答

```
1、说明
KMP 支持在 commonTest 层编写一次测试，自动在各平台运行。
通过 Kotlin Test Framework (kotlin("test")) 统一测试 API

2、配置
dependencies {
    commonTestImplementation(kotlin("test"))
    androidTestImplementation("androidx.test:runner:1.5.2")
    iosTestImplementation(kotlin("test"))
}

3、常见测试类型
-业务逻辑测试：测试共享逻辑（Repository、UseCase）。
-期望声明 (expect/actual) 测试：验证平台差异行为。
-MockEngine 网络测试（见问题 3）

4、运行方式
-./gradlew :shared:allTests 运行全部平台测试。
-或在 IDE 中选择对应 Target（如 Android/iOS Simulator）。
```

3、面试关键点

```
展现你能统一测试框架、隔离平台特性，并保证 CI 可复现
```

### 2.2 如何配置 commonTest、androidTest、iosTest？

1、目录结构示例

```
shared/
 ├── src/
 │   ├── commonMain/
 │   ├── commonTest/
 │   ├── androidMain/
 │   ├── androidTest/
 │   ├── iosMain/
 │   └── iosTest/
```

2、Gradle 配置要点

```
kotlin {
    androidTarget()
    iosX64()
    iosArm64()
    iosSimulatorArm64()

    sourceSets {
        val commonTest by getting {
            dependencies {
                implementation(kotlin("test"))
            }
        }
        val androidTest by getting
        val iosTest by creating {
            dependsOn(commonTest)
            iosX64Test.dependsOn(this)
            iosArm64Test.dependsOn(this)
        }
    }
}
```

3、测试执行

```
Android → ./gradlew connectedAndroidTest
iOS → ./gradlew iosX64Test 或通过 Xcode scheme。
```

4、技巧

```
对 iOS 使用 iosSimulatorArm64() 可直接在 Apple Silicon Mac 上本地跑测试
```

### 2.3 如何使用 Ktor MockEngine 测试跨平台网络逻辑？

1、考点

```
跨平台网络层可测性
```

2、示例

```
1、说明
Ktor 提供 MockEngine，用于拦截网络请求并模拟响应

2、示例
val mockEngine = MockEngine { request ->
    respond(
        content = """{"code": 200, "data": "ok"}""",
        status = HttpStatusCode.OK,
        headers = headersOf("Content-Type" to listOf("application/json"))
    )
}

val client = HttpClient(mockEngine)
val api = MyApi(client)
val result = api.fetchData()
assertEquals("ok", result)
```

3、优点

```
-不依赖真实服务器。
-支持多平台。
-可精确验证 Header、Body。
```

4、面试关键点

```
强调「可重复性测试」与「网络层 mock 化能力」
```

### 2.4 如何发布 KMP 库到 Maven Central？

1、考点

```
产物管理、版本发布、构建流程。
```

2、常用插件

```
plugins {
    id("maven-publish")
    id("signing")
}
```

3、配置示例

```
publishing {
    publications {
        withType<MavenPublication> {
            groupId = "io.github.username"
            artifactId = "shared"
            version = "1.0.0"
            from(components["kotlin"])
        }
    }
    repositories {
        maven {
            url = uri("https://s01.oss.sonatype.org/service/local/staging/deploy/maven2/")
            credentials {
                username = findProperty("ossrhUsername") as String
                password = findProperty("ossrhPassword") as String
            }
        }
    }
}
signing {
    sign(publishing.publications)
}
```

4、要点

```
gradlew publishToMavenLocal → 本地验证。
gradlew publish → 上传到 Maven Central。
使用 Sonatype 账号审批。
自动化推荐使用 GitHub Actions + secrets。
```

### 2.5 如何在 CI/CD 流程中构建与验证多平台产物？

1、核心考点

```
CI 跨平台构建、测试自动化、发布安全性。
```

2、常见方案

```
GitHub Actions（推荐）
GitLab CI
CircleCI
```

3、示例（GitHub Actions）

```
jobs:
  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: 17
          distribution: 'temurin'
      - uses: gradle/gradle-build-action@v3
      - run: ./gradlew build allTests publishToMavenLocal
```

4、验证内容

```
-commonTest 单元测试。
-androidTest 运行于 Emulator。
-iosTest 在 macOS runner 上运行。
-publishToMavenLocal 验证产物结构。
-最终部署到 MavenCentral / GitHub Packages
```

5、面试亮点

```
展现你能搭建一条「KMP 全端构建流水线」—— 自动构建、测试、签名与发布。
```

## 三 总结

|   主题   |         考察点          |           关键亮点            |
| :------: | :---------------------: | :---------------------------: |
| 测试体系 | commonTest/platformTest | 统一逻辑验证、MockEngine 测试 |
| 目录结构 |    多平台 sourceSets    | iOS Test dependsOn commonTest |
| 发布流程 |   MavenCentral + GPG    |  Gradle publishing & signing  |
|  CI/CD   |     多平台构建验证      |  GitHub Actions 全流程自动化  |
| 能力体现 | 可交付、可维护、可测试  |   工程化意识与质量保障能力    |

