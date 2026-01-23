---
title: CLI自动打包之——Android项目CLI流程(2)
categories:
  - 开发
  - L-自动化
  - CLI
  - Github
tags:
  - Github
abbrlink: 3a467850
date: 2025-08-01 07:39:24
---
## 一 概述

```
将 Android 开源项目推送到 GitHub 后，
打 Tag 时自动生成并附带 APK 文件，或自动编译 APK。
这可以通过 GitHub Actions 实现
```

<!--more-->

## 二 场景目标

```
项目推送到 GitHub。
每次打 Tag 时触发自动构建。
生成 APK 并发布到对应的 GitHub Release 页面(附带 .apk 文件)。
```

## 三 准备工作

### 3.1 说明

```
项目使用 Gradle 构建
项目中已有签名配置（signingConfigs），可用于 release 构建
推送到 GitHub 仓库
在 GitHub 上设置 Secrets（用于签名的 keystore 和密码）
```

### 3.2 签名文件(Keystore)生成

1、可以使用 `keytool` 命令生成签名文件（JDK 自带）

```
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

2、参数解释

|   参数    |       含义       |
| :-------: | :--------------: |
| -keystore | 生成的签名文件名 |
|  -alias   |     密钥别名     |
|  -keyalg  | 算法(一般为 RSA) |
| -keysize  |     密钥长度     |
| -validity | 有效期(单位：天) |

3、说明：执行后会提示你输入 keystore 密码、名字、组织信息等

### 3.2 配置 keystore 与签名(推荐使用 Secret)

1、方法 1：使用 PowerShell 编码为 base64

```
[Convert]::ToBase64String([IO.File]::ReadAllBytes("my-release-key.jks")) > keystore.b64
```

2、 方法 2：使用 WSL(如果你已安装)编码为 base64

```
base64 /mnt/d/Code/ComposeDemo/WanAndroid_ComposeUI/app/keystore/my-release-key.jks > /mnt/d/Code/ComposeDemo/WanAndroid_ComposeUI/app/keystore/keystore.b64
```

3、在 GitHub 仓库中创建以下 Secret（`Settings` → `Secrets and variables` → `Actions`）

|    Secret 名称    |            含义             |
| :---------------: | :-------------------------: |
|   KEYSTORE_B64    | keystore 文件的 base64 内容 |
| KEYSTORE_PASSWORD |        keystore 密码        |
|     KEY_ALIAS     |          密钥别名           |
|   KEY_PASSWORD    |          key 密码           |

Github配置

![][1]

说明：此处用Secrets设置，通过也可以在action中明文设置(不太安全)

```
 KEYSTORE_PASSWORD: ${{ secrets.KEYSTORE_PASSWORD }}
```

## 四 项目配置

### 4.1 keystore的位置

```
项目/app/keystore下
 -my-release-key.jks
 -keystore.b64
```

### 4.2 gradle.properties

```
#keystore
KEYSTORE_FILE=keystore/my-release-key.jks
KEYSTORE_PASSWORD=123456789
KEY_ALIAS=my-key-alias
KEY_PASSWORD=123456789
```

### 4.2 app/build.gradle

```
1、打包输出
applicationVariants.all { variant ->
        variant.outputs.all { output ->
            def versionName = variant.versionName
            def buildType = variant.buildType.name
            def newName = "WanAndroid-v${versionName}-${buildType}.apk"
            outputFileName = newName
        }
    }

2、签名配置
signingConfigs {
        release {
            storeFile file(KEYSTORE_FILE)
            storePassword KEYSTORE_PASSWORD
            keyAlias KEY_ALIAS
            keyPassword KEY_PASSWORD
        }
}   
```

## 五 配置 GitHub Actions 工作流(自动编译 + 发布 APK)

### 5.1 文件创建

```
.github/workflows/release.yml
```

### 5.2 文件内容

```
name: Build Release APK

on:
  push:
    tags:
      - 'v*'

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set up JDK
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Grant execute permission for gradlew
        run: chmod +x ./gradlew

      - name: Verify keystore file exists
        run: ls -al app/keystore

      - name: Build release APK
        env:
          KEYSTORE_PASSWORD: ${{ secrets.KEYSTORE_PASSWORD }}
          KEY_ALIAS: ${{ secrets.KEY_ALIAS }}
          KEY_PASSWORD: ${{ secrets.KEY_PASSWORD }}
        run: ./gradlew assembleRelease

      - name: Show release APK filename
        run: ls -al app/build/outputs/apk/release/

      - name: Upload release APK to Actions artifacts
        uses: actions/upload-artifact@v4
        with:
          name: release-apk
          path: app/build/outputs/apk/release/*.apk

      - name: Upload APK to GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          files: app/build/outputs/apk/release/WanAndroid-v*-release.apk
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 5.3 构建图示

|   图示说明   |    内容    |
| :----------: | :--------: |
| Action执行前 |   ![][2]   |
|  Action执行  |   ![][3]   |
| Action执行后 | 内容![][4] |





[1]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-6-android-secrets-1.png
[2]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-6-android-tag-2.png
[3]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-6-android-action-suc-3.png
[4]:https://cdn.jsdelivr.net/gh/PGzxc/CDN/blog-git/github-6-android-assets-4.png