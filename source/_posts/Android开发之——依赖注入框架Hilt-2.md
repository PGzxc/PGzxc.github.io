---
title: Android开发之——依赖注入框架Hilt(2)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 31b7bac4
date: 2025-09-13 09:44:19
---
## 一 概述

```
本文介绍：依赖注入框架Hilt相关内容
 -添加 Hilt 依赖与配置
 -@HiltAndroidApp + Application 类
 -在 Activity / Fragment / ViewModel / Service 注入
 -用 @Module 提供依赖 (@Provides、@Binds)
 -作用域（scope）使用
 -限定符（Qualifier）使用
 -使用 @EntryPoint 对不受 Hilt 管理的类注入
 -使用 @ApplicationContext 与 @ActivityContext
```

<!--more-->

## 二 Hilt 简介

### 2.1 介绍

```
-Hilt是Google官方推出的Android依赖注入框架，基于Dagger 2封装，专为Android场景优化。
-相比手写 Dagger，它更轻量、规范化，自动处理了 Android 生命周期相关的依赖注入问题
```

### 2.2 Hilt 的优势

```
-Google 官方支持，AndroidX 生态（Jetpack、WorkManager、Navigation 等）完美支持
-简化依赖注入配置，无需繁琐的 Component / Module 管理
-自动绑定 Android 生命周期（Activity、Fragment、ViewModel、Service 等）
-提升可维护性与可测试性
```

### 2.3  Hilt 预置作用域

|    作用域注解    |      生命周期绑定对象       |          典型场景          |
| :--------------: | :-------------------------: | :------------------------: |
|    @Singleton    |    Application 全局单例     | 全局工具类、网络库、数据库 |
| @ActivityScoped  | 绑定到 `Activity` 生命周期  |  当前 Activity 内共享依赖  |
| @FragmentScoped  | 绑定到 `Fragment` 生命周期  |  当前 Fragment 内共享依赖  |
| @ViewModelScoped | 绑定到 `ViewModel` 生命周期 | 单个 ViewModel 内共享依赖  |
|  @ServiceScoped  |  绑定到 `Service` 生命周期  |    长时间运行的后台服务    |

## 三 入门概念

### 3.1 @HiltAndroidApp + Application 类

```
1、必须在 Application 上加注解，让 Hilt 管理应用级依赖
@HiltAndroidApp
class MyApp : Application()


2、并在 AndroidManifest.xml 中声明
<application
    android:name=".MyApp"
    ... />
```

### 3.2 在 Activity / Fragment / ViewModel / Service 注入

1、Activity 注入

```
@AndroidEntryPoint
class MainActivity : AppCompatActivity() {
    @Inject lateinit var analytics: AnalyticsService
}
```

2、Fragment 注入

```
@AndroidEntryPoint
class HomeFragment : Fragment() {
    @Inject lateinit var repository: UserRepository
}
```

3、ViewModel 注入

```
1、使用 @HiltViewModel + @Inject constructor
@HiltViewModel
class MainViewModel @Inject constructor(
    private val repository: UserRepository
) : ViewModel()


2、在 UI 中获取
@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    private val viewModel: MainViewModel by viewModels()
}
```

4、Service 注入

```
@AndroidEntryPoint
class MyService : Service() {
    @Inject lateinit var tracker: Tracker
}
```

### 3.3 用 @Module 提供依赖

1、@Provides

```
1、概念
-场景：需要自己手动创建对象，或者提供依赖需要一些额外逻辑。
-特点：可以在方法体内写代码，返回想要提供的对象。
-优点：灵活，可以传参，可以写复杂逻辑。
-缺点：方法体执行时会多一点运行时开销。

2、示例
@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {

    @Provides
    fun provideOkHttpClient(): OkHttpClient {
        // 可以写复杂逻辑，比如加拦截器
        return OkHttpClient.Builder()
            .retryOnConnectionFailure(true)
            .build()
    }

    @Provides
    fun provideApi(client: OkHttpClient): ApiService {
        return Retrofit.Builder()
            .baseUrl("https://api.xxx.com")
            .client(client)
            .build()
            .create(ApiService::class.java)
    }
}
```

