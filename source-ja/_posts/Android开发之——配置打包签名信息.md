---
title: Android开发之——配置打包签名信息
categories:
  - 开发
  - D-移动开发
  - Android
tags:
  - Android
abbrlink: ef88ab90
date: 2025-07-30 11:50:40
---
## 一 概述

```
在Android开发中，配置打包签名信息是发布APK时必须的步骤。
签名信息主要包括 keystore（签名证书文件）及其相关配置。
```

<!--more-->

## 二 签名文件(Keystore)生成

### 2.1 通过IDE的Build—>Generate Signed App Bundle or APK

```
1、位置
-左上方菜单栏：Build——>Generate Signed App Bundle or APK
-选择：keyStore输出位置及配置信息
```

### 2.2 使用 `keytool` 命令生成签名文件(JDK 自带)

1、指令

```
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

2、参数解释：

|   参数    |        含义        |
| :-------: | :----------------: |
| -keystore |  生成的签名文件名  |
|  -alias   |      密钥别名      |
|  -keyalg  | 算法（一般为 RSA） |
| -keysize  |      密钥长度      |
| -validity |  有效期(单位：天)  |

3、执行后

```
执行后会提示你输入 keystore 密码、名字、组织信息等
```

## 三 配置签名信息

### 3.1 通过工具配置签名信息

1、配置signingConfigs

```
1、在项目上右键——>Open Module Settings，打开签名信息窗口(硬编码)
点击+号，输入release，依次选择Store File及配置信息

2、app/build.gradle文件下会生成signingConfigs/release配置

3、build.gradle和my-release-key.jks路径如下
-app
--keystore/my-release-key.jks
--build.gradle

4、将硬编码路径信息改为相对路径信息：
./keystore/my-release-key.jks
```

图示

| 1-signingConfigs | 2-build.gradle |
| :--------------: | :------------: |
|      ![][1]      |     ![][2]     |

2、配置buildType

| 1-buildType | 2-build.gradle |
| :---------: | :------------: |
|   ![][3]    |     ![][4]     |

3、将上步骤中的配置放在buildType中

```
buildTypes {
      release {
           minifyEnabled false
           proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
      }
     release {
           signingConfig signingConfigs.release
           minifyEnabled false
           proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
       }
 }
```

### 3.2 在 `build.gradle` 中配置签名信息

1、位置

```
app/build.gradle
```

2、添加如下配置

```
android {
    ...
    signingConfigs {
        release {
            storeFile file("my-release-key.jks")       // 签名文件路径
            storePassword "your_keystore_password"     // keystore 密码
            keyAlias "my-key-alias"                    // key 别名
            keyPassword "your_key_password"            // key 密码
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile(
                'proguard-android-optimize.txt'
            ), 'proguard-rules.pro'
        }
    }
}
```

### 3.3 在 `gradle.properties` 中管理签名信息(推荐)

1、项目根目录下的 `gradle.properties` 添加

```
KEYSTORE_FILE=my-release-key.jks
KEYSTORE_PASSWORD=your_keystore_password
KEY_ALIAS=my-key-alias
KEY_PASSWORD=your_key_password
```

2、然后在 `build.gradle` 中引用

```
signingConfigs {
    release {
        storeFile file(KEYSTORE_FILE)
        storePassword KEYSTORE_PASSWORD
        keyAlias KEY_ALIAS
        keyPassword KEY_PASSWORD
    }
}
```

3、注意事项(非公开的项目)

```
签名文件最好不要上传到 Git 仓库，使用 .gitignore 忽略掉
```

## 四 常见问题

### 4.1 Keystore was tampered with or password was incorrect.

```
密码错误或 keystore 损坏
```

### 4.2 You have not accepted the license agreements.

```
未接受 Android SDK 的 license，运行 sdkmanager --licenses
```

### 4.3 APK not signed

```
检查是否配置了 signingConfig
```

## 五 打包及输出路径

### 5.1 build.gradle打包配置

```
 applicationVariants.all { variant ->
        variant.outputs.all { output ->
            def appName = "WanAndroidComposeUI"  // 自定义应用名
            def buildType = variant.buildType.name   // release 或 debug
            def versionName = variant.versionName
            def versionCode = variant.versionCode
            def date = new Date().format("yyyyMMdd_HHmm")

            // 输出文件名，例如：MyApp_v1.2.3_20250730_release.apk
            def newApkName = "${appName}_v${versionName}_${date}_${buildType}.apk"
            outputFileName = newApkName
        }
 }
```

### 5.2 CLI打包配置修改

```
signingConfigs {
        release {
            storeFile file(KEYSTORE_FILE)
            storePassword KEYSTORE_PASSWORD
            keyAlias KEY_ALIAS
            keyPassword KEY_PASSWORD
        }
 }
```

### 5.3 常用打包命令如下(需在项目根目录执行)

```
./gradlew assembleRelease         # 生成 APK
./gradlew bundleRelease           # 生成 AAB（推荐发布到 Google Play）
```

### 5.4 输出目录通常在

```
app/build/outputs/apk/release/app-release.apk
app/build/outputs/bundle/release/app-release.aab
```



[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-keystore-info-add-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-keystore-info-config-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-keystore-type-add-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-android/android-keystore-type-config-4.png