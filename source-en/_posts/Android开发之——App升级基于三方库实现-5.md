---
title: Android开发之——App升级基于三方库实现(5)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
  - App升级
abbrlink: 624f571e
date: 2025-09-08 13:25:28
---
## 一 概述

```
本文介绍：
 -自己实现App升级需要处理，App检查、App下载，App安装及适配等工作
 -借助三方库(如XUpdate)，用少量代码快速完成功能开发
```

<!--more-->

## 二 三方库XUpdate(语言Java，最近更新：1年前)

### 2.1 Github地址

```
https://github.com/xuexiangjys/XUpdate 
```

### 2.2 特点

```
-支持 强制更新 / 可选更新
-支持 后台静默下载
-支持 自定义 UI
-直接配置 JSON 版本信息接口即可
```

### 2.3 集成方式

```
implementation 'com.github.xuexiangjys:XUpdate:2.1.1'
```

### 2.4 服务器返回的json

```
{
  "Code": 0,
  "Msg": "",
  "UpdateStatus": 1,
  "VersionCode": 3,
  "VersionName": "1.0.2",
  "ModifyContent": "1、优化api接口。\r\n2、添加使用demo演示。\r\n3、新增自定义更新服务API接口。\r\n4、优化更新提示界面。",
  "DownloadUrl": "https://raw.githubusercontent.com/xuexiangjys/XUpdate/master/apk/xupdate_demo_1.0.2.apk",
  "ApkSize": 2048,
  "ApkMd5": ""
}
```

### 2.5 Application初始化

```
XUpdate.get()
    .debug(true)
    .isWifiOnly(true)                                               //默认设置只在wifi下检查版本更新
    .isGet(true)                                                    //默认设置使用get请求检查版本
    .isAutoMode(false)                                              //默认设置非自动模式，可根据具体使用配置
    .param("versionCode", UpdateUtils.getVersionCode(this))         //设置默认公共请求参数
    .param("appKey", getPackageName())
    .setOnUpdateFailureListener(new OnUpdateFailureListener() {     //设置版本更新出错的监听
        @Override
        public void onFailure(UpdateError error) {
            if (error.getCode() != CHECK_NO_NEW_VERSION) {          //对不同错误进行处理
                ToastUtils.toast(error.toString());
            }
        }
    })
    .supportSilentInstall(true)                                     //设置是否支持静默安装，默认是true
    .setIUpdateHttpService(new OKHttpUpdateHttpService())           //这个必须设置！实现网络请求功能。
    .init(this); 
```

### 2.6 MainActivity调用

```
XUpdate.newBuild(getActivity())
        .updateUrl(mUpdateUrl)
        .update();
```

### 2.7 自定义版本更新  

```
XUpdate.newBuild(getActivity())
        .updateUrl(mUpdateUrl)
        .promptThemeColor(ResUtils.getColor(R.color.update_theme_color))
        .promptButtonTextColor(Color.WHITE)
        .promptTopResId(R.mipmap.bg_update_top)
        .promptWidthRatio(0.7F)
        .update();   
```

## 三 实现代码

### 3.1 添加依赖

```
1、libs.versions.toml
[versions]
xupdate = "2.1.5"
okhttp = "4.11.0"

[libraries]
xupdate = { group = "com.github.xuexiangjys", name = "XUpdate", version.ref = "xupdate" }
okhttp = { module = "com.squareup.okhttp3:okhttp", version.ref = "okhttp" }
okhttp-logging = { module = "com.squareup.okhttp3:logging-interceptor", version.ref = "okhttp" }

2、build.gradle.kts
dependencies {
    //xupdate
    implementation(libs.xupdate)
    // OkHttp3
    implementation(libs.okhttp)
    implementation(libs.okhttp.logging)
}

3、settings.gradle.kts
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven { url = uri("https://jitpack.io") }

    }
}
```

### 3.2 Java代码

1、MyApp

```
package com.pgzxc.xupdatedemo

import OkHttpUpdateHttpService
import android.app.Application
import android.util.Log
import com.xuexiang.xupdate.XUpdate
import com.xuexiang.xupdate.entity.UpdateError.ERROR.CHECK_NO_NEW_VERSION
import com.xuexiang.xupdate.utils.UpdateUtils

class MyApp : Application() {
    override fun onCreate() {
        super.onCreate()
        // 初始化 XUpdate
        XUpdate.get()
            .debug(true)
            .isWifiOnly(true) //默认设置只在wifi下检查版本更新
            .isGet(true) //默认设置使用get请求检查版本
            .isAutoMode(false) //默认设置非自动模式，可根据具体使用配置
            .param("versionCode", UpdateUtils.getVersionCode(this)) //设置默认公共请求参数
            .param("appKey", packageName)
            .setOnUpdateFailureListener { error ->
                //设置版本更新出错的监听
                if (error.getCode() !== CHECK_NO_NEW_VERSION) {          //对不同错误进行处理
                    Log.e("Error",error.toString())
                }
            }
            .supportSilentInstall(false) //设置是否支持静默安装，默认是true
            .setIUpdateHttpService(OkHttpUpdateHttpService()) //这个必须设置！实现网络请求功能。
            .init(this) //这个必须初始化
    }
}

```

2、MainActivity