2、@Binds

```
1、概念
-场景：只做接口到实现类的绑定，不需要额外逻辑。
-特点：必须是 abstract 方法，且只有一个参数（实现类），返回类型是接口。
-优点：没有方法体，编译期确定，性能比 @Provides 更好。
-缺点：只能用在接口/抽象类的绑定，不能写逻辑。


2、示例
interface AnalyticsService {
    fun trackEvent(name: String)
}

class FirebaseAnalyticsService @Inject constructor() : AnalyticsService {
    override fun trackEvent(name: String) { /* ... */ }
}

@Module
@InstallIn(SingletonComponent::class)
abstract class AnalyticsModule {
    @Binds
    abstract fun bindAnalytics(
        impl: FirebaseAnalyticsService
    ): AnalyticsService
}

```

3、对比

|     特性     |              @Provides               |               @Binds                |
| :----------: | :----------------------------------: | :---------------------------------: |
|     用途     |          构建实例、返回依赖          |           绑定接口和实现            |
|   方法类型   |          普通方法，有方法体          |         抽象方法，无方法体          |
|   参数限制   |              可多个参数              |       只能一个参数（实现类）        |
| 是否能写逻辑 |            可以写复杂逻辑            |                不行                 |
|     性能     |            稍有运行时开销            |         更快（编译期优化）          |
|   典型场景   | Retrofit、数据库、带参数构造函数对象 | 接口实现绑定（Repository、Service） |

### 3.4 作用域（Scope）

```
1、Hilt 内置常用作用域：
-@Singleton：整个应用只有一个实例
-@ActivityScoped：同一个 Activity 中共享
-@ViewModelScoped：ViewModel 生命周期内共享

2、示例
@Singleton
class UserRepository @Inject constructor()

@ActivityScoped
class SessionManager @Inject constructor()
```

### 3.5 限定符(Qualifier)

```
1、说明
当有多个相同类型依赖时，用 @Qualifier 区分

2、示例
@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class ProdApi

@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class TestApi

@Module
@InstallIn(SingletonComponent::class)
object ApiModule {
    @ProdApi
    @Provides
    fun provideProdApi(): ApiService = createApi("https://prod.api.com")

    @TestApi
    @Provides
    fun provideTestApi(): ApiService = createApi("https://test.api.com")
}

class Repository @Inject constructor(
    @ProdApi private val api: ApiService
)
```

### 3.6 使用 @EntryPoint 注入非 Hilt 管理类

```
1、说明
有些类（如 BroadcastReceiver、ContentProvider）不能直接用 @AndroidEntryPoint，
可用 @EntryPoint：

2、示例
@EntryPoint
@InstallIn(SingletonComponent::class)
interface MyEntryPoint {
    fun getRepository(): UserRepository
}

class MyReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val entryPoint = EntryPointAccessors.fromApplication(
            context.applicationContext,
            MyEntryPoint::class.java
        )
        val repo = entryPoint.getRepository()
    }
}
```

### 3.7 使用 @ApplicationContext 与 @ActivityContext

```
1、说明
区分不同 Context

2、示例
class StorageHelper @Inject constructor(
    @ApplicationContext private val context: Context
)

class DialogHelper @Inject constructor(
    @ActivityContext private val context: Context
)
```

## 四 项目依赖

### 4.1 、libs.versions.toml

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
hilt = "2.56"
hiltNavigation = "1.2.0"
ksp = "2.2.10-2.0.2"


# Jetpack Compose 相关版本
composeBom = "2025.08.01"

