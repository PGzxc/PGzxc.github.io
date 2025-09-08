---
title: Android开发之——App升级移动端默认实现方案(3)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
  - App升级
abbrlink: 5c627254
date: 2025-09-08 13:23:51
---
## 一 概述

```
本文介绍：App升级功能介绍
 -启动时检测版本
 -WiFi 下自动下载 APK
 -下载完成后弹窗提示安装
```

<!--more-->

## 二 目录结构

```
app/
 └─ java/com/example/update/
      ├─ UpdateService.kt     // 下载服务
      ├─ UpdateReceiver.kt    // 下载完成广播
      └─ MainActivity.kt      // 入口，检测更新
res/
 └─ xml/file_paths.xml        // FileProvider 路径配置
```

## 三 源代码

### 3.1 安装依赖

```
1、说明
网络请求试用okhttp

2、配置依赖(libs.versions.toml)
[versions]
okhttp = "4.11.0"

[libraries]
okhttp = { module = "com.squareup.okhttp3:okhttp", version.ref = "okhttp" }
okhttp-logging = { module = "com.squareup.okhttp3:logging-interceptor", version.ref = "okhttp" }


3、添加依赖(build.gradle.kts)
implementation(libs.okhttp)
implementation(libs.okhttp.logging)
```

### 3.2 配置参数(build.gradle.kts)

```
1、启用 BuildConfig 生成功能
 buildFeatures {
       buildConfig = true
 }
    
2、配置VERSION_CODE
defaultConfig {
   buildConfigField("int", "VERSION_CODE", "$versionCode")
}
```

### 3.3 源代码

1、UpdateService.kt(下载更新服务且带通知栏)

```
package com.pgzxc.updateforce

import android.app.*
import android.content.Context
import android.content.Intent
import android.database.Cursor
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.os.Handler
import android.os.IBinder
import androidx.core.app.NotificationCompat

class UpdateService : Service() {

    private var downloadId: Long = -1L
    private val handler = Handler()
    private val updateInterval = 500L // 每 500ms 更新一次通知

    private val channelId = "update_service_channel"
    private lateinit var notificationManager: NotificationManager
    private lateinit var notificationBuilder: NotificationCompat.Builder

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val url = intent?.getStringExtra(EXTRA_URL) ?: return START_NOT_STICKY
        val force = intent.getBooleanExtra(EXTRA_FORCE, false)

        notificationManager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager

        // --- 创建通知渠道 ---
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                channelId,
                "应用更新服务",
                NotificationManager.IMPORTANCE_LOW
            )
            notificationManager.createNotificationChannel(channel)
        }

        // --- 初始化通知 ---
        notificationBuilder = NotificationCompat.Builder(this, channelId)
            .setContentTitle("应用更新")
            .setContentText("准备下载...")
            .setSmallIcon(R.drawable.ic_launcher_background)
            .setOnlyAlertOnce(true)
            .setOngoing(true)
            .setProgress(100, 0, true)

        startForeground(1, notificationBuilder.build())

        // --- 下载 APK ---
        val request = DownloadManager.Request(Uri.parse(url)).apply {
            setTitle("应用更新")
            setDescription("正在下载最新版本...")
            setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED) // 改这里
            setDestinationInExternalFilesDir(
                this@UpdateService,
                Environment.DIRECTORY_DOWNLOADS,
                "update.apk"
            )
            setMimeType("application/vnd.android.package-archive")
        }

        val dm = getSystemService(DOWNLOAD_SERVICE) as DownloadManager
        downloadId = dm.enqueue(request)
        FORCE_UPDATE = force

        // --- 启动下载进度更新 ---
        handler.post(progressRunnable)

        return START_STICKY
    }

    private val progressRunnable = object : Runnable {
        override fun run() {
            updateProgress()
            handler.postDelayed(this, updateInterval)
        }
    }

    private fun updateProgress() {
        val dm = getSystemService(DOWNLOAD_SERVICE) as DownloadManager
        val query = DownloadManager.Query().setFilterById(downloadId)
        val cursor: Cursor? = dm.query(query)
        cursor?.use {
            if (it.moveToFirst()) {
                val total =
                    it.getLong(it.getColumnIndexOrThrow(DownloadManager.COLUMN_TOTAL_SIZE_BYTES))
                val downloaded =
                    it.getLong(it.getColumnIndexOrThrow(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR))
                if (total > 0) {
                    val progress = (downloaded * 100 / total).toInt()
                    notificationBuilder.setProgress(100, progress, false).setContentText("下载中: $progress%")
                    notificationManager.notify(1, notificationBuilder.build())
                }
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        handler.removeCallbacks(progressRunnable)
    }

    override fun onBind(intent: Intent?): IBinder? = null

    companion object {
        private const val EXTRA_URL = "extra_url"
        private const val EXTRA_FORCE = "extra_force"
        var FORCE_UPDATE: Boolean = false

        fun newIntent(context: Context, url: String, force: Boolean): Intent {
            return Intent(context, UpdateService::class.java).apply {
                putExtra(EXTRA_URL, url)
                putExtra(EXTRA_FORCE, force)
            }
        }
    }
}
```

