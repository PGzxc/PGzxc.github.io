---
title: Android开发之——依赖注入框架Dagger2(3)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 64da2450
date: 2025-09-14 08:10:04
---
## 一 概述

```
本文介绍：依赖注入框架Dagger2相关内容
 -Dagger2介绍
 -项目配置(composeui版本)
 -核心注解与使用
 -示例
```

<!--more-->

## 二 Dagger2介绍

### 2.1 概念

```
Dagger2 是 Google 官方推荐的依赖注入（DI，Dependency Injection）框架，
核心作用是 自动管理对象的创建和依赖关系，
减少手动 new 和耦合，提高代码可维护性
```

### 2.2 优点

```
-编译期生成代码，运行期性能高。
-无需反射，安全可靠。
-可管理复杂依赖关系的 Android 应用。
```

### 2.3 术语

```
-Component（组件）：桥梁，负责注入依赖对象。
-Module（模块）：提供依赖对象的创建方法。
-@Inject：标记构造函数、字段或方法，用于注入依赖。
-@Provides：Module 中提供对象实例的方法。
-@Singleton：单例注解，保证对象在 Component 生命周期内唯一。
```

## 三 项目配置(composeui版本)

### 3.1 配置位置

```
1、app/build.gradke.kts
```

### 3.2 配置内容—注意兼容性

```
1、plugin
plugins {
    alias(libs.plugins.ksp) //编译compile时
}


2、dependencies依赖
implementation(libs.dagger)
 ksp(libs.dagger.compiler)
```

## 四 核心注解与使用

### 4.1 @Inject 构造函数注入

```
class Engine @Inject constructor() {
    fun start() = "Engine started"
}
```

### 4.2 @Module + @Provides 提供依赖

```
@Module
class CarModule {
    @Provides
    fun provideCar(engine: Engine): Car {
        return Car(engine)
    }
}
```

### 4.3 @Component 注入

```
@Component(modules = [CarModule::class])
interface CarComponent {
    fun inject(activity: MainActivity)
}
```

### 4.4 使用依赖

```
class Car @Inject constructor(private val engine: Engine) {
    fun drive() = engine.start()
}

class MainActivity : AppCompatActivity() {

    @Inject
    lateinit var car: Car

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        DaggerCarComponent.create().inject(this)

        println(car.drive()) // 输出 Engine started
    }
}
```

### 4.5 单例模式(Singleton)

```
@Module
class EngineModule {
    @Provides
    @Singleton
    fun provideEngine() = Engine()
}

@Singleton
@Component(modules = [EngineModule::class])
interface SingletonComponent {
    fun engine(): Engine
}
```

## 五 示例

### 5.1 依赖

1、libs.versions.toml

```
[versions]
agp = "8.12.0"
kotlin = "2.2.10"
coreKtx = "1.16.0"
junit = "4.13.2"
junitVersion = "1.2.1"
espressoCore = "3.6.1"
appcompat = "1.7.0"
material = "1.12.0"

#添加
ktxFragment = "1.8.9"
activityCompose = "1.10.1"
ksp = "2.2.10-2.0.2"
dagger = "2.57.1"


# Jetpack Compose 相关版本
composeBom = "2025.08.01"

[libraries]
# AndroidX 基础库
androidx-core-ktx = { group = "androidx.core", name = "core-ktx", version.ref = "coreKtx" }
androidx-appcompat = { group = "androidx.appcompat", name = "appcompat", version.ref = "appcompat" }
material = { group = "com.google.android.material", name = "material", version.ref = "material" }
androidx-activity-compose = { group = "androidx.activity", name = "activity-compose", version.ref = "activityCompose" }
androidx-fragment-ktx = { group = "androidx.fragment", name = "fragment-ktx", version.ref = "ktxFragment" } #fragement中使用viewModels()委托


junit = { group = "junit", name = "junit", version.ref = "junit" }
androidx-junit = { group = "androidx.test.ext", name = "junit", version.ref = "junitVersion" }
androidx-espresso-core = { group = "androidx.test.espresso", name = "espresso-core", version.ref = "espressoCore" }


#compose-bom相关
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-ui = { group = "androidx.compose.ui", name = "ui" }
androidx-ui-graphics = { group = "androidx.compose.ui", name = "ui-graphics" }
androidx-ui-tooling = { group = "androidx.compose.ui", name = "ui-tooling" }
androidx-ui-tooling-preview = { group = "androidx.compose.ui", name = "ui-tooling-preview" }
androidx-ui-test-manifest = { group = "androidx.compose.ui", name = "ui-test-manifest"}
androidx-ui-test-junit4 = { group = "androidx.compose.ui", name = "ui-test-junit4" }
androidx-material3 = { group = "androidx.compose.material3", name = "material3" }


dagger = { group = "com.google.dagger", name = "dagger", version.ref = "dagger"}
dagger-compiler = { group = "com.google.dagger", name = "dagger-compiler", version.ref = "dagger"}

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }


kotlin-compose = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }
ksp = { id = "com.google.devtools.ksp", version.ref = "ksp" }
```

2、项目根目录/build.gradle.kts

```
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false

    //add
    alias(libs.plugins.kotlin.compose) apply false
    alias(libs.plugins.ksp) apply false
}
```

3、app/build.gradle.kts

