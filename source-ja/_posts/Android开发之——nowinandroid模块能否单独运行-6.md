---
title: Android开发之——nowinandroid模块能否单独运行(6)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 80677b3a
date: 2025-08-05 09:30:45
---
## 一 概述

```
在 nowinandroid 项目中，各个 feature-xxx 模块本身不能单独运行为应用，
它们是被设计成“功能模块”而非“可运行的 App 模块”。
项目整体采用的是 模块化(modularized)+ 单App启动入口(app module)的架构形式。
```

<!--more-->

## 二 为什么模块不能单独运行？

### 2.1 模块没有 applicationId 和 MainActivity

```
-feature-* 模块的 build.gradle.kts 使用的插件通常是：
plugins {
    id("nowinandroid.android.feature")
}
-这个插件本质上是 com.android.library，代表它是 Library 类型，不是独立的可执行 App。
-没有 applicationId、没有 android:label、没有 MainActivity，不能作为应用启动。
```

### 2.2 路由/依赖都依赖主工程协作

```
-模块中的导航路由使用的是Navigation Compose的NavGraphBuilder.xxxRoute()扩展函数，只
在主路由中被 include 调用。

-通常 ViewModel 的注入(Hilt)、UseCase注入、Repository注入都在上层或主模块中处理，
单模块无法独立组装依赖链。
```

## 三  有没有办法让模块独立运行或调试？

可以，但需**手动修改部分结构**或使用 **模块独立运行调试方案**

### 3.1 方案1：为某个模块创建单独入口(推荐用于调试)

```
以 feature-bookmarks 模块为例，你可以这样做

1、修改插件为 com.android.application：在 feature-bookmarks/build.gradle.kts 中：
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("dagger.hilt.android.plugin")
}
2、 添加 application 配置
android {
    namespace = "com.example.bookmarks"
    defaultConfig {
        applicationId = "com.example.bookmarks"
        ...
    }
}
3、创建单独的入口 Activity
@AndroidEntryPoint
class BookmarksStandaloneActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            NowInAndroidTheme {
                BookmarksRoute(
                    onTopicClick = {},
                    onNewsResourceClick = {},
                )
            }
        }
    }
}
4、 配置 AndroidManifest.xml
<application
    android:name=".MyApplication"
    ...>
    <activity android:name=".BookmarksStandaloneActivity">
        <intent-filter>
            <action android:name="android.intent.action.MAIN"/>
            <category android:name="android.intent.category.LAUNCHER"/>
        </intent-filter>
    </activity>
</application>

5、这样，你就可以独立运行 feature-bookmarks 模块进行调试了。
```

### 3.2 方案2：使用 feature-sandbox 调试模块(官方推荐)

```
1、推荐方式
其实官方项目有一个默认的推荐调试方式 —— 运行主项目 app 模块，
在导航中添加入口跳转你要调试的模块。

2、示例：例如，在 NavGraph.kt 添加：
composable(route = "debug_bookmarks") {
    BookmarksRoute(
        onTopicClick = {},
        onNewsResourceClick = {},
    )
}

3、然后你就能在主 App 中跳转测试各个模块
```

### 3.3 注意事项

```
-独立运行的模块如果使用 Hilt，需要定义独立的 @HiltAndroidApp Application。
-如果模块依赖 shared repo/usecase，需要 mock 或引入依赖。
-仅适合调试/开发阶段，正式版本仍建议使用 app 模块为统一入口。
```

## 四 总结

|      模块      | 是否可独立运行 |           原因            |
| :------------: | :------------: | :-----------------------: |
|   feature-*    |   ❌ 默认不行   | 是 `library` 类型，无入口 |
|     core-*     | ❌ 仅工具类模块 |   无 UI，依赖由上层调用   |
|      app       |  ✅ 项目主入口  |  拥有完整依赖关系与路由   |
| 自定义调试模块 |    ✅ 可配置    | 修改插件 + 添加 Activity  |

