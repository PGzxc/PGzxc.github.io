---
title: Flutter开发之——运行卡在gradle assembleDebug(6)
categories:
  - 开发
  - F-跨平台
  - Flutter
tags:
  - Flutter
abbrlink: 9c343c12
date: 2021-02-20 15:02:45
---
## 一 现象

```
当Flutter中使用了`path_provider`时，
`pubspec.yaml`中配置了`path_provider`依赖，并执行`Pub get`时，
程序执行gradle assembleDebug，出现如下错误
```

![][1]

<!--more-->

## 二 现象说明

### 2.1 Windows下Flutter配置

```
PUB_HOSTED_URL=https://pub.flutter-io.cn
FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
```

### 2.2 原因说明

```
- 即使将android下的build.gradle仓库中google、jcenter修改为阿里云仓库，
仍然无法下载依赖如`guava:26.0-jre`、`kotlin-reflect-1.3.11`等

- `path_provider`依赖仍然需要外网访问权限
```

## 三 解决办法

### 3.1 代码仓库替换为阿里云仓库(可不做修改)
#### 3.1.1 阿里云仓库地址：https://maven.aliyun.com/mvn/guide
![][3]

####  3.1.2 在Intellij中的Android项目，使用Android studio工具打开(Intellij没有修改依赖后同步按钮)

依次点击：android—>Flutter—>Open Android module in Android Studio
  ![][2]

#### 3.1.3 Android项目修改
##### gradle使用默认配置(不修改)

android/build.gradle

```
 dependencies {
        classpath 'com.android.tools.build:gradle:4.1.0'
 }
```

android\gradle\wrapper\gradle-wrapper.properties

```
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-6.7-all.zip
```

##### android/build.gradle(使用阿里云地址)

```
buildscript {
    ext.kotlin_version = '1.3.50'
    repositories {
        //google()
        //jcenter()
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven{url 'http://maven.aliyun.com/nexus/content/groups/public/'}
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:4.1.0'
        //classpath 'com.android.tools.build:gradle:3.5.2'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}
allprojects {
    repositories {
        //google()
        //jcenter()
        //mavenCentral()
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven{url 'http://maven.aliyun.com/nexus/content/groups/public/'}
    }
}
```

#### 3.1.4 Flutter SDK修改

##### Flutter SDK的安装位置

```
D:\SoftWare\flutter
```

 ##### 修改的文件位置(Flutter SDK\packages\flutter_tools\gradle)

aar_init_script.gradle

```
project.repositories {
    maven {
       //url "$storageUrl/download.flutter.io"
	    url "https://storage.flutter-io.cn/download.flutter.io"
     }
}
```

flutter.gradle

```
repositories {
    //google()
	//jcenter()
	maven { url 'https://maven.aliyun.com/repository/google' }
	maven { url 'https://maven.aliyun.com/repository/jcenter' }
	maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
}
class FlutterPlugin implements Plugin<Project> {
    //private static final String DEFAULT_MAVEN_HOST = "https://storage.googleapis.com";
    private static final String DEFAULT_MAVEN_HOST = "https://storage.flutter-io.cn/download.flutter.io";
}    
```

resolve_dependencies.gradle

```
repositories {
    //google()
    //jcenter()
    //maven {url "$storageUrl/download.flutter.io"}
    
    maven { url 'https://maven.aliyun.com/repository/google' }
    maven { url 'https://maven.aliyun.com/repository/jcenter' }
    maven{url 'http://maven.aliyun.com/nexus/content/groups/public/'}
    maven {url "https://storage.flutter-io.cn/download.flutter.io"}
}
```

### 3.2 设置代理

#### 首先开启代理(确定代理的端口号:8580)
![][4]

#### 设置代理1

依次点击：File—>Settings—>Appearance&Behavior—>System Settings—>HTTP Proxy
![][5]

点击`Check connection`，输入外网网址如(https://youtube.com/)
![][6]

#### 代理设置2(**gralde.properties**)

```
//http
systemProp.http.proxyHost=proxy.company.com
systemProp.http.proxyPort=443
systemProp.http.proxyUser=username
systemProp.http.proxyPassword=password
systemProp.http.auth.ntlm.domain=domain

//https
systemProp.https.proxyHost=proxy.company.com
systemProp.https.proxyPort=443
systemProp.https.proxyUser=username
systemProp.https.proxyPassword=password
systemProp.https.auth.ntlm.domain=domain
```

此处，没有密码，顾设置如下

```
//http
systemProp.http.proxyHost=127.0.0.1
systemProp.http.proxyPort=8580

//https
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=8580
```

此处设置的代理同步保存在

```
C:\Users\Admin\.gradle\gradle.properties
```

不想使用代理，可在项目的gradle.properties和此处的gradle.properties删除代理设置

### 3.3 运行命令

#### 打开Android Stdudio下面的Terminal
![][7]

#### 运行指令(显示Build Success说明编译成功)

```
gradlew clean
gradlew build
```
![][8]



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-assembledebug-timeout.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-assembledebug-intellij-open-as.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-assembledebug-aliyun.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-assembledebug-proxy-open.png
[5]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-assembledebug-as-proxy-set.png
[6]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-assembleDebug-proxy-check.gif
[7]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-assembledebug-as-terminal.png
[8]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-flutter/flutter-assembledebug-as-terminal-gradlew-clean.png

