---
title: Android开发之——基于PageTransformer实现翻页(2)
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: 28a7a587
date: 2025-09-09 17:59:52
---
## 一 概述

```
本文介绍：
-ViewPager2 + PageTransformer 做翻页动画
-多种效果:类似卡片、立体翻转、淡入淡出
```

<!--more-->

## 二 代码实现

### 2.1 添加依赖

```
1、libs.versions.toml

[versions]
viewpager2="1.1.0"

[libraries]
viewpager2 = { group = "androidx.viewpager2", name = "viewpager2", version.ref = "viewpager2" }

2、app/build.gradle.kts
dependencies {
    // ViewPager2，核心翻页控件
    implementation(libs.viewpager2)
}
```

### 2.2 布局文件(res/layout/)

1、activity_main.xml

```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <androidx.viewpager2.widget.ViewPager2
        android:id="@+id/viewPager2"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

2、自定义Adapter-item布局

```
<?xml version="1.0" encoding="utf-8"?>
<TextView
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:background="@color/cardview_dark_background"
        android:layout_width="match_parent"
        android:gravity="center"
        android:textSize="30sp"
        android:text="Center"
        android:layout_height="match_parent"/>
```

### 2.3 AndroidManifest.xml

```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.PageTransformer" >

        <activity android:name=".MainActivity" android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>

</manifest>
```

### 2.4 代码文件(src/java)

1、PageAnimationType.kt(枚举翻页特效常量)

```
enum class PageAnimationType {
    DEPTH,
    ZOOM_OUT,
    ROTATE
}
```

2、PageTransformerFactory.kt(根据PageAnimationType生成对应的翻页特效)

```
package com.pgzxc.pagetransformer.factory

import android.view.View
import androidx.viewpager2.widget.ViewPager2
import com.pgzxc.pagetransformer.type.PageAnimationType
import kotlin.math.abs
import kotlin.math.max

object PageTransformerFactory {

    fun create(type: PageAnimationType): ViewPager2.PageTransformer {
        return when (type) {
            PageAnimationType.DEPTH -> DepthPageTransformer()
            PageAnimationType.ZOOM_OUT -> ZoomOutPageTransformer()
            PageAnimationType.ROTATE -> RotatePageTransformer()
        }
    }

    // 1、深度翻页
    private class DepthPageTransformer : ViewPager2.PageTransformer {
        override fun transformPage(page: View, position: Float) {
            page.apply {
                when {
                    position < -1 -> alpha = 0f
                    position <= 0 -> {
                        alpha = 1f
                        translationX = 0f
                        scaleX = 1f
                        scaleY = 1f
                    }
                    position <= 1 -> {
                        alpha = 1 - position
                        translationX = page.width * -position
                        val scaleFactor = 0.75f + (1 - 0.75f) * (1 - abs(position))
                        scaleX = scaleFactor
                        scaleY = scaleFactor
                    }
                    else -> alpha = 0f
                }
            }
        }
    }

    // 2、卡片缩放
    private class ZoomOutPageTransformer : ViewPager2.PageTransformer {
        private val minScale = 0.85f
        private val minAlpha = 0.5f

        override fun transformPage(page: View, position: Float) {
            page.apply {
                when {
                    position < -1 -> alpha = 0f
                    position <= 1 -> {
                        val scaleFactor = max(minScale, 1 - abs(position))
                        val vertMargin = height * (1 - scaleFactor) / 2
                        val horzMargin = width * (1 - scaleFactor) / 2
                        translationX = if (position < 0) horzMargin - vertMargin / 2
                        else -horzMargin + vertMargin / 2

                        scaleX = scaleFactor
                        scaleY = scaleFactor
                        alpha = minAlpha + (scaleFactor - minScale) / (1 - minScale) * (1 - minAlpha)
                    }
                    else -> alpha = 0f
                }
            }
        }
    }

    //3、立体翻转
    private class RotatePageTransformer : ViewPager2.PageTransformer {
        override fun transformPage(page: View, position: Float) {
            page.apply {
                pivotX = if (position < 0f) width.toFloat() else 0f
                pivotY = height * 0.5f
                rotationY = 90f * position
                alpha = if (abs(position) <= 0.5f) 1f else 0f
            }
        }
    }
}
```

3、MyAdapter.kt(用于给viewpager2设置的适配器)

```
package com.pgzxc.pagetransformer

import android.view.Gravity
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class MyAdapter(private val items: List<String>) : RecyclerView.Adapter<MyAdapter.ViewHolder>() {

    inner class ViewHolder(val textView: TextView) : RecyclerView.ViewHolder(textView)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
      //val textView = LayoutInflater.from(parent.context)
      .inflate(android.R.layout.simple_list_item_1, parent, false) as TextView
       val textView= LayoutInflater.from(parent.context).inflate(R.layout.list_item,parent,false)  as TextView

        //强制铺满
        textView.layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        )

        textView.gravity = Gravity.CENTER
        textView.textSize = 24f
        return ViewHolder(textView)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.textView.text = items[position]
    }

    override fun getItemCount(): Int = items.size
}
```

4、MainActivity.kt(主页面)

```
package com.pgzxc.pagetransformer

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.viewpager2.widget.ViewPager2
import com.pgzxc.pagetransformer.effect.DepthPageTransformer
import com.pgzxc.pagetransformer.factory.PageTransformerFactory
import com.pgzxc.pagetransformer.type.PageAnimationType

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val viewPager2 = findViewById<ViewPager2>(R.id.viewPager2)
        val items = listOf("Page 1", "Page 2", "Page 3", "Page 4")
        viewPager2.adapter = MyAdapter(items)

        // 设置翻页动画
        //viewPager2.setPageTransformer(DepthPageTransformer())

        // 一键切换不同翻页动画
        viewPager2.setPageTransformer(PageTransformerFactory.create(PageAnimationType.DEPTH))
    }
}
```

## 三 效果图

![][1]





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-page-transform-2.gif