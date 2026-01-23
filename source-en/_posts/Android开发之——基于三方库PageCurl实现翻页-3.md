---
title: Android开发之——基于三方库PageCurl实现翻页(3)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: b017168d
date: 2025-09-09 18:02:39
---
## 一 概述

```
本文介绍：
 -基于三方库：PageCurl实现翻页特效
 -开发语言：Jetpack Composeui
 -实现：默认实现、点击切换、本地/网络图片
```

<!--more-->

## 二 代码实现

### 2.1 添加依赖(build.gradle.kts)

```
1、plugins
plugins {
    id("org.jetbrains.kotlin.plugin.compose") version "2.0.20" // 跟你使用的 Kotlin 版本对应
}

2、android
buildFeatures {
    compose = true
}

3、dependencies
dependencies {

    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.appcompat)
    implementation(libs.material)
    implementation(libs.androidx.runtime)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)

    //pagecurl
    implementation(libs.pagecurl)

    // Compose BOM 管理版本
    implementation(platform("androidx.compose:compose-bom:2025.08.01"))

    // Compose UI 基础
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-tooling-preview")

    // Material 设计组件（推荐 Material3）
    implementation("androidx.compose.material3:material3")

    // 可选 Material2 (如果项目还用旧版)
    // implementation("androidx.compose.material:material")

    // 运行时支持
    implementation("androidx.compose.runtime:runtime")
    implementation("androidx.compose.runtime:runtime-livedata")

    // Activity/生命周期支持
    implementation("androidx.activity:activity-compose")
    implementation("androidx.lifecycle:lifecycle-runtime-compose")

    // 调试工具
    debugImplementation("androidx.compose.ui:ui-tooling")
    debugImplementation("androidx.compose.ui:ui-test-manifest")

    // 测试
    androidTestImplementation("androidx.compose.ui:ui-test-junit4")

    //图片-Coil
    implementation("io.coil-kt:coil-compose:2.6.0")

}
```

### 2.2 AndroidManifest.xml

```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.PageCurlDemo" >

        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>

</manifest>
```

### 2.3 代码逻辑

1、MainActivity.kt

```
package com.pgzxc.pagecurldemo

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.pgzxc.pagecurldemo.ui.CurlDemo
import com.pgzxc.pagecurldemo.ui.CurlImageLocal
import com.pgzxc.pagecurldemo.ui.CurlImageNet
import com.pgzxc.pagecurldemo.ui.CurlWithControls

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CurlImageNet()
        }
    }
}
```

2、ui/CurlDemo.kt(默认实现)

```
package com.pgzxc.pagecurldemo.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import eu.wewox.pagecurl.ExperimentalPageCurlApi
import eu.wewox.pagecurl.page.PageCurl

@OptIn(ExperimentalPageCurlApi::class)
@Composable
@Preview()
fun CurlDemo() {
    val pages = listOf("One", "Two", "Three")
    PageCurl(count = pages.size) { index ->
        Box(
            modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.primary),
            contentAlignment = Alignment.Center
        ) {
            Text(text = pages[index], style = MaterialTheme.typography.bodyLarge)
        }
    }
}
```

3、ui/CurlWithControls.kt(带上下翻页按钮)

```
package com.pgzxc.pagecurldemo.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import eu.wewox.pagecurl.ExperimentalPageCurlApi
import eu.wewox.pagecurl.page.PageCurl
import eu.wewox.pagecurl.page.rememberPageCurlState
import kotlinx.coroutines.launch

//控制翻页+ 按钮驱动（上一页/下一页）
@OptIn(ExperimentalPageCurlApi::class)
@Composable
fun CurlWithControls() {
    val state = rememberPageCurlState()
    val scope = rememberCoroutineScope()
    val pages = (1..10).map { "Page $it" }

    Column {
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = { scope.launch { state.prev()}}) { Text("Prev") }
            Button(onClick = { scope.launch { state.next() } }) { Text("Next") }
        }

        PageCurl(count = pages.size, state = state, modifier = Modifier.background(MaterialTheme.colorScheme.primary)) { i ->
            Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                Text(pages[i], style = MaterialTheme.typography.bodyLarge)
            }
        }
    }
}
```

3、ui/CurlImageLocal.kt(本地图片)

```
package com.pgzxc.pagecurldemo.ui

import android.content.res.Resources
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import com.pgzxc.pagecurldemo.R
import eu.wewox.pagecurl.ExperimentalPageCurlApi
import eu.wewox.pagecurl.page.PageCurl

@OptIn(ExperimentalPageCurlApi::class)
@Composable
@Preview()
fun CurlImageLocal() {

    val pics = listOf(
        R.drawable.ic_launcher,
        R.drawable.ic_launcher_background,
        R.drawable.ic_launcher_foreground,

        )

    PageCurl(count = pics.size) { i ->
        Image(
            painter = painterResource(pics[i]),
            contentDescription = null,
            contentScale = ContentScale.Crop,
            modifier = Modifier.fillMaxSize()
        )
    }

}
```

4、ui/CurlImageNet.kt(网络图片)

```
package com.pgzxc.pagecurldemo.ui

import android.content.res.Resources
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import coil.compose.AsyncImage
import com.pgzxc.pagecurldemo.R
import eu.wewox.pagecurl.ExperimentalPageCurlApi
import eu.wewox.pagecurl.page.PageCurl

@OptIn(ExperimentalPageCurlApi::class)
@Composable
@Preview()
fun CurlImageNet() {

    val urls = listOf(
        "https://img0.baidu.com/it/u=3611088670,2458896382&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1083",
        "https://img1.baidu.com/it/u=3677381888,3027116986&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=758",
        "https://img0.baidu.com/it/u=106239714,1643905876&fm=253&fmt=auto&app=138&f=JPEG?w=304&h=404"

        )

    PageCurl(count = urls.size) { i ->
        AsyncImage(
            model = urls[i],
            contentDescription = null,
            contentScale = ContentScale.Crop,
            modifier = Modifier.fillMaxSize()
        )
    }


}
```

## 三 效果图

![][1]





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-page-curl-3.gif