[libraries]
# AndroidX 基础库
androidx-core-ktx = { group = "androidx.core", name = "core-ktx", version.ref = "coreKtx" }
androidx-appcompat = { group = "androidx.appcompat", name = "appcompat", version.ref = "appcompat" }
material = { group = "com.google.android.material", name = "material", version.ref = "material" }
androidx-activity-compose = { group = "androidx.activity", name = "activity-compose", version.ref = "activityCompose" }
androidx-fragment-ktx = { group = "androidx.fragment", name = "fragment-ktx", version.ref = "ktxFragment" } #fragement中使用viewModels()委托

# 测试
junit = { group = "junit", name = "junit", version.ref = "junit" }
androidx-junit = { group = "androidx.test.ext", name = "junit", version.ref = "junitVersion" }
androidx-espresso-core = { group = "androidx.test.espresso", name = "espresso-core", version.ref = "espressoCore" }

# Hilt 依赖
hilt-android = { group = "com.google.dagger", name = "hilt-android", version.ref = "hilt" }
hilt-android-compiler = { group = "com.google.dagger", name = "hilt-android-compiler", version.ref = "hilt" }
hilt-navigation-compose = { group = "androidx.hilt", name = "hilt-navigation-compose", version.ref = "hiltNavigation" }

#compose-bom相关
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-ui = { group = "androidx.compose.ui", name = "ui" }
androidx-ui-graphics = { group = "androidx.compose.ui", name = "ui-graphics" }
androidx-ui-tooling = { group = "androidx.compose.ui", name = "ui-tooling" }
androidx-ui-tooling-preview = { group = "androidx.compose.ui", name = "ui-tooling-preview" }
androidx-ui-test-manifest = { group = "androidx.compose.ui", name = "ui-test-manifest"}
androidx-ui-test-junit4 = { group = "androidx.compose.ui", name = "ui-test-junit4" }
androidx-material3 = { group = "androidx.compose.material3", name = "material3" }


[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
kotlin-compose = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }

#依赖注入
hilt = { id = "com.google.dagger.hilt.android", version.ref = "hilt" }
ksp = { id = "com.google.devtools.ksp", version.ref = "ksp" }
```

### 4.2、build.gradle.kts(项目根目录)

```
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false

    //add
    alias(libs.plugins.kotlin.compose) apply false
    alias(libs.plugins.ksp) apply false
    alias(libs.plugins.hilt) apply false
}
```

### 4.3、app/build.gradle.kts

```
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.hilt)
    alias(libs.plugins.ksp)
    alias(libs.plugins.kotlin.compose)

}

android {
    namespace = "com.pgzxc.hiltdemo"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.pgzxc.hiltdemo"
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
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {

    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.appcompat)
    implementation(libs.material)

    implementation(libs.androidx.fragment.ktx)
    implementation(libs.hilt.navigation.compose)
    //test
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)

    //hilt
    implementation(libs.hilt.android)
    ksp(libs.hilt.android.compiler)

    //compose
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.material3)
    implementation(libs.androidx.ui.tooling.preview)
    implementation(libs.androidx.ui)
    implementation(libs.androidx.activity.compose)

}
```

## 五 项目结构

```
hiltdemo/
 ├── app/
 │   ├── src/main/java/com/example/hiltdemo/
 │   │   ├── MyApp.kt
 |   |   |── MainActivity.kt	
 │   │   ├── di/LoggerModule.kt
 │   │   ├── service/AnalyticsService.kt
 │   │   ├── service/Logger.kt
 │   │   ├── viewmodel/MainViewModel.kt
 │   │   └── ui/MainScreen.kt
 │   └── build.gradle.kts
 ├── build.gradle.kts
 └── settings.gradle.kts
```

## 六 Hilt相关内容(ComposeUI版本)

### 6.1 di(LoggerModule.kt)

```
package com.pgzxc.hiltdemo.di

import com.pgzxc.hiltdemo.service.FileLogger
import com.pgzxc.hiltdemo.service.Logger
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent

// di/LoggerModule.kt
@Module
@InstallIn(SingletonComponent::class)
object LoggerModule {
    @Provides
    fun provideLogger(): Logger = FileLogger()
}
```

### 6.2 service.kt

1、Logger.kt

```
package com.pgzxc.hiltdemo.service

