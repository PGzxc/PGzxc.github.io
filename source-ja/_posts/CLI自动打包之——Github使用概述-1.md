---
title: CLI自动打包之——Github使用概述(1)
categories:
  - 开发
  - L-自动化
  - CLI
  - Github
tags:
  - Github
abbrlink: 63a1c3d2
date: 2025-07-26 07:27:43
---
## 一 概述

```
GitHub Release 页面下的 Assets 中有 
 1、.apk（安卓）、
 2、.ipa（iOS）、
 3、.exe/.dmg（桌面端）等文件
 
这些都是通过 GitHub Actions 自动构建打包上传的
```

<!--more-->

## 二 说明

|   平台   | 文件格式  |     构建环境     |            特别注意            |
| :------: | :-------: | :--------------: | :----------------------------: |
| Android  |   .apk    | Ubuntu / Windows |    配置好 `keystore` 和签名    |
|   iOS    |   .ipa    |    macOS only    | 需要 Xcode、证书、Provisioning |
| Electron | .exe/.dmg | Ubuntu/macOS/Win |    `electron-builder` 工具     |
| Web前端  |   .zip    |      Ubuntu      |   使用 Vite/webpack 打包产物   |

## 三 移动端平台单独构建

### 3.1 android平台(.github/workflows/android-release.yml)

```
name: Android Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build-and-release-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup JDK 11
        uses: actions/setup-java@v3
        with:
          distribution: temurin
          java-version: 11
      - name: Build Android APK
        run: ./gradlew assembleRelease
      - name: Release APK to GitHub
        uses: softprops/action-gh-release@v1
        with:
          files: app/build/outputs/apk/release/app-release.apk
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 3.2 ios平台(.github/workflows/ios-release.yml)

```
name: iOS Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build-and-release-ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build iOS IPA
        run: |
          xcodebuild -workspace MyApp.xcworkspace \
            -scheme MyApp \
            -sdk iphoneos \
            -configuration Release \
            -archivePath $PWD/build/MyApp.xcarchive archive
          xcodebuild -exportArchive \
            -archivePath $PWD/build/MyApp.xcarchive \
            -exportPath $PWD/build \
            -exportOptionsPlist ExportOptions.plist
      - name: Release IPA to GitHub
        uses: softprops/action-gh-release@v1
        with:
          files: build/*.ipa
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 3.3 鸿蒙平台(.github/workflows/harmony-release.yml)

```
name: HarmonyOS Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build-harmony:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      # ✅ 安装 DevEco CLI（假设你已有 CLI 下载地址）
      - name: Setup DevEco CLI
        run: |
          wget https://download-link-for-devecocli.zip -O devecocli.zip
          unzip devecocli.zip -d $HOME/devecocli
          echo "$HOME/devecocli/tools/bin" >> $GITHUB_PATH

      # ✅ 安装 SDK（你可以上传自定义 SDK 或官方离线包）
      - name: Setup SDK (假设 CLI 自动装)
        run: |
          devecocli config --sdkpath $HOME/deveco-sdk
          devecocli sdk install --version 4.0.10.6 # 示例版本，可修改

      # ✅ 编译鸿蒙项目（ArkTS / Java 均支持）
      - name: Build HarmonyOS Project
        run: |
          devecocli build --mode release --platform hap

      # ✅ 打包 HAP 到 Zip（可选）
      - name: Package HAP
        run: |
          mkdir release
          find ./ -name "*.hap" -exec cp {} release/ \;
          cd release && zip harmony-app.zip *.hap

      # ✅ 上传 HAP 或 zip 到 GitHub Release
      - name: Upload to Release
        uses: softprops/action-gh-release@v1
        with:
          files: release/*.hap
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 四 跨平台构建单独构建

### 4.1 reactnative平台(.github/workflows/reactnative-release.yml)

```
name: React Native Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build-and-release-rn:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm install
      - name: Build RN Android APK
        run: cd android && ./gradlew assembleRelease
      - name: Build RN iOS IPA
        run: |
          cd ios
          xcodebuild -workspace MyApp.xcworkspace \
            -scheme MyApp \
            -sdk iphoneos \
            -configuration Release \
            -archivePath $PWD/build/MyApp.xcarchive archive
          xcodebuild -exportArchive \
            -archivePath $PWD/build/MyApp.xcarchive \
            -exportPath $PWD/build \
            -exportOptionsPlist ExportOptions.plist
      - name: Release React Native builds to GitHub
        uses: softprops/action-gh-release@v1
        with:
          files: |
            android/app/build/outputs/apk/release/app-release.apk
            ios/build/*.ipa
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 4.2 Flutter平台(.github/workflows/flutter-release.yml)

```
name: Flutter Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build-and-release-flutter:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Flutter
        uses: subosito/flutter-action@v2
        with:
          flutter-version: 'stable'

      - name: Flutter pub get
        run: flutter pub get

      # 构建 Android APK
      - name: Build Flutter Android APK
        run: flutter build apk --release

      # 构建 iOS IPA
      - name: Build Flutter iOS IPA
        run: |
          flutter build ios --release --no-codesign
          # 这里假设你使用自动签名或者后面自己签名
          # 如果需要打包成 IPA，可自行增加打包步骤

      # 上传 APK 和 iOS 产物
      - name: Upload APK and iOS app
        uses: softprops/action-gh-release@v1
        with:
          files: |
            build/app/outputs/flutter-apk/app-release.apk
            build/ios/iphoneos/*.app # 或者你改成打包成 ipa 后的路径
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 五 桌面端单独构建

### 5.1 C#平台(.github/workflows/csharp-release.yml)

```
name: C# Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build-and-release-csharp:
    runs-on: windows-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup .NET SDK
        uses: actions/setup-dotnet@v3
        with:
          dotnet-version: '7.0.x' # 你用的版本改这里

      - name: Restore dependencies
        run: dotnet restore

      - name: Build project (Release)
        run: dotnet build --configuration Release

      - name: Publish project (self-contained, win-x64)
        run: dotnet publish -c Release -r win-x64 --self-contained true -o publish

      - name: List publish folder
        run: dir publish

      - name: Upload Release Asset
        uses: softprops/action-gh-release@v1
        with:
          files: publish/**/*
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 5.2 Electron平台(.github/workflows/electron-release.yml)