```
package com.pgzxc.xupdatedemo

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.xuexiang.xupdate.XUpdate

class MainActivity: AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // 启动时检查更新
        XUpdate.newBuild(this)
            .updateUrl("http://192.168.8.221:5000/update.json") // 你的更新接口
            //.isAutoMode(true) //如果需要完全无人干预，自动更新，需要root权限【静默安装需要】
            //.supportBackgroundUpdate(true) //支持后台更新
            .update()
    }
}
```

3、OkHttpUpdateHttpService

```
import com.xuexiang.xupdate.proxy.IUpdateHttpService
import okhttp3.*
import okhttp3.HttpUrl.Companion.toHttpUrlOrNull
import java.io.File
import java.io.FileOutputStream
import java.io.IOException

class OkHttpUpdateHttpService : IUpdateHttpService {

    private val client = OkHttpClient()

    override fun asyncGet(
            url: String,
            params: MutableMap<String, Any>,
            callBack: IUpdateHttpService.Callback
    ) {
        val httpUrlBuilder = url.toHttpUrlOrNull()!!.newBuilder()
        for ((key, value) in params) {
            httpUrlBuilder.addQueryParameter(key, value.toString())
        }
        val request = Request.Builder().url(httpUrlBuilder.build()).get().build()
        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                callBack.onError(e)
            }

            override fun onResponse(call: Call, response: Response) {
                callBack.onSuccess(response.body?.string())
            }
        })
    }

    override fun asyncPost(
            url: String,
            params: MutableMap<String, Any>,
            callBack: IUpdateHttpService.Callback
    ) {
        val formBodyBuilder = FormBody.Builder()
        for ((key, value) in params) {
            formBodyBuilder.add(key, value.toString())
        }
        val request = Request.Builder().url(url).post(formBodyBuilder.build()).build()
        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                callBack.onError(e)
            }

            override fun onResponse(call: Call, response: Response) {
                callBack.onSuccess(response.body?.string())
            }
        })
    }

    override fun download(
            url: String,
            path: String,
            fileName: String,
            callBack: IUpdateHttpService.DownloadCallback
    ) {
        val request = Request.Builder().url(url).build()
        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                callBack.onError(e)
            }

            override fun onResponse(call: Call, response: Response) {
                val dir = File(path)
                if (!dir.exists()) {
                    dir.mkdirs()   // 创建目录
                }
                val file = File(dir, fileName)

                val inputStream = response.body?.byteStream()
                val outputStream = FileOutputStream(file)

                try {
                    val buffer = ByteArray(2048)
                    var total = 0L
                    val contentLength = response.body?.contentLength() ?: -1

                    var len: Int
                    while (inputStream!!.read(buffer).also { len = it } != -1) {
                        total += len
                        outputStream.write(buffer, 0, len)
                        callBack.onProgress(total.toFloat() / contentLength, contentLength)
                    }
                    outputStream.flush()
                    callBack.onSuccess(file)
                } catch (e: Exception) {
                    callBack.onError(e)
                } finally {
                    inputStream?.close()
                    outputStream.close()
                }
            }

        })
    }

    override fun cancelDownload(url: String) {
        // 简单处理：找到对应 call 并取消
        for (call in client.dispatcher.queuedCalls()) {
            if (call.request().url.toString() == url) {
                call.cancel()
            }
        }
        for (call in client.dispatcher.runningCalls()) {
            if (call.request().url.toString() == url) {
                call.cancel()
            }
        }
    }
}
```

### 3.3 AndroidManifest.xml

```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />

    <application
        android:allowBackup="true"
        android:name=".MyApp"
        android:networkSecurityConfig="@xml/network_security_config"
        android:requestLegacyExternalStorage="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.XUpdateDemo" >

        <activity android:name=".MainActivity" android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="${applicationId}.fileprovider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/file_paths" />
        </provider>

    </application>
</manifest>
```

### 3.4 app/build.gradle.kts(不需要设置)

```
-buildConfig = true
-buildConfigField("int", "VersionCode", "$versionCode")
```

### 3.5 兼容性(xml)

1、network_security_config.xml(必须添加，否则出错)

```
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <!--  暂时解决Android9.0上加载http的图片问题  -->
    <base-config cleartextTrafficPermitted="true" />
</network-security-config>
```

2、file_paths.xml(可不添加)

```
<?xml version="1.0" encoding="utf-8"?>
<paths>
    <!-- 允许访问缓存目录（XUpdate 默认下载目录） -->
    <external-cache-path
        name="xupdate_cache"
        path="xupdate/" />

    <!-- 允许访问 files 目录（如果你改过保存路径用到这里） -->
    <external-files-path
        name="xupdate_files"
        path="xupdate/" />

    <!-- 如果想更宽松，可以允许整个 cache 或 files -->
    <!-- <external-cache-path name="cache" path="." /> -->
    <!-- <external-files-path name="files" path="." /> -->
</paths>
```

## 四 服务端返回格式(自行调整)

```
{
  "Code": 0,
  "Msg": "",
  "UpdateStatus": 1,
  "VersionCode": 3,
  "VersionName": "1.0.2",
  "ModifyContent": "1、优化api接口。\r\n2、添加使用demo演示。\r\n3、新增自定义更新服务API接口。\r\n4、优化更新提示界面。",
  "DownloadUrl": "https://raw.githubusercontent.com/xuexiangjys/XUpdate/master/apk/xupdate_demo_1.0.2.apk",
  "ApkSize": 2048,
  "ApkMd5": ""
}
```

## 五 效果图

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-app-update-xupdate-5.gif