import android.util.Log
import jakarta.inject.Inject

// service/Logger.kt
interface Logger {
    fun log(msg: String): Int
}

class FileLogger @Inject constructor() : Logger {
    override fun log(msg: String) = Log.d("FileLogger", msg)
}
```

2、AnalyticsService.kt

```
package com.pgzxc.hiltdemo.service

import android.util.Log
import jakarta.inject.Inject

// service/AnalyticsService.kt
class AnalyticsService @Inject constructor() {
    fun logEvent(event: String) {
        Log.d("AnalyticsService", "Event: $event")
    }
}
```

### 6.3 ui(MainScreen.kt)

```
package com.pgzxc.hiltdemo.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.pgzxc.hiltdemo.viewmodel.MainViewModel

@Composable
fun MainScreen(viewModel: MainViewModel = hiltViewModel()) {
    val message by viewModel.message.collectAsState()

    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(message, style = MaterialTheme.typography.headlineSmall)

        Spacer(modifier = Modifier.height(20.dp))

        Button(onClick = { viewModel.doWork() }) {
            Text("点我测试依赖注入")
        }
    }
}
```

### 6.4 viewmodel(MainViewModel.kt)

```
package com.pgzxc.hiltdemo.viewmodel

import androidx.lifecycle.ViewModel
import com.pgzxc.hiltdemo.repository.UserRepository
import com.pgzxc.hiltdemo.service.AnalyticsService
import com.pgzxc.hiltdemo.service.Logger
import dagger.hilt.android.lifecycle.HiltViewModel
import jakarta.inject.Inject
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

// ui/MainViewModel.kt
@HiltViewModel
class MainViewModel @Inject constructor(
        private val logger: Logger,
        private val analytics: AnalyticsService
) : ViewModel() {

    private val _message = MutableStateFlow("Hello Hilt + Compose!")
    val message: StateFlow<String> = _message

    fun doWork() {
        logger.log("ViewModel is working...")
        analytics.logEvent("Compose Screen Event")
        _message.value = "Hilt 已成功注入依赖 ✅"
    }
}
```

### 6.4 MainActivity.kt

```
package com.pgzxc.hiltdemo

import android.os.Bundle
import androidx.activity.compose.setContent
import androidx.appcompat.app.AppCompatActivity
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import com.pgzxc.hiltdemo.service.AnalyticsService
import com.pgzxc.hiltdemo.ui.MainScreen
import dagger.hilt.android.AndroidEntryPoint
import jakarta.inject.Inject

@AndroidEntryPoint
class MainActivity : AppCompatActivity() {

    @Inject
    lateinit var analytics: AnalyticsService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        analytics.logEvent("MainActivity Started")
        setContent {
            MaterialTheme {
                MainScreen()
            }
        }
    }
}

@Composable
fun Greeting(name: String) {
    Text(text = name)
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    Greeting("Preview Text")
}
```

### 6.5 MyApp.kt

```
package com.pgzxc.hiltdemo

import android.app.Application
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class MyApp: Application()
```

### 6.6 AndroidManifest.xml

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
        android:theme="@style/Theme.HiltDemo">

        <activity android:name=".MainActivity" android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        </application>

</manifest>
```

### 6.7 效果

```
1、App 启动 → MainActivity 自动注入 AnalyticsService。
2、Compose UI 加载 → MainViewModel 自动注入 Logger + AnalyticsService。
3、点击按钮 → Logcat 输出：
 AnalyticsService: Event: MainActivity Started
 FileLogger: ViewModel is working...
 AnalyticsService: Event: Compose Screen Event
 
4、UI 文案 更新为 Hilt 已成功注入依赖 ✅ 
```

图示

![][1]

## 七 参考示例

```
https://github.com/PGzxc/DISamples
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-di-hilt-demo-2.gif