2、UpdateReceiver.kt(监听下载app完成广播，执行安装程序)

```
package com.pgzxc.updateforce

import android.app.*
import android.content.Context
import android.content.Intent
import android.database.Cursor
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.os.Handler
import android.os.IBinder
import androidx.core.app.NotificationCompat

class UpdateService : Service() {

    private var downloadId: Long = -1L
    private val handler = Handler()
    private val updateInterval = 500L // 每 500ms 更新一次通知

    private val channelId = "update_service_channel"
    private lateinit var notificationManager: NotificationManager
    private lateinit var notificationBuilder: NotificationCompat.Builder

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val url = intent?.getStringExtra(EXTRA_URL) ?: return START_NOT_STICKY
        val force = intent.getBooleanExtra(EXTRA_FORCE, false)

        notificationManager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager

        // --- 创建通知渠道 ---
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                channelId,
                "应用更新服务",
                NotificationManager.IMPORTANCE_LOW
            )
            notificationManager.createNotificationChannel(channel)
        }

        // --- 初始化通知 ---
        notificationBuilder = NotificationCompat.Builder(this, channelId)
            .setContentTitle("应用更新")
            .setContentText("准备下载...")
            .setSmallIcon(R.drawable.ic_launcher_background)
            .setOnlyAlertOnce(true)
            .setOngoing(true)
            .setProgress(100, 0, true)

        startForeground(1, notificationBuilder.build())

        // --- 下载 APK ---
        val request = DownloadManager.Request(Uri.parse(url)).apply {
            setTitle("应用更新")
            setDescription("正在下载最新版本...")
            setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED) // 改这里
            setDestinationInExternalFilesDir(
                this@UpdateService,
                Environment.DIRECTORY_DOWNLOADS,
                "update.apk"
            )
            setMimeType("application/vnd.android.package-archive")
        }

        val dm = getSystemService(DOWNLOAD_SERVICE) as DownloadManager
        downloadId = dm.enqueue(request)
        FORCE_UPDATE = force

        // --- 启动下载进度更新 ---
        handler.post(progressRunnable)

        return START_STICKY
    }

    private val progressRunnable = object : Runnable {
        override fun run() {
            updateProgress()
            handler.postDelayed(this, updateInterval)
        }
    }

    private fun updateProgress() {
        val dm = getSystemService(DOWNLOAD_SERVICE) as DownloadManager
        val query = DownloadManager.Query().setFilterById(downloadId)
        val cursor: Cursor? = dm.query(query)
        cursor?.use {
            if (it.moveToFirst()) {
                val total =
                    it.getLong(it.getColumnIndexOrThrow(DownloadManager.COLUMN_TOTAL_SIZE_BYTES))
                val downloaded =
                    it.getLong(it.getColumnIndexOrThrow(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR))
                if (total > 0) {
                    val progress = (downloaded * 100 / total).toInt()
                    notificationBuilder.setProgress(100, progress, false).setContentText("下载中: $progress%")
                    notificationManager.notify(1, notificationBuilder.build())
                }
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        handler.removeCallbacks(progressRunnable)
    }

    override fun onBind(intent: Intent?): IBinder? = null

    companion object {
        private const val EXTRA_URL = "extra_url"
        private const val EXTRA_FORCE = "extra_force"
        var FORCE_UPDATE: Boolean = false

        fun newIntent(context: Context, url: String, force: Boolean): Intent {
            return Intent(context, UpdateService::class.java).apply {
                putExtra(EXTRA_URL, url)
                putExtra(EXTRA_FORCE, force)
            }
        }
    }
}
```

