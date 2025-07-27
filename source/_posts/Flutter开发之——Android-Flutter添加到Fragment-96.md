---
title: Flutter开发之——Android-Flutter添加到Fragment(96)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 877971f5
date: 2021-07-18 22:48:42
---
## 一 概述

* Android原生开发中，Fragment可以作为Activity页面的一部分(Activity的一部分或者ViewPager的一个页面)
* Flutter可以作为FlutterFragment集成到原生页面中呈现

<!--more-->

## 二 FlutterFragment开发的一般步骤

* 初始化Flutter路由
* 设置Dart执行入口
* 背景是否透明
* 使用是否FlutterEngine或者带缓存的FlutterEngine

## 三 界面布局(activity与Fragment的关系)

### 3.1 界面(TextView+RelativeLayout)

```
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/textView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Activity原生页面"
        android:textSize="20dp"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <RelativeLayout
        android:id="@+id/fragment_container"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:layout_constraintTop_toBottomOf="@+id/textView"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### 3.2 将activity中的一部分替换为Fragment

```
 fragmentManager
                .beginTransaction()
                .add(
                    R.id.fragment_container,
                    flutterFragment,
                    TAG_FLUTTER_FRAGMENT
                )
                .commit();
```

说明：将相对布局替换为Fragment显示

## 四 不使用带缓存的FlutterEngine和路由

### 4.1 代码

```
class MainActivity : AppCompatActivity() {
    private val TAG_FLUTTER_FRAGMENT = "flutter_fragment"
    private var flutterFragment: FlutterFragment? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
       val fragmentManager: FragmentManager = supportFragmentManager
        flutterFragment = fragmentManager
            .findFragmentByTag(TAG_FLUTTER_FRAGMENT) as FlutterFragment?
        if (flutterFragment == null) {
            flutterFragment = FlutterFragment.createDefault();
            fragmentManager
                .beginTransaction()
                .add(
                    R.id.fragment_container,
                    flutterFragment!!,
                    TAG_FLUTTER_FRAGMENT
                )
                .commit();
        }
    }

    override fun onPostResume() {
        super.onPostResume()
        //flutterFragment?.onPostResume()
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
           flutterFragment?.onNewIntent(intent)
    }

    override fun onBackPressed() {
        super.onBackPressed()
        flutterFragment?.onBackPressed()
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        flutterFragment?.onRequestPermissionsResult(requestCode, permissions, grantResults)
    }

    override fun onUserLeaveHint() {
        super.onUserLeaveHint()
        flutterFragment?.onUserLeaveHint()
    }

    override fun onTrimMemory(level: Int) {
        super.onTrimMemory(level)
        flutterFragment?.onTrimMemory(level)
    }
}
```

### 4.2 效果图

![][1]

## 五 使用带缓存不带路由的Fragment

### 5.1 代码

**MyApplication**

```
public class MyApplication extends Application {
    public FlutterEngine flutterEngine;

    @Override
    public void onCreate() {
        super.onCreate();
        // Instantiate a FlutterEngine.
        flutterEngine = new FlutterEngine(this);
        // Start executing Dart code to pre-warm the FlutterEngine.
        flutterEngine.getDartExecutor().executeDartEntrypoint(
                DartExecutor.DartEntrypoint.createDefault()
        );
        // Cache the FlutterEngine to be used by FlutterActivity.
        FlutterEngineCache
                .getInstance()
                .put("my_engine_id", flutterEngine);
    }
}
```

**MainActivity**

```
class MainActivity : AppCompatActivity() {
    private val TAG_FLUTTER_FRAGMENT = "flutter_fragment"
    private var flutterFragment: FlutterFragment? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
       val fragmentManager: FragmentManager = supportFragmentManager
        flutterFragment = fragmentManager
            .findFragmentByTag(TAG_FLUTTER_FRAGMENT) as FlutterFragment?
        if (flutterFragment == null) {     
            flutterFragment=  FlutterFragment.withCachedEngine("my_engine_id").build()
            fragmentManager
                .beginTransaction()
                .add(
                    R.id.fragment_container,
                    flutterFragment!!,
                    TAG_FLUTTER_FRAGMENT
                )
                .commit();
        }
    }
}    
```

### 5.2 效果图

![][1]

## 六 既带缓存又有路由(b页面)的Fragment

### 6.1 代码

**MyApplication**

```
public class MyApplication extends Application {
    public FlutterEngine flutterEngine;

    @Override
    public void onCreate() {
        super.onCreate();
        // Instantiate a FlutterEngine.
        flutterEngine = new FlutterEngine(this);
        flutterEngine.getNavigationChannel().setInitialRoute("/b");
        // Start executing Dart code to pre-warm the FlutterEngine.
        flutterEngine.getDartExecutor().executeDartEntrypoint(
                DartExecutor.DartEntrypoint.createDefault()
        );
        // Cache the FlutterEngine to be used by FlutterActivity.
        FlutterEngineCache
                .getInstance()
                .put("my_engine_id", flutterEngine);
    }
}
```

**MainActivity**

```
class MainActivity : AppCompatActivity() {
    private val TAG_FLUTTER_FRAGMENT = "flutter_fragment"
    private var flutterFragment: FlutterFragment? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
       val fragmentManager: FragmentManager = supportFragmentManager
        flutterFragment = fragmentManager
            .findFragmentByTag(TAG_FLUTTER_FRAGMENT) as FlutterFragment?
        if (flutterFragment == null) {
            flutterFragment=FlutterFragment.withNewEngine().initialRoute("/b").build()
            fragmentManager
                .beginTransaction()
                .add(
                    R.id.fragment_container,
                    flutterFragment!!,
                    TAG_FLUTTER_FRAGMENT
                )
                .commit();
        }
    }
}
```
### 6.2 效果图
![][2]

## 七 参考
* [Flutter官方文档-Adding a Flutter Fragment to an Android app](https://flutter.dev/docs/development/add-to-app/android/add-flutter-fragment?tab=add-fragment-kotlin-tab)

[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-android-fragment-default.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-android-fragment-route-cache.png