```
name: Electron Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build-and-release-electron:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm install
      - name: Build Electron app
        run: npm run dist
      - name: Release Electron builds to GitHub
        uses: softprops/action-gh-release@v1
        with:
          files: dist/*
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 六 Web平台单独构建

### 6.1 Web平台(.github/workflows/web-release.yml)

```
name: Web Frontend Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build-and-release-web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm install
      - name: Build Web app
        run: npm run build
      - name: Release Web build to GitHub
        uses: softprops/action-gh-release@v1
        with:
          files: dist/*
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 七 多平台统一构建

## 7.1 多平台统一 Release Workflow(release.yml)

```
name: Build & Release All Platforms

on:
  push:
    tags:
      - 'v*'   # 只有打 tag 时触发发布
  # 或者你也可以用 push main 分支来测试
  # push:
  #   branches:
  #     - main

jobs:
  build-android:
    name: Build Android APK
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup JDK 11
        uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '11'
      - name: Build Android APK
        run: ./gradlew assembleRelease
      - name: Upload APK artifact
        uses: actions/upload-artifact@v3
        with:
          name: android-apk
          path: app/build/outputs/apk/release/app-release.apk

  build-ios:
    name: Build iOS IPA
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build iOS IPA
        run: |
          xcodebuild -workspace MyApp.xcworkspace \
            -scheme MyApp \
            -sdk iphoneos \
            -configuration Release \
            -archivePath $PWD/build/MyApp.xcarchive archive
          xcodebuild -exportArchive \
            -archivePath $PWD/build/MyApp.xcarchive \
            -exportPath $PWD/build \
            -exportOptionsPlist ExportOptions.plist
      - name: Upload IPA artifact
        uses: actions/upload-artifact@v3
        with:
          name: ios-ipa
          path: build/*.ipa

  build-react-native:
    name: Build React Native Android & iOS
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm install
      - name: Build Android APK (React Native)
        run: cd android && ./gradlew assembleRelease
      - name: Build iOS IPA (React Native)
        run: |
          cd ios
          xcodebuild -workspace MyApp.xcworkspace \
            -scheme MyApp \
            -sdk iphoneos \
            -configuration Release \
            -archivePath $PWD/build/MyApp.xcarchive archive
          xcodebuild -exportArchive \
            -archivePath $PWD/build/MyApp.xcarchive \
            -exportPath $PWD/build \
            -exportOptionsPlist ExportOptions.plist
      - name: Upload React Native artifacts
        uses: actions/upload-artifact@v3
        with:
          name: reactnative-builds
          path: |
            android/app/build/outputs/apk/release/app-release.apk
            ios/build/*.ipa

  build-electron:
    name: Build Electron Desktop Apps
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm install
      - name: Build Electron app
        run: npm run dist
      - name: Upload Electron build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: electron-builds
          path: dist/*

  build-web:
    name: Build Web Frontend
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm install
      - name: Build Web app
        run: npm run build
      - name: Upload Web build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: web-builds
          path: dist/*

  release:
    name: Create GitHub Release with All Artifacts
    needs:
      - build-android
      - build-ios
      - build-react-native
      - build-electron
      - build-web
    runs-on: ubuntu-latest
    steps:
      - name: Download Android APK artifact
        uses: actions/download-artifact@v3
        with:
          name: android-apk
          path: ./release/android

      - name: Download iOS IPA artifact
        uses: actions/download-artifact@v3
        with:
          name: ios-ipa
          path: ./release/ios

      - name: Download React Native artifacts
        uses: actions/download-artifact@v3
        with:
          name: reactnative-builds
          path: ./release/reactnative

      - name: Download Electron artifacts
        uses: actions/download-artifact@v3
        with:
          name: electron-builds
          path: ./release/electron

      - name: Download Web artifacts
        uses: actions/download-artifact@v3
        with:
          name: web-builds
          path: ./release/web

      - name: Prepare release files list
        run: |
          ls -lR release

      - name: Create GitHub Release and upload assets
        uses: softprops/action-gh-release@v1
        with:
          files: |
            release/android/*.apk
            release/ios/*.ipa
            release/reactnative/*.apk
            release/reactnative/*.ipa
            release/electron/*
            release/web/*
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