3、MainActivity.kt(入口)

```
package com.pgzxc.updateforce

import android.annotation.SuppressLint
import android.app.DownloadManager
import android.content.IntentFilter
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.os.Bundle
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import kotlinx.coroutines.*
import okhttp3.OkHttpClient
import okhttp3.Request
import org.json.JSONObject

class MainActivity : AppCompatActivity() {

    private val receiver = UpdateReceiver()
    private val client = OkHttpClient()
    private val updateUrl = "http://192.168.8.221:5000/update.json"

    @SuppressLint("UnspecifiedRegisterReceiverFlag")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // 注册下载完成广播
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.TIRAMISU) {
            registerReceiver(receiver, IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE), RECEIVER_EXPORTED)
        } else {
            registerReceiver(receiver, IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE))
        }

        // 异步检查更新
        GlobalScope.launch(Dispatchers.IO) {
            checkUpdate()
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        unregisterReceiver(receiver)
    }

    private suspend fun checkUpdate() {
        try {
            val request = Request.Builder().url(updateUrl).build()
            val response = client.newCall(request).execute()
            val body = response.body?.string() ?: return
            val json = JSONObject(body)

            val latestVersionCode = json.getInt("VersionCode")
            val forceUpdate = json.getBoolean("ForceUpdate")
            val apkUrl = json.getString("DownloadUrl")

            if (latestVersionCode > BuildConfig.VERSION_CODE) {
                withContext(Dispatchers.Main) {
                    if (isWifiConnected()) {
                        // Wi-Fi 自动后台下载
                        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                            startForegroundService(UpdateService.newIntent(this@MainActivity, apkUrl, forceUpdate))
                        } else {
                            startService(UpdateService.newIntent(this@MainActivity, apkUrl, forceUpdate))
                        }
                    } else {
                        // 非 Wi-Fi 弹窗提示
                        showUpdateDialog(forceUpdate, apkUrl)
                    }
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun isWifiConnected(): Boolean {
        val cm = getSystemService(CONNECTIVITY_SERVICE) as ConnectivityManager
        val network = cm.activeNetwork ?: return false
        val caps = cm.getNetworkCapabilities(network) ?: return false
        return caps.hasTransport(NetworkCapabilities.TRANSPORT_WIFI)
    }

    private fun showUpdateDialog(force: Boolean, apkUrl: String) {
        AlertDialog.Builder(this)
            .setTitle("发现新版本")
            .setMessage(if (force) "必须更新才能继续使用" else "是否立即更新？")
            .setPositiveButton("更新") { _, _ ->
                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                    startForegroundService(UpdateService.newIntent(this, apkUrl, force))
                } else {
                    startService(UpdateService.newIntent(this, apkUrl, force))
                }
            }
            .setNegativeButton("退出") { _, _ ->
                if (force) finishAffinity()
            }
            .setCancelable(!force)
            .show()
    }
}
```

### 3.4 AndroidManifest.xml

```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />


    <application
        android:allowBackup="true"
        android:networkSecurityConfig="@xml/network_security_config"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.Updateforce">

        <!-- 启动 Activity -->
        <activity android:name=".MainActivity" android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <!-- 更新下载Service -->
        <service android:name=".UpdateService" android:exported="false"/>

        <!-- FileProvider -->
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

### 3.5 res/xml

1、file_paths.xml(兼容性适配FileProvider)

```
<?xml version="1.0" encoding="utf-8"?>
<paths>
    <external-files-path name="download" path="Download/"/>
</paths>
```

2、network_security_config.xml(网络安全配置文件，如HTTPS 证书)

```
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true" />
</network-security-config>
```

## 四 图示(debug包相同)

![][1]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-app-update-normal-3.gif