```
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)

    alias(libs.plugins.ksp)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.pgzxc.dagger2demo"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.pgzxc.dagger2demo"
        minSdk = 25
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }
    buildFeatures {
        compose = true
    }
    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
}

dependencies {

    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.appcompat)
    implementation(libs.material)


    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)

    implementation(libs.dagger)
    ksp(libs.dagger.compiler)

    //compose
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.material3)
    implementation(libs.androidx.ui.tooling.preview)
    implementation(libs.androidx.ui)
    implementation(libs.androidx.activity.compose)


}
```

### 5.2 代码

1、component/AppComponent.kt

```
package com.pgzxc.dagger2demo.component

import com.pgzxc.dagger2demo.MainActivity
import com.pgzxc.dagger2demo.di.AnalyticsModule
import com.pgzxc.dagger2demo.di.NetworkModule
import dagger.Component
import jakarta.inject.Singleton

@Singleton
@Component(modules = [AnalyticsModule::class, NetworkModule::class])
interface AppComponent {
    fun inject(activity: MainActivity)
}
```

2、di/AnalyticsModule.kt

```
package com.pgzxc.dagger2demo.di

import com.pgzxc.dagger2demo.service.AnalyticsService
import com.pgzxc.dagger2demo.service.ApiService
import com.pgzxc.dagger2demo.service.FirebaseAnalyticsService
import dagger.Binds
import dagger.Module
import dagger.Provides

@Module
interface AnalyticsModule {
    @Binds
    fun bindAnalytics(impl: FirebaseAnalyticsService): AnalyticsService
}
```

3、di/NetworkModule.kt

```
package com.pgzxc.dagger2demo.di

import com.pgzxc.dagger2demo.service.ApiService
import dagger.Module
import dagger.Provides

@Module
object NetworkModule {
    @Provides
    fun provideApiService(): ApiService {
        return ApiService("https://api.example.com")
    }
}
```

4、service/AnalyticsService.kt

```
package com.pgzxc.dagger2demo.service

// 定义接口
interface AnalyticsService {
    fun trackEvent(event: String): String
}
```

5、service/ApiService.kt

```
package com.pgzxc.dagger2demo.service

// 模拟一个网络服务
class ApiService(private val baseUrl: String) {
    fun fetchData(): String = "Data from $baseUrl"
}
```

6、FirebaseAnalyticsService.kt

```
package com.pgzxc.dagger2demo.service

import jakarta.inject.Inject

// 实现类
class FirebaseAnalyticsService @Inject constructor() : AnalyticsService {
    override fun trackEvent(event: String): String {
        return "Firebase tracking: $event"
    }
}
```

7、ui/AppScreen.kt

```
package com.pgzxc.dagger2demo.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.pgzxc.dagger2demo.service.AnalyticsService
import com.pgzxc.dagger2demo.service.ApiService


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AppScreen(analytics: AnalyticsService, apiService: ApiService) {
    var message by remember { mutableStateOf("点击按钮触发事件") }

    Scaffold(topBar = { TopAppBar(title = { Text("Dagger2 + Compose Demo") }) }) { padding ->
        Column(modifier = Modifier.fillMaxSize().padding(padding).padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)) {
            Text(text = message)
            Button(onClick = { message = analytics.trackEvent("Button Clicked") }) {
                Text("触发 Analytics")
            }

            Button(onClick = { message = apiService.fetchData() }) {
                Text("请求 API 数据")
            }
        }
    }



}
```

8、MainActivity.kt

```
package com.pgzxc.dagger2demo

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.pgzxc.dagger2demo.service.AnalyticsService
import com.pgzxc.dagger2demo.service.ApiService
import com.pgzxc.dagger2demo.ui.AppScreen
import jakarta.inject.Inject

class MainActivity : ComponentActivity() {

    @Inject
    lateinit var analytics: AnalyticsService
    @Inject lateinit var apiService: ApiService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        (application as MyApp).appComponent.inject(this)     // 注入

        setContent {
            AppScreen(analytics, apiService)
        }
    }
}
```

10、MyApp.kt

```
package com.pgzxc.dagger2demo

import android.app.Application
import com.pgzxc.dagger2demo.component.AppComponent
import com.pgzxc.dagger2demo.component.DaggerAppComponent

class MyApp : Application() {
    lateinit var appComponent: AppComponent
        private set

    override fun onCreate() {
        super.onCreate()
        appComponent = DaggerAppComponent.create()
    }
}
```

### 5.3 AndroidManifest.xml

```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <application
        android:allowBackup="true"
        android:name=".MyApp"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.Dagger2Demo" >

        <activity android:name=".MainActivity" android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>
</manifest>
```

### 5.4 效果图

![][1]

## 六 总结

### 6.1 注意事项

```
1、字段注入 vs 构造函数注入
-构造函数注入优先使用，简洁且类型安全。
-字段注入用于 Android 组件（Activity、Fragment）生命周期受控对象。

2、Component 层级
-可以使用 Subcomponent 管理复杂依赖关系

3、避免循环依赖
-Dagger2 不允许循环依赖，需重构或使用 Provider 延迟注入。

4、Kotlin + Dagger2
-注意 lateinit var 用于字段注入。
-构造函数注入最简洁且安全。
```

### 6.2 总结

```
1、Dagger2 核心：
-@Inject
-@Module
-@Provides
-@Component

2、使用流程：
-定义依赖类并用 @Inject 标注。
-定义 Module 提供复杂对象。
-创建 Component 并注入对象。
-使用注入对象。
```
## 七 参考示例

```
https://github.com/PGzxc/DISamples
```

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-di-dagger2-demo-3.gif